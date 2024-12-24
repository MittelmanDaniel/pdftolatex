import { NextResponse } from 'next/server';

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {

    try{
    const data = await request.formData();

    const file = data.get('file');

      // Check if we got a file
    if (!file || !(file instanceof File)) {
        return NextResponse.json(
          { error: 'No file provided or invalid file' },
          { status: 400 }
        );
      }
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.error('Missing Gemini API key');
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        );
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      //console.log("got key")
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      //console.log("got model")

      // Convert PDF to array of bytes
        const arrayBuffer = await file.arrayBuffer();
        //console.log("Converted pdf to array buffer")

        // Convert bytes to base64 string
        const base64String = Buffer.from(arrayBuffer).toString('base64');

        //console.log("Converted array buffer to base64 string")

        //console.log(file.type)

        const result = await model.generateContent([
            {
              inlineData: {
                mimeType: file.type,
                data: base64String
              }
            },
            "Convert this PDF into LaTeX code. Include all relevant usepackage commands. Make sure the output can compile by itself and is as close to the original in terms of formatting and content as possible."
          ]

        );


        const rawText = result.response.text();
    
        // Extract text between ```latex and ```
        const match = rawText.match(/```latex\n([\s\S]*?)\n```/);
        const latex = match ? match[1] : rawText;
        
        console.log('Raw text:', rawText);
        console.log('Extracted latex:', latex);

        //console.log(result)
      
  
      return NextResponse.json({ latex });
    }
    catch (error){
        console.error('Error in API route:', error);
        return NextResponse.json({ error: "Failed to procces file" }, { status: 500 });
    }
}