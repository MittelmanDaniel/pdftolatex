'use client';

import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type UploadPanelProps = {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  file: File | null;
  isConverting: boolean;
};

export default function UploadPanel({ 
  onFileChange, 
  onSubmit, 
  file, 
  isConverting 
}: UploadPanelProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6 h-full">
        <div className="space-y-4">
          <Input
            type="file"
            accept=".pdf"
            onChange={onFileChange}
          />
          {file && (
            <div className="text-sm">
              Selected file: {file.name}
            </div>
          )}
          <Button 
            onClick={onSubmit}
            disabled={!file || isConverting}
            className="w-full"
          >
            {isConverting ? 'Converting...' : 'Convert to LaTeX'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}