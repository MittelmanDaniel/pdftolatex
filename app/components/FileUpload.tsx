'use client';

import React from 'react';
import UploadForm from './UploadForm';

export default function FileUpload() {
  return (
    <div className="container mx-auto p-4 h-[calc(100vh-2rem)]">
      <UploadForm />
    </div>
  );
}