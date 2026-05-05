import { Handler } from "@netlify/functions";
import { Ollama } from "ollama";

const ollama = new Ollama({
  host: "https://ollama.com",
  headers: {
    Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
  },
});

interface ChatRequest {
  message: string;
  model_name?: string;
  system_prompt?: string;
  sys_temperature?: number;
}

export const handler: Handler = async (event) => {
  try {
    // Only allow POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({
          error: "Method not allowed",
        }),
      };
    }

    // Parse body
    const {
      message,
      model_name,
      system_prompt,
      sys_temperature = 0.7,
    }: ChatRequest = JSON.parse(event.body || "{}");

    // Validate
    if (!message || !model_name) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "message and model_name are required",
        }),
      };
    }

    const SYSTEM_PROMPT =
      system_prompt ??
      "You are a very helpful, kind and intelligent ai agent.";

    const response = await ollama.chat({
      model: "devstral-small-2:24b",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
      stream: true,
      options: {
        temperature: sys_temperature,
      },
    });

    let reply = "";

    for await (const part of response) {
      reply += part.message.content;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply,
      }),
    };
  } catch (error) {
    console.error("Netlify Function Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to generate response",
      }),
    };
  }
};