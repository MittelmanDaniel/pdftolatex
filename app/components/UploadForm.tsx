'use client';

import React, { useState } from 'react';
import UploadPanel from './UploadPanel';
import LatexPanel from './LatexPanel';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [latex, setLatex] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setLatex(''); // Clear previous result
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setIsConverting(true);
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const data = await response.json();
      setLatex(data.latex);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 w-full h-full">
      <UploadPanel 
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        file={file}
        isConverting={isConverting}
      />
      <LatexPanel latex={latex} />
    </div>
  );
}