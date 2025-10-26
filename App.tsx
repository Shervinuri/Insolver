import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { generateWithGemini } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import InputForm from './components/InputForm';
import { ShenIcon } from './components/Icons';
import { initialReportHTML } from './initialReport';

const App: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      role: 'model',
      content: initialReportHTML,
    },
  ]);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Scroll to bottom, but delay slightly after initial render to allow iframe to load
    const timer = setTimeout(() => {
        scrollToBottom();
    }, 500);
    return () => clearTimeout(timer);
  }, [chatHistory]);

  const handleSend = async () => {
    if (!prompt.trim() || isLoading) return;

    const newUserMessage: Message = {
      role: 'user',
      content: prompt,
    };
    
    // In a real app, you might want to clear the initial report for a cleaner chat log
    const currentHistory = chatHistory[0]?.content.startsWith('<!DOCTYPE') ? [newUserMessage] : [...chatHistory, newUserMessage];
    
    // For this implementation, we will keep the report in history
    const updatedHistoryWithUser = [...chatHistory, newUserMessage];


    setChatHistory(updatedHistoryWithUser);
    setPrompt('');
    setIsLoading(true);

    try {
      const aiResponse = await generateWithGemini(prompt, updatedHistoryWithUser);
      const newAiMessage: Message = {
        role: 'model',
        content: aiResponse,
      };
      setChatHistory(prev => [...prev, newAiMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-gray-200 font-sans">
      <header className="bg-[#1e1e1e] shadow-lg p-4 flex items-center justify-between z-10 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <ShenIcon />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
            iNFORMA SHΞN™
          </h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {chatHistory.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && (
            <div className="flex justify-start">
                 <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex-shrink-0 bg-gray-700 rounded-full"></div>
                    <div className="bg-gray-800 p-3 rounded-lg flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </main>

      <footer className="p-4 bg-black/50 backdrop-blur-sm border-t border-gray-700">
        <InputForm
          prompt={prompt}
          setPrompt={setPrompt}
          isLoading={isLoading}
          onSend={handleSend}
        />
        <div className="text-center text-xs text-gray-500 mt-4">
          <a href="https://T.me/shervini" target="_blank" rel="noopener noreferrer" 
             className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-300 hover:to-gray-500 transition-all animate-gradient-x">
            Exclusive SHΞN™ made
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;