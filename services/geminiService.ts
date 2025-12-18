
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an AI Assistant for the portal of MWCNU Bungah (Majelis Wakil Cabang Nahdlatul Ulama Bungah).
Your tone should be respectful, friendly, and aligned with Nahdlatul Ulama values (Ahlussunnah wal Jama'ah).
You provide information about:
1. MWCNU Bungah programs and news.
2. Profiles of Banom (Ansor, Fatayat, IPNU, IPPNU, Muslimat, PMII, etc.) and Lembaga (Lazisnu, LP Ma'arif, RMI, etc.).
3. General NU history and guidance within the context of Bungah.
Answer in Indonesian language unless asked otherwise.
If you don't know the specific details about a local event in Bungah, explain that you are an AI assistant and suggest they contact the official admin through the "Kontak" page.
`;

export const getGeminiResponse = async (message: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "Maaf, saya sedang mengalami kendala teknis.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Terjadi kesalahan saat menghubungi asisten AI.";
  }
};
