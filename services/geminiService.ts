
import { GoogleGenAI } from "@google/genai";

export const getInvestmentInsight = async (assetSymbol: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a very brief (max 2 sentences) investment outlook for ${assetSymbol} considering current market trends. Speak like a professional financial advisor.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text || "Unable to retrieve insights at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Insights are currently unavailable.";
  }
};
