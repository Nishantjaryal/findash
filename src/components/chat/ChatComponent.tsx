import { useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const ChatComponent = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Hi! I am Your Ai Agent, How can I assist You`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const requestMessage = async (msg: string) => {
    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {message: msg,
          data: localStorage.getItem("transactions_data") || "[]"},
        model_name: "gpt-oss:20b",
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      const errorMessage = typeof data?.error === "string" ? data.error : "Failed to send message";
      throw new Error(errorMessage);
    }

    return data;
  };

  const sendMessage = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) {
      return;
    }

    setInput("");
    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);

    try {
      const data = await requestMessage(trimmed);
      const reply = typeof data?.reply === "string" ? data.reply : "I could not parse a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send message";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: message,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col relative max-w-[300px] overflow-hidden rounded-xl border bg-card/90 p-2 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.5)]">


      <div className=" flex flex-col gap-2">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Findash AI</p>
            </div>
          </div>
        
        </header>

      

          <div className="flex max-h-[300px] flex-col gap-4 overflow-y-auto pr-2">
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex items-start gap-3  ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  
                    {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                  <div
                    className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? "rounded-tr-none bg-green-200 text-foreground"
                        : "rounded-tl-none bg-amber-100 text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex items-start gap-3">
                
                <div className="rounded-3xl rounded-tl-none bg-card px-4 py-3 text-sm text-muted-foreground">
                  Thinking...
                </div>
              </div>
            )}
        </div>

        <form onSubmit={sendMessage} className="rounded-lg border absolute bottom-0 left-0 right-0 bg-background/80 p-1">
          <div className="flex flex-col gap-1">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask about budgets, goals, or transactions..."
              className="min-h-[60px] focus:h-[120px] w-full resize-none rounded-lg border bg-whitesmoke px-4 py-3 text-sm outline-none transition "
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-60"
              >
                Send
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
