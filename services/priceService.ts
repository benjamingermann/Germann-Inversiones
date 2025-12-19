
import { GoogleGenAI, Type } from "@google/genai";

export interface PriceUpdate {
  symbol: string;
  price: number;
}

export const fetchRealPrices = async (symbols: string[]): Promise<PriceUpdate[]> => {
  if (!process.env.API_KEY || symbols.length === 0) {
    return [];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Usamos gemini-3-flash-preview que es significativamente más rápido que el modelo Pro
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Price check for: ${symbols.join(", ")}.
      Rules:
      1. ADRs (YPF, GGAL, BMA, PAM): Market 'US' -> Price in USD (eg. 30.50).
      2. Argentina (YPFD, GGAL): Market 'ARG' -> Price in ARS (eg. 35000).
      3. US Stocks (NVDA, AAPL): USD.
      
      Return ONLY JSON: { "prices": [{ "symbol": "YPF", "price": 31.2 }] }`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        // Deshabilitamos el pensamiento profundo para ganar velocidad pura
        thinkingConfig: { thinkingBudget: 0 },
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
    console.error("Error al sincronizar precios con Gemini Flash:", error);
    return [];
  }
};
