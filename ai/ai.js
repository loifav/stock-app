"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function runAi(prompt) {
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: prompt,
  });

  return (
    result?.candidates?.[0]?.content?.parts?.[0] || "No content generated."
  );
}
