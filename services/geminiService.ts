
import { GoogleGenAI } from "@google/genai";

export const getInvestmentInsight = async (assetSymbol: string) => {
  // Intentamos obtener la llave de forma segura
  let apiKey = '';
  try {
    // En Vercel/Ambiente de producción, buscamos en process.env
    apiKey = (window as any).process?.env?.API_KEY || (process as any).env?.API_KEY || '';
  } catch (e) {}

  if (!apiKey) {
    console.warn("API_KEY no detectada. Verifique la configuración de Vercel.");
    return "Configuración pendiente: La IA necesita una Clave de API para funcionar.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Eres un asesor financiero experto para el mercado argentino. Analiza el activo ${assetSymbol}. Dame un consejo de inversión muy breve (máximo 15 palabras). Sé directo, usa un tono profesional pero cercano.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      },
    });

    return response.text || "No se pudo generar el análisis en este momento.";
  } catch (error) {
    console.error("Error en Gemini API:", error);
    return "La IA está procesando datos globales. Intente nuevamente en 1 minuto.";
  }
};
