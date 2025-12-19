
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
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Consulta de precios bursátiles en tiempo real.
      Símbolos: ${symbols.join(", ")}.
      
      INSTRUCCIONES CRÍTICAS:
      1. ADRs (YPF, GGAL, BMA): Si son de Wall Street (NYSE), dame el precio en DÓLARES (u$s). 
         YPF suele estar entre 25 y 40 u$s. GGAL entre 40 y 65 u$s.
      2. Acciones locales (YPFD, GGAL): Si son de Argentina, dame el precio en PESOS (ARS). 
         YPFD suele estar en ~30.000+ pesos.
      3. NVDA, AAPL, MSFT: Precio en u$s (Wall Street).
      
      Responde EXCLUSIVAMENTE con este formato JSON:
      { "prices": [{ "symbol": "YPF", "price": 31.45 }] }`,
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
