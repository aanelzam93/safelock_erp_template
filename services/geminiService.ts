
import { GoogleGenAI } from "@google/genai";
import type { InventoryItem } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateInventorySummary = async (inventoryData: InventoryItem[]): Promise<string> => {
  const prompt = `
    You are an expert ERP system analyst for a medical supply company called Safelock Medical.
    Analyze the following inventory data and provide a concise, professional summary for the factory manager.
    The summary should be in markdown format.

    Your analysis must include:
    1.  A brief overview of the current inventory status.
    2.  A "Critical Low Stock" section highlighting items with stock levels below 100 units. These require immediate attention.
    3.  A "Recommended Reorder" section for items with stock between 100 and 300 units. These should be considered for the next procurement cycle.
    4.  A "Healthy Stock" section for items with ample supply.
    5.  Conclude with a brief, actionable recommendation.

    Inventory Data:
    ${JSON.stringify(inventoryData, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating inventory summary:", error);
    return "An error occurred while generating the report. Please check the console for details.";
  }
};
