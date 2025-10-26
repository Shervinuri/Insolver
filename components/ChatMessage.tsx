import React, { useState } from 'react';
import { Message } from '../types';
import { CopyIcon, CheckIcon, ModelIcon, UserIcon, PlayIcon } from './Icons';
import CodePreview from './CodePreview';

interface ChatMessageProps {
  message: Message;
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // A simple check to see if the code is likely to be web-renderable
  const isWebCode = code.trim().startsWith('<') || code.toLowerCase().includes('<html') || code.toLowerCase().includes('<div');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-black/50 rounded-lg my-2 relative text-left">
      <div className="flex justify-between items-center text-xs text-gray-400 px-4 py-2 border-b border-gray-700">
        <span>Code</span>
        <div className="flex items-center space-x-4">
           {isWebCode && (
            <button onClick={() => setShowPreview(true)} className="flex items-center space-x-1 hover:text-white transition-colors">
              <PlayIcon />
              <span>Live Preview</span>
            </button>
          )}
          <button onClick={handleCopy} className="flex items-center space-x-1 hover:text-white transition-colors">
            {isCopied ? <CheckIcon /> : <CopyIcon />}
            <span>{isCopied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="font-mono">{code}</code>
      </pre>
      {showPreview && <CodePreview code={code} onClose={() => setShowPreview(false)} />}
    </div>
  );
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { role, content } = message;

  const isUser = role === 'user';
  
  // Special renderer for the initial HTML report
  if (content.trim().startsWith('<!DOCTYPE html')) {
    return (
        <iframe 
            srcDoc={content} 
            className="w-full h-[85vh] bg-transparent border-0 rounded-lg"
            title="Instagram Page Analysis Report"
            sandbox="" // Allow everything for this trusted content
        />
    );
  }


  const renderContent = () => {
    if (!content.includes('```')) {
      return <p className="whitespace-pre-wrap">{content}</p>;
    }

    const parts = content.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // Extracts content within the backticks, removing the language identifier if present
        const codeContent = part.split('\n').slice(1).join('\n');
        return <CodeBlock key={index} code={codeContent} />;
      }
      return <p key={index} className="whitespace-pre-wrap">{part}</p>;
    });
  };

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 flex-shrink-0 bg-gray-700 rounded-full flex items-center justify-center">
          <ModelIcon />
        </div>
      )}
      <div
        className={`max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-lg px-4 py-3 shadow-md ${
          isUser
            ? 'bg-gray-700'
            : 'bg-gray-800'
        }`}
      >
        {renderContent()}
      </div>
       {isUser && (
        <div className="w-8 h-8 flex-shrink-0 bg-gray-600 rounded-full flex items-center justify-center">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
