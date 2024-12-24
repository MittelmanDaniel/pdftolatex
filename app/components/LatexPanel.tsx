'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

type LatexPanelProps = {
  latex: string;
};

export default function LatexPanel({ latex }: LatexPanelProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(latex);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="pt-6 h-full">
        {latex ? (
          <div className="relative h-full">
            <Button 
              onClick={handleCopy}
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <pre className="h-full p-4 bg-gray-100 rounded-lg overflow-auto">
              <code>{latex}</code>
            </pre>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            LaTeX output will appear here
          </div>
        )}
      </CardContent>
    </Card>
  );
}