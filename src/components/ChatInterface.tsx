import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Greetings! I am BenjaminAI, your wise digital advisor. Like my namesake, I'm here to share knowledge, wisdom, and practical counsel. What insights may I provide you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBenjaminResponse(input),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBenjaminResponse = (userInput: string): string => {
    const responses = [
      "As I once said, 'An investment in knowledge pays the best interest.' Let me share some wisdom on this matter...",
      "In my experience, both in life and in the founding of a nation, the key to this lies in understanding...",
      "Much like electricity, this concept requires careful observation and practical application. Consider this...",
      "From my years as a diplomat and inventor, I've learned that the solution often requires patience and ingenuity...",
      "Remember, 'Well done is better than well said.' Here's my practical advice on your question...",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] + " " + 
           "Your inquiry reminds me of the complexities we faced during the Constitutional Convention. Success requires both wisdom and action.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-overlay flex flex-col h-full rounded-2xl border border-border/20">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b border-border/20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-secondary" />
          <h2 className="text-xl font-bold text-foreground">BenjaminAI</h2>
        </div>
        <div className="flex-1 text-right">
          <span className="text-sm text-muted-foreground">
            Wisdom from the Founding Father
          </span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
            >
              <div
                className={`message-bubble ${
                  message.sender === "user" ? "message-user" : "message-ai"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="message-bubble message-ai">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-6 border-t border-border/20">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Benjamin for wisdom..."
            className="flex-1 bg-input border-border focus:ring-ring"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="btn-gold text-accent-foreground font-semibold px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Ask about life, business, science, or any matter requiring wisdom
        </p>
      </div>
    </div>
  );
};