import { Message } from '../types';
import { knowledgeBasePrompt } from './knowledgeBase';

const formatHistoryForPrompt = (history: Message[]): string => {
  // Filters out the initial HTML report and formats the rest for the prompt
  return history
    .filter(msg => !msg.content.startsWith('<!DOCTYPE'))
    .map(msg => `${msg.role === 'user' ? 'USER' : 'ASSISTANT'}: ${msg.content}`)
    .join('\n');
};

/**
 * Generates a response from the Pollinations.ai service.
 * This implementation is designed to be robust, handling potential network issues with a retry mechanism.
 */
export const generateResponse = async (prompt: string, history: Message[]): Promise<string> => {
  console.log("Reverted to Pollinations.ai API for iNFORMA SHΞN™.");
  const historyString = formatHistoryForPrompt(history);
  
  // Construct the full prompt string required by the stateless Pollinations endpoint
  const fullPrompt = `${knowledgeBasePrompt}\n\n--- CHAT HISTORY ---\n${historyString}\n\nUSER: ${prompt}\nASSISTANT:`;
  
  const encodedPrompt = encodeURIComponent(fullPrompt);
  const url = `https://corsproxy.io/?https%3A%2F%2Fpollinations.ai%2Fp%2F${encodedPrompt}`;

  let attempts = 3;
  while (attempts > 0) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Retry on server-side errors (like 504 Gateway Timeout) which indicate temporary issues.
        if (response.status >= 500 && attempts > 1) {
          throw new Error(`Server error (${response.status}), retrying...`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Assuming the API returns a plain text response.
      const aiResponse = await response.text();
      
      if (!aiResponse || aiResponse.trim() === '') {
        throw new Error("Received an empty response from the AI service.");
      }

      return aiResponse.trim();

    } catch (error) {
      attempts--;
      const errorMessage = (error instanceof Error) ? error.message : String(error);
      console.warn(`Attempt failed: ${errorMessage}. Retries left: ${attempts}`);
      
      if (attempts > 0) {
        // Wait for 2 seconds before the next attempt to give the service time to recover.
        await new Promise(res => setTimeout(res, 2000)); 
      } else {
        console.error('Error fetching AI response after all retries:', error);
        return "متاسفانه پس از چند تلاش، اتصال با سرویس هوش مصنوعی برقرار نشد. لطفاً دوباره امتحان کنید.";
      }
    }
  }
  
  // This fallback should theoretically not be reached due to the loop's error handling.
  return "خطای غیرمنتظره‌ای در سرویس هوش مصنوعی رخ داده است.";
};
