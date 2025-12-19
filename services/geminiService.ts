
import { GoogleGenAI } from "@google/genai";

export const getInvestmentInsight = async (assetSymbol: string) => {
  // Use the API key directly from environment variables as per guidelines
  if (!process.env.API_KEY) {
    console.warn("API_KEY no detectada.");
    return "Configuración pendiente: La IA necesita una Clave de API para funcionar.";
  }

  try {
    // Initialize the Gemini client with the API key from the environment
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Eres un asesor financiero experto para el mercado argentino. Analiza el activo ${assetSymbol}. Dame un consejo de inversión muy breve (máximo 15 palabras). Sé directo, usa un tono profesional pero cercano.`,
      config: {
        temperature: 0.7,
      },
    });

    // Access the .text property directly as per latest SDK guidelines
    return response.text || "No se pudo generar el análisis en este momento.";
  } catch (error) {
    console.error("Error en Gemini API:", error);
    return "La IA está procesando datos globales. Intente nuevamente en 1 minuto.";
  }
};