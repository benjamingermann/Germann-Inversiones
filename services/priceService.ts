
import { Asset } from "../types";

export interface PriceUpdate {
  symbol: string;
  price: number;
}

// Configuración de Caché
interface CacheEntry {
  price: number;
  timestamp: number;
}

const priceCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos de validez

/**
 * Obtiene los precios reales usando la API de Alpha Vantage.
 * Implementa caché y manejo de mercados para optimizar el rendimiento.
 */
export const fetchRealPrices = async (assets: Asset[]): Promise<PriceUpdate[]> => {
  const apiKey = process.env.ALPHA_VANTAGE_KEY || process.env.API_KEY; // Fallback al API_KEY si no está la específica
  
  if (!apiKey || assets.length === 0) {
    console.warn("Falta API Key o lista de activos para sincronizar.");
    return [];
  }

  const results: PriceUpdate[] = [];
  const now = Date.now();

  for (const asset of assets) {
    const cacheKey = `${asset.market}:${asset.symbol}`;
    const cached = priceCache.get(cacheKey);

    // Si el dato está en caché y es reciente, lo usamos
    if (cached && (now - cached.timestamp < CACHE_TTL)) {
      results.push({ symbol: asset.symbol, price: cached.price });
      continue;
    }

    // Preparar el símbolo para Alpha Vantage
    // Mercado ARG suele requerir .BA (Buenos Aires)
    const avSymbol = asset.market === 'ARG' ? `${asset.symbol}.BA` : asset.symbol;

    try {
      // Nota: En el plan gratuito de Alpha Vantage hay un límite de llamadas por minuto.
      // Para un portafolio pequeño, esto funciona bien. Para más de 5 activos nuevos,
      // se recomienda un delay o cuenta premium.
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${avSymbol}&apikey=${apiKey}`
      );
      
      const data = await response.json();
      const quote = data["Global Quote"];

      if (quote && quote["05. price"]) {
        const price = parseFloat(quote["05. price"]);
        
        // Actualizar caché
        priceCache.set(cacheKey, { price, timestamp: now });
        results.push({ symbol: asset.symbol, price });
      } else {
        console.warn(`No se encontró cotización para ${avSymbol} en Alpha Vantage.`);
        // Si falla Alpha Vantage, mantenemos el precio actual si existe
        if (asset.price > 0) results.push({ symbol: asset.symbol, price: asset.price });
      }

      // Pequeño delay para respetar rate limits de APIs gratuitas (solo si hay más de 1 petición)
      if (assets.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 500)); 
      }
    } catch (error) {
      console.error(`Error consultando precio para ${asset.symbol}:`, error);
    }
  }

  return results;
};
