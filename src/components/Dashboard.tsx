"use client";

import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { TechniqueAnalysis } from "./TechniqueAnalysis";
import { BestTechnique } from "./BestTechnique";
import { TopicAnalysis } from "./TopicAnalysis";
import Chatbot from "./Chatbot";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BarChart3, Medal, Loader2, PieChart, MessageSquare, Sun, Moon, Github, FileText, BookOpen } from "lucide-react";

interface SentimentData {
    id: number;
    entity: string;
    sentiment: string;
    text: string;
    clean_text: string;
    pred_LogReg: string;
    conf_LogReg: number;
    correct_LogReg: boolean;
    pred_NaiveBayes: string;
    conf_NaiveBayes: number;
    correct_NaiveBayes: boolean;
    pred_DecisionTree: string;
    conf_DecisionTree: number;
    correct_DecisionTree: boolean;
    pred_RandomForest: string;
    conf_RandomForest: number;
    correct_RandomForest: boolean;
    agreement: number;
    [key: string]: string | number | boolean | undefined;
}

export default function Dashboard() {
    const [data, setData] = useState<SentimentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [section, setSection] = useState<"sentiment" | "chatbot">("sentiment");
    const [activeTab, setActiveTab] = useState<"analysis" | "best" | "topic">("analysis");
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Ensure default state matches
        if (document.documentElement.classList.contains("light")) {
            setIsDark(false);
        }

        fetch("/analyzed_sentiment_data.json")
            .then((res) => res.json())
            .then((data) => {
                setData(data as SentimentData[]);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load data", err);
                setLoading(false);
            });
    }, []);

    const toggleTheme = (e: React.MouseEvent) => {
        if (!document.startViewTransition) {
            const newDark = !isDark;
            setIsDark(newDark);
            if (newDark) {
                document.documentElement.classList.remove("light");
            } else {
                document.documentElement.classList.add("light");
            }
            return;
        }

        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            flushSync(() => {
                const newDark = !isDark;
                setIsDark(newDark);
                if (newDark) {
                    document.documentElement.classList.remove("light");
                } else {
                    document.documentElement.classList.add("light");
                }
            });
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            document.documentElement.animate(
                {
                    clipPath: isDark ? [...clipPath].reverse() : clipPath,
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    pseudoElement: isDark
                        ? "::view-transition-old(root)"
                        : "::view-transition-new(root)",
                }
            );
        });
    };

    const switchSection = (newSection: "sentiment" | "chatbot") => {
        if (!document.startViewTransition) {
            setSection(newSection);
            return;
        }

        document.startViewTransition(() => {
            flushSync(() => {
                setSection(newSection);
            });
        });
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 transition-colors duration-500 relative">
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
                <button
                    onClick={toggleTheme}
                    className="p-3 rounded-full bg-slate-100 dark:bg-bot-surface hover:bg-slate-200 dark:hover:bg-bot-surface-hover transition-colors shadow-lg"
                    aria-label="Toggle theme"
                >
                    {isDark ? (
                        <Sun className="w-5 h-5 text-amber-500" />
                    ) : (
                        <Moon className="w-5 h-5 text-slate-700" />
                    )}
                </button>
            </div>

            <div className="mx-auto max-w-[1600px] space-y-6 md:space-y-8">
                <header className="flex flex-col items-center space-y-6 text-center pt-8 md:pt-12 pb-4 md:pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 md:space-y-6"
                    >
                        <div className="space-y-2 md:space-y-4">
                            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
                                NLP Assignment
                            </h1>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
                                Sentiment Analysis and ChatBot
                            </p>
                        </div>
                    </motion.div>
                </header>

                {/* Main Section Toggle */}
                <div className="flex justify-center mb-6 md:mb-8">
                    <div className="bg-slate-100 dark:bg-bot-surface p-1.5 rounded-2xl flex items-center gap-1 shadow-inner border border-transparent dark:border-bot-border">
                        <button
                            onClick={() => switchSection("sentiment")}
                            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 ${section === "sentiment"
                                ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5 scale-[1.02] dark:bg-bot-surface-hover dark:text-bot-primary dark:ring-bot-border"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 dark:text-bot-text-muted dark:hover:text-bot-text dark:hover:bg-bot-surface-hover"
                                }`}
                        >
                            <BarChart3 className="w-4 h-4" />
                            Sentiment Analysis
                        </button>
                        <button
                            onClick={() => switchSection("chatbot")}
                            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 ${section === "chatbot"
                                ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5 scale-[1.02] dark:bg-bot-surface-hover dark:text-bot-primary dark:ring-bot-border"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 dark:text-bot-text-muted dark:hover:text-bot-text dark:hover:bg-bot-surface-hover"
                                }`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            Chatbot
                        </button>
                    </div>
                </div>

                <main className="min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={section}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="w-full"
                        >
                            {section === "sentiment" ? (
                                <div className="space-y-8">
                                    {/* External Links */}
                                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                                        <a
                                            href="https://github.com/knowrohan/nlp-sentiment-analysis-and-chatbot"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span>GitHub</span>
                                        </a>
                                        <Link
                                            href="/report"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-bot-surface border border-slate-200 dark:border-bot-border text-slate-700 dark:text-bot-text text-sm font-medium hover:bg-slate-50 dark:hover:bg-bot-surface-hover transition-colors shadow-sm"
                                        >
                                            <FileText className="w-4 h-4 text-blue-500" />
                                            <span>Read Report</span>
                                        </Link>

                                    </div>

                                    {/* Sub-Tabs for Sentiment Analysis */}
                                    <div className="flex justify-center overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-hide">
                                        <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-bot-surface border border-slate-200 dark:border-bot-border shadow-sm whitespace-nowrap">
                                            <button
                                                onClick={() => setActiveTab("analysis")}
                                                className={`flex items-center space-x-2 rounded-lg px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-200 ${activeTab === "analysis"
                                                    ? "bg-white dark:bg-bot-surface-hover text-blue-600 dark:text-bot-primary shadow-sm ring-1 ring-black/5 dark:ring-bot-border"
                                                    : "text-slate-600 dark:text-bot-text-muted hover:text-slate-900 dark:hover:text-bot-text hover:bg-slate-200/50 dark:hover:bg-bot-surface-hover"
                                                    }`}
                                            >
                                                <BarChart3 className="h-4 w-4" />
                                                <span>Analysis</span>
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("topic")}
                                                className={`flex items-center space-x-2 rounded-lg px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-200 ${activeTab === "topic"
                                                    ? "bg-white dark:bg-bot-surface-hover text-blue-600 dark:text-bot-primary shadow-sm ring-1 ring-black/5 dark:ring-bot-border"
                                                    : "text-slate-600 dark:text-bot-text-muted hover:text-slate-900 dark:hover:text-bot-text hover:bg-slate-200/50 dark:hover:bg-bot-surface-hover"
                                                    }`}
                                            >
                                                <PieChart className="h-4 w-4" />
                                                <span>Topic Analysis</span>
                                            </button>
                                            <button
                                                onClick={() => setActiveTab("best")}
                                                className={`flex items-center space-x-2 rounded-lg px-4 md:px-6 py-2.5 text-sm font-medium transition-all duration-200 ${activeTab === "best"
                                                    ? "bg-white dark:bg-bot-surface-hover text-blue-600 dark:text-bot-primary shadow-sm ring-1 ring-black/5 dark:ring-bot-border"
                                                    : "text-slate-600 dark:text-bot-text-muted hover:text-slate-900 dark:hover:text-bot-text hover:bg-slate-200/50 dark:hover:bg-bot-surface-hover"
                                                    }`}
                                            >
                                                <Medal className="h-4 w-4" />
                                                <span>Best Model</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-white/50 dark:bg-bot-surface/50 rounded-3xl border border-slate-100/50 dark:border-bot-border/50 backdrop-blur-sm p-1">
                                        {activeTab === "analysis" && <TechniqueAnalysis data={data} />}
                                        {activeTab === "best" && <BestTechnique data={data} />}
                                        {activeTab === "topic" && <TopicAnalysis data={data} />}
                                    </div>
                                </div>
                            ) : (
                                <div className="max-w-7xl mx-auto">
                                    <Chatbot />
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}