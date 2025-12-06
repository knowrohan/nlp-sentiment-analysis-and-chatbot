"use client";

import { useState, useEffect } from "react";
import { TechniqueAnalysis } from "./TechniqueAnalysis";
import { BestTechnique } from "./BestTechnique";
import { TopicAnalysis } from "./TopicAnalysis";
import { motion } from "framer-motion";
import { BarChart3, Medal, Loader2, PieChart, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

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
    [key: string]: string | number | boolean | undefined; // Allow dynamic access for metrics calculation
}

export default function Dashboard() {
    const [data, setData] = useState<SentimentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"analysis" | "best" | "topic">("analysis");

    useEffect(() => {
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

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <header className="flex flex-col items-center space-y-6 text-center pt-12 pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                Sentiment Analysis
                            </h1>
                            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                                A study evaluating four different techniques of sentiment classification.
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-4">
                            <Link
                                href="/report"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white shadow-sm font-medium hover:bg-blue-700 transition-all duration-200"
                            >
                                <FileText className="w-4 h-4" />
                                <span>View Full Report</span>
                            </Link>

                            <a
                                href="https://colab.research.google.com/drive/1gU0PFV91Ks4znhUGQNVu2cbUmfkotzmN#scrollTo=uxbuTN0bVOHp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 font-medium hover:text-blue-600 hover:border-blue-100 transition-all duration-200"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>View Colab Notebook</span>
                            </a>
                        </div>
                    </motion.div>
                </header>

                <div className="flex justify-center">
                    <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 shadow-sm">
                        <button
                            onClick={() => setActiveTab("analysis")}
                            className={`flex items-center space-x-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 ${activeTab === "analysis"
                                ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                                }`}
                        >
                            <BarChart3 className="h-4 w-4" />
                            <span>Analysis</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("topic")}
                            className={`flex items-center space-x-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 ${activeTab === "topic"
                                ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                                }`}
                        >
                            <PieChart className="h-4 w-4" />
                            <span>Topic Analysis</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("best")}
                            className={`flex items-center space-x-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 ${activeTab === "best"
                                ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                                }`}
                        >
                            <Medal className="h-4 w-4" />
                            <span>Best Model</span>
                        </button>
                    </div>
                </div>

                <main className="min-h-[600px]">
                    {activeTab === "analysis" && <TechniqueAnalysis data={data} />}
                    {activeTab === "best" && <BestTechnique data={data} />}
                    {activeTab === "topic" && <TopicAnalysis data={data} />}
                </main>
            </div>
        </div>
    );
}