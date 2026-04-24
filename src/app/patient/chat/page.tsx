'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Bot, User, RotateCw } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const SUGGESTED_PROMPTS = [
    'Is rice good for my dosha?',
    'Suggest a light breakfast',
    'Can I eat milk with fish?',
    'What can replace paneer?',
    'Remedy for bloating',
    'Best foods for Vata in winter',
];

const INITIAL_GREETING = 'Namaste! I\'m **AyurOS Agent** — your Ayurvedic diet consultant.\n\nI can help you with:\n\n• **Food scoring** — "Is rice good for me?" (ANH-Score)\n• **Meal suggestions** — "Suggest a breakfast"\n• **Compatibility checks** — "Can I eat milk and fish?"\n• **Substitutions** — "What can replace paneer?"\n• **Ayurveda tips & remedies** — "Remedy for cold"\n• **Top foods** — "Best foods for my dosha"\n\nAll recommendations are personalized to your Prakriti. Ask me anything!';

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', content: INITIAL_GREETING, timestamp: new Date() },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text.trim(),
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const userId = localStorage.getItem('ayurdiet_user_id');
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text.trim(), userId }),
            });
            if (!res.ok) throw new Error('Chat API error');
            const data = await res.json();
            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response || 'I could not process that request. Please try again.',
                timestamp: new Date(),
            }]);
        } catch {
            setMessages((prev) => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Connection issue — still running on local algorithms. Try asking about food scoring, meal suggestions, or food compatibility.',
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleSend = () => sendMessage(input);

    const resetChat = () => {
        setMessages([{ id: '1', role: 'assistant', content: INITIAL_GREETING, timestamp: new Date() }]);
    };

    const showSuggestions = messages.length === 1;

    return (
        <div className="flex flex-col h-[calc(100vh-120px)]">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-6"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4a7c59] to-[#c9a227] flex items-center justify-center shadow-lg shadow-[#c9a227]/10">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">AyurOS Agent</h1>
                        <p className="text-xs text-white/40">AI-powered Ayurvedic diet consultant · Personalized to your Prakriti</p>
                    </div>
                </div>
                {messages.length > 1 && (
                    <button
                        onClick={resetChat}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors"
                        title="Start a new conversation"
                    >
                        <RotateCw className="h-3.5 w-3.5" /> New chat
                    </button>
                )}
            </motion.div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4a7c59] to-[#c9a227] flex items-center justify-center flex-shrink-0 mt-1">
                                <Bot className="h-4 w-4 text-white" />
                            </div>
                        )}
                        <div
                            className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-[#c9a227]/20 border border-[#c9a227]/30 text-white'
                                : 'bg-white/[0.05] border border-white/[0.08] text-white/80'
                                }`}
                        >
                            <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                                __html: msg.content
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                                    .replace(/\n/g, '<br />')
                            }} />
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a227] to-[#d35400] flex items-center justify-center flex-shrink-0 mt-1">
                                <User className="h-4 w-4 text-white" />
                            </div>
                        )}
                    </motion.div>
                ))}

                {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4a7c59] to-[#c9a227] flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="px-4 py-3 rounded-2xl bg-white/[0.05] border border-white/[0.08]">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <AnimatePresence>
                {showSuggestions && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mb-3 flex flex-wrap gap-2"
                    >
                        {SUGGESTED_PROMPTS.map(p => (
                            <button
                                key={p}
                                onClick={() => sendMessage(p)}
                                className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-[#c9a227]/30 transition-all"
                            >
                                {p}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex gap-3">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    placeholder="Ask about food, meals, or Ayurvedic diet guidance..."
                    className="flex-1 px-5 py-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-white/30 focus:outline-none focus:border-[#c9a227]/40 focus:ring-1 focus:ring-[#c9a227]/20 transition-all"
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="px-5 py-3.5 rounded-2xl bg-gradient-to-br from-[#4a7c59] to-[#c9a227] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200 shadow-lg shadow-[#c9a227]/10"
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
