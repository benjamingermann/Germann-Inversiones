
import { GoogleGenAI } from "@google/genai";

export const getInvestmentInsight = async (assetSymbol: string) => {
  // Forma segura de obtener la clave en el navegador sin que 'process' de error
  let apiKey = '';
  try {
    apiKey = (window as any).process?.env?.API_KEY || (process as any).env?.API_KEY || '';
  } catch (e) {
    console.log("Esperando configuración de variables de entorno...");
  }

  if (!apiKey) {
    return "Análisis no disponible (Falta configurar API_KEY en Vercel).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Eres un asesor financiero experto. Analiza el activo ${assetSymbol}. Dame un consejo de inversión muy breve (máximo 2 frases) basado en tendencias actuales. Sé directo y profesional.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      },
    });

    return response.text || "Análisis no disponible por el momento.";
  } catch (error) {
    console.error("Error en Gemini API:", error);
    return "La IA está analizando datos, intenta nuevamente en un momento.";
  }
};
