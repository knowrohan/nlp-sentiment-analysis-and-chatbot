import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { POKER_CONTEXT } from "@/lib/pokerContext";

export async function POST(req: Request) {
    try {
        const body = await req.json() as { message: string };
        const message = body.message;
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "Gemini API key not found in environment" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const systemInstruction = `You are a helpful assistant. Use the following context to answer the user's questions. 
        If the answer is not in the context, you can generally answer but mention that it's outside the provided context if relevant.
        
        Context:
        ${POKER_CONTEXT}`;

        // Create chat with history
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemInstruction }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I will answer questions based on the provided poker context." }],
                }
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });

    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({
            error: "Internal Server Error",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
