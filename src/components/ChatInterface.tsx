import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Mic, MicOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      content: "Greetings! I am Benjamin Franklin, your financial advisor from the $100 bill. An investment in knowledge pays the best interest - how may I help grow your wealth today?",
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    
    // Play welcome voice after a short delay
    setTimeout(() => {
      playWelcomeMessage();
    }, 1000);
  }, []);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setIsLoading(true);

    try {
      // Get AI response from Benjamin
      const { data: aiData, error: aiError } = await supabase.functions.invoke('benjamin-ai-chat', {
        body: { message: input }
      });

      if (aiError) throw aiError;

      const aiMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        content: aiData.message,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Generate voice if enabled
      if (isVoiceEnabled) {
        setIsSpeaking(true);
        try {
          const { data: voiceData, error: voiceError } = await supabase.functions.invoke('benjamin-voice', {
            body: { text: aiData.message }
          });

          if (voiceError) throw voiceError;

          // Play the audio
          const audio = new Audio(`data:audio/mpeg;base64,${voiceData.audioContent}`);
          audio.onended = () => setIsSpeaking(false);
          audio.onerror = () => setIsSpeaking(false);
          await audio.play();
        } catch (voiceError) {
          console.error('Voice generation error:', voiceError);
          setIsSpeaking(false);
          toast({
            title: "Voice Error",
            description: "Could not generate voice. Check your ElevenLabs API key.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      toast({
        title: "Chat Error",
        description: "Could not get response from Benjamin. Check your API keys.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const playWelcomeMessage = async () => {
    const welcomeText = "Greetings! I am Benjamin Franklin, your financial advisor from the $100 bill. An investment in knowledge pays the best interest - how may I help grow your wealth today?";
    
    if (isVoiceEnabled) {
      try {
        setIsSpeaking(true);
        const { data: voiceData, error } = await supabase.functions.invoke('benjamin-voice', {
          body: { text: welcomeText }
        });

        if (!error && voiceData?.audioContent) {
          const audio = new Audio(`data:audio/mpeg;base64,${voiceData.audioContent}`);
          audio.onended = () => setIsSpeaking(false);
          audio.onerror = () => setIsSpeaking(false);
          await audio.play();
        } else {
          setIsSpeaking(false);
        }
      } catch (error) {
        setIsSpeaking(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-background/60 backdrop-blur-xl rounded-3xl border border-border/50 chat-overlay money-glow">
      {/* Premium Header */}
      <div className="p-6 border-b border-border/30 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              💰 Benjamin Franklin AI
            </h2>
            <p className="text-sm text-muted-foreground">
              Your ultimate money genius advisor
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={`voice-btn ${isSpeaking ? 'listening' : ''}`}
            >
              {isVoiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            {isSpeaking && (
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`message-bubble ${
                  message.sender === "user" ? "message-user" : 
                  `message-ai ${isSpeaking && message.id === messages[messages.length - 1]?.id ? 'speaking' : ''}`
                }`}
              >
                {message.sender === "ai" && (
                  <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                    <span>💵</span>
                    <span>Benjamin Franklin</span>
                    {isSpeaking && message.id === messages[messages.length - 1]?.id && (
                      <Volume2 className="h-3 w-3 animate-pulse" />
                    )}
                  </div>
                )}
                <div className="leading-relaxed">{message.content}</div>
                <div className="text-xs text-muted-foreground/70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="message-bubble message-ai">
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  <span>💵</span>
                  <span>Benjamin Franklin</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Premium Input */}
      <div className="p-6 border-t border-border/30 bg-gradient-to-r from-background/50 to-background/30 rounded-b-3xl">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Benjamin about money, investments, financial wisdom..."
              className="bg-background/70 border-border/50 focus:border-secondary rounded-2xl pr-12 h-12 text-base placeholder:text-muted-foreground/60"
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-xs text-muted-foreground">💰</span>
            </div>
          </div>
          <Button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="btn-gold px-8 h-12 rounded-2xl font-semibold"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
            ) : (
              "Send"
            )}
          </Button>
        </div>
        <div className="mt-3 text-xs text-muted-foreground/70 text-center">
          💡 Tip: Ask about budgeting, investing, side hustles, or financial planning
        </div>
      </div>
    </div>
  );
};