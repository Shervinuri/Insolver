import { Message } from '../types';

const API_URL = "https://text.pollinations.ai/openai";

// System instruction to define the AI's persona and expertise in Persian.
const systemInstruction = `
شما «iNFORMA SHΞN™» هستید، یک دستیار متخصص در زمینه قوانین، امنیت و سیاست‌های اینستاگرام. 
وظیفه اصلی شما ارائه اطلاعات دقیق و واضح بر اساس دانش ارائه شده است. 
شما باید همیشه به زبان فارسی روان و رسمی پاسخ دهید.
کاربران از شما در مورد قوانین اینستاگرام، عواقب نقض آن‌ها، و نحوه پیشگیری و مدیریت مشکلات سوال خواهند کرد. 
شما با یک گزارش اولیه در مورد مسدودیت یک پیج به کاربر خوش‌آمد گفته‌اید. مکالمات بعدی بر اساس سوالات کاربر در همین زمینه خواهد بود. 
لحن شما باید حرفه‌ای، اطمینان‌بخش و مفید باشد. از ارائه اطلاعات نادرست یا حدس و گمان خودداری کنید.
`;

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
    const systemMessage = { role: 'system', content: systemInstruction.trim() };
    
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
