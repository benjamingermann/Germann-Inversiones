
import { GoogleGenAI, Type } from "@google/genai";

export interface PriceUpdate {
  symbol: string;
  price: number;
}

export const fetchRealPrices = async (symbols: string[]): Promise<PriceUpdate[]> => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY no detectada para sincronización de precios.");
    return [];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `ACTUALIZACIÓN DE MERCADO REAL-TIME. 
      Símbolos a consultar: ${symbols.join(", ")}.
      
      REGLAS ESTRICTAS DE VALORACIÓN:
      1. ADRs Argentinos (YPF, GGAL, BMA, EDN): Si el usuario los tiene en mercado 'US', busca el precio en el NYSE en DÓLARES (ej. YPF suele estar entre 25-35 USD, GGAL entre 40-60 USD).
      2. Acciones locales (YPFD.BA, GGAL.BA): Si el mercado es ARG, busca el precio en el BYMA en PESOS ARGENTINOS (ej. YPFD suele estar en los 30.000+ ARS).
      3. Stocks USA (AAPL, TSLA, NVDA): Precio en USD. NVDA debe ser post-split (~120-150 USD).
      
      Devuelve SOLO un objeto JSON con este formato: { "prices": [{ "symbol": string, "price": number }] }`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prices: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  symbol: { type: Type.STRING },
                  price: { type: Type.NUMBER }
                },
                required: ["symbol", "price"]
              }
            }
          },
          required: ["prices"]
        }
      },
    });

    const data = JSON.parse(response.text);
    return data.prices || [];
  } catch (error) {
    console.error("Error al sincronizar precios con Gemini:", error);
    return [];
  }
};
