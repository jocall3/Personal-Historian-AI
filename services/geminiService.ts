
import { GoogleGenAI, Type } from "@google/genai";
import { Memory, ChatMessage } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); to ensure the API key is sourced from the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  /**
   * Generates a conversational response based on memory context.
   */
  async chatWithMemories(
    message: string,
    memories: Memory[],
    history: ChatMessage[]
  ): Promise<{ text: string; relatedIds: string[] }> {
    const memoryContext = memories
      .map(m => `[ID: ${m.id}] ${m.title}: ${m.summary}`)
      .join("\n");

    const systemInstruction = `
      You are the Personal Historian AI. You help users explore their digital life.
      Context of user memories:
      ${memoryContext}
      
      Instructions:
      1. Use the provided context to answer questions accurately.
      2. If you mention a specific memory, include its ID in brackets [ID: ...].
      3. Be warm, empathetic, and professional.
      4. If the user asks about something not in the context, politely say you don't recall it yet.
    `;

    // Calling generateContent with the system instruction and user message using the recommended model for text tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "I'm sorry, I couldn't process that request.";
    
    // Extract potential memory IDs from the text for UI linking.
    const relatedIds = memories
      .filter(m => text.includes(`[ID: ${m.id}]`) || text.includes(m.id))
      .map(m => m.id);

    return { text, relatedIds };
  },

  /**
   * Simulates background analysis by an AI agent using structured JSON output.
   */
  async analyzeMemory(memory: Memory): Promise<{ sentiment: string; tags: string[]; insights: string[] }> {
    const prompt = `
      Analyze this personal memory and provide a structured JSON response.
      
      Memory Title: ${memory.title}
      Memory Summary: ${memory.summary}
      Full Narrative: ${memory.description || "N/A"}
    `;

    // Configured responseSchema to ensure the model returns valid JSON with the expected fields per guidelines.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: {
              type: Type.STRING,
              description: "The primary sentiment of the memory (positive, neutral, negative, mixed).",
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 3-5 descriptive tags for categorization.",
            },
            insight: {
              type: Type.STRING,
              description: "A deep insight or recurring pattern identified in this memory.",
            },
          },
          required: ["sentiment", "tags", "insight"],
        },
      },
    });

    try {
      // Accessing the text property directly as recommended.
      const jsonStr = response.text?.trim() || "{}";
      const result = JSON.parse(jsonStr);
      return {
        sentiment: result.sentiment || "neutral",
        tags: result.tags || [],
        insights: [result.insight || "Memory indexed for future retrieval."]
      };
    } catch (e) {
      // Graceful fallback for unexpected output formats.
      return {
        sentiment: "neutral",
        tags: ["historian-analyzed"],
        insights: ["Memory indexed for future retrieval."]
      };
    }
  }
};
