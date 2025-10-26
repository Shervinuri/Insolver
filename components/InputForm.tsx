import React from 'react';
import { SendIcon, LoadingSpinnerIcon } from './Icons';

interface InputFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  onSend: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ prompt, setPrompt, isLoading, onSend }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const placeholderText = "سوال یا راهنمایی دیگه‌ای برای پیجت نیاز داری؟";

  return (
    <div className="flex items-end gap-2">
      <div className="relative flex-grow">
        {/* Custom animated placeholder */}
        {!prompt && (
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none p-4"
            aria-hidden="true"
          >
            <p className="placeholder-gradient text-base text-center">
              {placeholderText}
            </p>
          </div>
        )}

        <textarea
          className="yellow-glass w-full rounded-2xl p-4 text-white placeholder:text-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow resize-none min-h-[3.5rem]"
          placeholder={placeholderText}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
          }}
          style={{ maxHeight: '200px', overflowY: 'auto' }}
          rows={1}
        />
      </div>
      <button
        onClick={onSend}
        disabled={isLoading || !prompt.trim()}
        className="yellow-glass flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl text-white hover:bg-amber-300/20 disabled:bg-gray-800/50 disabled:text-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
        aria-label="Send message"
      >
        {isLoading ? <LoadingSpinnerIcon /> : <SendIcon />}
      </button>
    </div>
  );
};

export default InputForm;