import React from 'react';

interface SuggestedEmailRendererProps {
  content: string;
}

const SuggestedEmailRenderer: React.FC<SuggestedEmailRendererProps> = ({ content }) => {
  const htmlContent = `
    <html>
      <head>
        <title>Output renderer</title>
        <style>
          del, del * {
            background-color: #faa;
            background-clip: content-box;
          }
          ins, ins * {
            background-color: #9f9;
            text-decoration: none;
            background-clip: content-box;
          }
          body.main {
            font-family: Arial, sans-serif;
            margin: 20px;
            line-height: 1.6;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            padding: 20px;
          }
        </style>
      </head>
      <body class="main">
        ${content}
      </body>
    </html>
  `;

  return (
    <iframe
      srcDoc={htmlContent}
      style={{
        width: '100%',
        height: '300px',
        border: 'none',
        backgroundColor: 'white'
      }}
      title="Suggested Email Preview"
    />
  );
};

export default SuggestedEmailRenderer; 