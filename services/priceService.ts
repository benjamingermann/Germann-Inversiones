
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
      contents: `Sincronización de precios del mercado hoy. Obtén el precio de cotización REAL Y ACTUAL para: ${symbols.join(", ")}. 
      REGLAS CRÍTICAS DE PRECIO: 
      - NVDA: Debe ser el precio POST-SPLIT (aprox $120-$160 USD). Si ves algo de $400+, está MAL.
      - Para activos de Argentina (GGAL, YPFD, etc): Precio en ARS (Pesos).
      - Para activos de USA: Precio en USD (Dólares).
      Formato de respuesta estrictamente JSON: { "prices": [{ "symbol": string, "price": number }] }.`,
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
