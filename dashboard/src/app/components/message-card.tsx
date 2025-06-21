import React, { useState } from 'react'

interface MessageCardProps {
  message: string;
}

export default function MessageCard({ message }: MessageCardProps) {
  const [showInsertions, setShowInsertions] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white font-normal flex flex-col flex-1">
      <div 
        className={`email-content ${showInsertions ? 'show-insertions' : 'hide-insertions'}`}
        dangerouslySetInnerHTML={{ __html: message }}
        style={{
          fontFamily: 'Cabin, sans-serif',
          lineHeight: '1.6',
          maxWidth: '100%',
          overflow: 'auto',
        }}
      />
      <button 
          onClick={() => setShowInsertions(!showInsertions)}
          className="mt-10 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {showInsertions ? 'Hide' : 'Show'} Suggested Edits
        </button>
    </div>
  )
}
