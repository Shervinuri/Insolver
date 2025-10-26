import React, { useState, useEffect } from 'react';
import { CloseIcon, CopyIcon, CheckIcon, SaveIcon } from './Icons';

interface CodePreviewProps {
  code: string;
  onClose: () => void;
}

const CodePreview: React.FC<CodePreviewProps> = ({ code, onClose }) => {
  const [editableCode, setEditableCode] = useState(code);
  const [renderedCode, setRenderedCode] = useState(code);
  const [isCopied, setIsCopied] = useState(false);

  // Debounce effect to update preview only after user stops typing for performance.
  useEffect(() => {
    const handler = setTimeout(() => {
      setRenderedCode(editableCode);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [editableCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = () => {
    const blob = new Blob([editableCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const createFullHtml = (htmlContent: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Live Preview</title>
        <style>
          body { 
            font-family: sans-serif; 
            padding: 1rem; 
            color: #212121;
            background-color: #ffffff;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;
  
  const fullHtml = createFullHtml(renderedCode);

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl w-full h-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <header className="flex items-center justify-between p-3 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-200">Live Code Editor & Preview</h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleCopy} 
              className="flex items-center space-x-1.5 text-xs text-gray-400 px-3 py-1.5 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
              aria-label="Copy code"
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
              <span>{isCopied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button 
              onClick={handleSave} 
              className="flex items-center space-x-1.5 text-xs text-gray-400 px-3 py-1.5 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
              aria-label="Save code as file"
            >
              <SaveIcon />
              <span>Save</span>
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
              aria-label="Close preview"
            >
              <CloseIcon />
            </button>
          </div>
        </header>
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-700">
          {/* Code Editor Panel */}
          <div className="bg-gray-800 flex flex-col overflow-hidden">
             <div className="text-xs text-gray-400 px-4 py-2 border-b border-gray-700 flex-shrink-0">
                <span>HTML / CSS / JS Editor</span>
            </div>
            <textarea
              value={editableCode}
              onChange={(e) => setEditableCode(e.target.value)}
              className="w-full h-full bg-[#1e1e1e] text-gray-200 font-mono text-sm p-4 resize-none focus:outline-none"
              spellCheck="false"
              aria-label="Code Editor"
            />
          </div>
          
          {/* Preview Panel */}
          <div className="bg-white overflow-auto">
            <iframe
              srcDoc={fullHtml}
              title="Live Code Preview"
              sandbox="allow-scripts" // Security: allows scripts but blocks top-navigation, popups, etc.
              className="w-full h-full border-0"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CodePreview;