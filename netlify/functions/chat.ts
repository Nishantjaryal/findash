import { Handler } from "@netlify/functions";
import { Ollama } from "ollama";

const ollama = new Ollama({
  host: "https://ollama.com",
  headers: {
    Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
  },
});

interface ChatRequest {
  message: {
    message: string;
    data?: string;
  };
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
      "You are Findash Ai, a helpful assistant for financial data. Answer user queries based on the provided financial data and your knowledge of finance. Be concise and accurate in your responses. Try to provide only string responses without code blocks or markdown formatting. If you don't know the answer, say you don't know. make sure answers lies within one or two sentences and avoid unnecessary explanations. Always try to answer based on the provided data and your knowledge of finance.";

    const response = await ollama.chat({
      model: "gpt-oss:20b",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: message.message + "data:" + message.data,
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