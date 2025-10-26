import { Message } from '../types';

const API_URL = "https://text.pollinations.ai/openai";

// System instruction from metadata.json to define the AI's persona and expertise.
const systemInstruction = `You are iNFORMA SHΞN™, an expert assistant on Instagram's community guidelines, security, and policies. Your primary role is to provide clear, accurate information based on the knowledge base provided. Users will ask you about Instagram's rules, the consequences of violating them, and how to prevent and handle issues.`;

/**
 * Generates a response using the Pollinations.ai API.
 *
 * @param prompt The user's input.
 * @param chatHistory The previous conversation messages, including the latest user prompt.
 * @returns A promise that resolves to the AI's response string.
 */
export const generateResponse = async (
  prompt: string,
  chatHistory: Message[]
): Promise<string> => {
  try {
    const systemMessage = { role: 'system', content: systemInstruction };
    
    // Map the message format to what the Pollinations/OpenAI API expects.
    const conversationMessages = chatHistory
      .filter(msg => !msg.content.trim().startsWith('<!DOCTYPE html'))
      .map(msg => ({
        role: msg.role === 'model' ? 'assistant' : 'user', // Map 'model' to 'assistant'
        content: msg.content,
      }));

    const payload = {
      model: "openai",
      messages: [systemMessage, ...conversationMessages],
      max_tokens: 1500,
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    const aiContent = data?.choices?.[0]?.message?.content;
    
    if (!aiContent) {
        throw new Error("Invalid response structure from API.");
    }

    return aiContent.trim();

  } catch (error) {
    console.error("Error calling Pollinations API:", error);
    if (error instanceof Error) {
        return `An error occurred while communicating with the AI service: ${error.message}`;
    }
    return "An unknown error occurred while processing the request.";
  }
};