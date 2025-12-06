const fetch = require('node-fetch');

async function testChat() {
    try {
        console.log("Testing POST with question...");
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "What is a royal flush?" }) // Question outside context, let's see response
        });

        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Body:", data);

        console.log("\nTesting POST with context question...");
        const response2 = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "What is the Big Blind?" }) // Question from context
        });
        console.log("Status 2:", response2.status);
        const data2 = await response2.json();
        console.log("Body 2:", data2);

    } catch (error) {
        console.error("Error:", error);
    }
}

testChat();
