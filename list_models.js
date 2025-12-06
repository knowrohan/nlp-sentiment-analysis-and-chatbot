require('dotenv').config({ path: '.env' });
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("No API KEY");
            return;
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        // Note: listModels might need strict version handling, but usually works on the client.
        // If SDK doesn't expose listModels efficiently, we can curl it or rely on try/catch.
        // Actually, the SDK does not have a direct helper for listing models in the main class in some versions?
        // Let's use the error message suggestion: "Call ListModels"

        // Using simple fetch to list models if SDK is obscure
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(m.name);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
