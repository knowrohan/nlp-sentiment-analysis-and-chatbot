"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, RotateCcw, Brain, Database, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    role: "user" | "bot";
    text: string;
}

export default function Chatbot() {
    const INITIAL_MESSAGE: Message = {
        id: "welcome",
        role: "bot",
        text: "Hello! I'm your poker assistant. Ask me anything about the game rules, terminology, or strategies based on our guide."
    };

    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const POOL = [
            "What beats a Full House?",
            "Explain the River betting stage.",
            "Should I bluff with a pair of twos?",
            "When should I fold?",
            "What is a straddle?",
            "Explain Texas Hold'em rules.",
            "What is a 'Badugi'?",
            "What is the difference between Big and Small Blind?",
            "How does 'All-in' work?",
            "What are the hand rankings?"
        ];
        // Pick 3 random
        setSuggestions(POOL.sort(() => 0.5 - Math.random()).slice(0, 3));
    }, []);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            text: input.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage.text })
            });

            const data = await response.json() as { reply?: string; error?: string };

            if (data.error) {
                throw new Error(data.error);
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                text: data.reply || "Thinking..."
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                text: "Sorry, I encountered an error. Please try again."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleNewChat = () => {
        setMessages([INITIAL_MESSAGE]);
        setInput("");
    };

    return (
        <div className="flex flex-col gap-8 font-sans max-w-7xl mx-auto">
            {/* Chat Interface */}
            <div className="h-[600px] lg:h-[700px] flex flex-col bg-bot-bg rounded-3xl border border-bot-border shadow-2xl overflow-hidden relative">
                {/* Header */}
                <div className="flex items-center gap-4 p-5 border-b border-bot-border bg-bot-surface/50 backdrop-blur-sm relative z-10">
                    <div className="p-2.5 bg-bot-surface-hover rounded-xl shadow-inner border border-bot-border">
                        <Sparkles className="w-5 h-5 text-bot-primary" />
                    </div>
                    <div className="flex-1">
                        <h2 className="font-bold text-lg text-bot-text">Poker Consultant</h2>
                        <p className="text-xs font-medium text-bot-text-muted">Powered by Gemini AI</p>
                    </div>
                    <div>
                        <button
                            onClick={handleNewChat}
                            className="p-2 text-bot-text-muted hover:text-bot-primary hover:bg-bot-surface-hover rounded-lg transition-colors"
                            title="New Chat"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-6">
                    <AnimatePresence initial={false} mode="popLayout">
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                style={{ viewTransitionName: `message-${message.id}` } as React.CSSProperties}
                                className={`flex items-end gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                            >
                                <div className={`
                                    flex items-center justify-center w-8 h-8 rounded-full shrink-0 shadow-sm
                                    ${message.role === "user" ? "bg-bot-surface-hover text-bot-text border border-bot-border" : "bg-bot-primary text-bot-primary-foreground"}
                                `}>
                                    {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </div>

                                <div className={`
                                    max-w-[80%] px-5 py-3.5 text-sm leading-relaxed shadow-md
                                    ${message.role === "user"
                                        ? "bg-bot-surface-hover text-bot-text rounded-2xl rounded-br-sm border border-bot-border/50"
                                        : "bg-bot-surface text-bot-text rounded-2xl rounded-bl-sm border border-bot-border"}
                                `}>
                                    {message.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-end gap-3"
                        >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bot-primary text-bot-primary-foreground shrink-0 shadow-sm">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-bot-surface border border-bot-border rounded-2xl rounded-bl-sm px-5 py-3.5 shadow-md">
                                <Loader2 className="w-4 h-4 animate-spin text-bot-text-muted" />
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 bg-bot-bg border-t border-bot-border relative z-10">
                    {messages.length < 3 && (
                        <div className="mb-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {suggestions.map((s, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    type="button"
                                    onClick={() => setInput(s)}
                                    className="whitespace-nowrap px-4 py-2 rounded-full bg-bot-surface border border-bot-border text-xs text-bot-text-muted hover:text-bot-primary hover:border-bot-primary/50 transition-all cursor-pointer"
                                >
                                    {s}
                                </motion.button>
                            ))}
                        </div>
                    )}
                    <div className="relative group">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about poker rules..."
                            className="w-full pl-5 pr-14 py-4 rounded-2xl bg-bot-surface border border-bot-border 
                                     text-bot-text placeholder:text-bot-text-muted/60
                                     focus:border-bot-primary/50 focus:ring-1 focus:ring-bot-primary/50 
                                     outline-none transition-all duration-300 shadow-sm group-hover:border-bot-border/80"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 
                                     bg-bot-primary text-bot-primary-foreground rounded-xl 
                                     hover:brightness-110 active:scale-95
                                     disabled:opacity-50 disabled:active:scale-100 disabled:hover:brightness-100
                                     transition-all shadow-md duration-200"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4 p-5 rounded-3xl bg-bot-bg border border-bot-border shadow-lg h-full">
                    <div className="p-2 bg-bot-surface-hover rounded-xl shrink-0 border border-bot-border">
                        <Brain className="w-5 h-5 text-bot-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-bot-text mb-1">How it Works</h3>
                        <p className="text-sm text-bot-text-muted leading-relaxed">
                            Built using Next.js and Google&apos;s Gemini AI. It uses a RAG (Retrieval-Augmented Generation) pipeline to provide accurate context-aware responses.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-3xl bg-bot-bg border border-bot-border shadow-lg h-full">
                    <div className="p-2 bg-bot-surface-hover rounded-xl shrink-0 border border-bot-border">
                        <Database className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-bot-text mb-1">Knowledge Base</h3>
                        <p className="text-sm text-bot-text-muted leading-relaxed">
                            Comprehensive data on poker rules, hand rankings, betting structures, and advanced strategies derived from expert guides.
                        </p>
                    </div>
                </div>

                <div className="p-5 rounded-3xl bg-bot-bg border border-bot-border shadow-lg flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-bot-surface-hover rounded-xl shrink-0 border border-bot-border">
                            <HelpCircle className="w-5 h-5 text-blue-500" />
                        </div>
                        <h3 className="font-bold text-bot-text">What to Ask</h3>
                    </div>

                    <ul className="space-y-3">
                        {[
                            "What beats a Full House?",
                            "Explain the River betting stage.",
                            "Should I bluff with a pair of twos?",
                            "When should I fold?",
                            "What is a straddle?"
                        ].map((q, i) => (
                            <li
                                key={i}
                                className="text-sm text-bot-text-muted hover:text-bot-primary cursor-pointer transition-colors p-2 hover:bg-bot-surface-hover rounded-lg"
                                onClick={() => setInput(q)}
                            >
                                &quot;{q}&quot;
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}