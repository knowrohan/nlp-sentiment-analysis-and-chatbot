"use client";

import { useMemo } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

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

interface AnalysisProps {
    data: SentimentData[];
}

export function TechniqueAnalysis({ data }: AnalysisProps) {
    const metrics = useMemo(() => {
        const techniques = ["LogReg", "NaiveBayes", "DecisionTree", "RandomForest"];

        return techniques.map((tech) => {
            const correct = data.filter((item) => item[`correct_${tech}`]).length;
            const total = data.length;
            const accuracy = (correct / total) * 100;

            // Calculate Precision, Recall, F1 for each sentiment class and average them (Macro Average)
            const sentiments = ["Positive", "Negative", "Neutral", "Irrelevant"];
            let totalPrecision = 0;
            let totalRecall = 0;
            let totalF1 = 0;

            sentiments.forEach(sentiment => {
                const tp = data.filter(item => item.sentiment === sentiment && item[`pred_${tech}`] === sentiment).length;
                const fp = data.filter(item => item.sentiment !== sentiment && item[`pred_${tech}`] === sentiment).length;
                const fn = data.filter(item => item.sentiment === sentiment && item[`pred_${tech}`] !== sentiment).length;

                const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
                const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
                const f1 = precision + recall > 0 ? 2 * (precision * recall) / (precision + recall) : 0;

                totalPrecision += precision;
                totalRecall += recall;
                totalF1 += f1;
            });

            return {
                name: tech,
                Accuracy: accuracy.toFixed(2),
                Precision: ((totalPrecision / 4) * 100).toFixed(2),
                Recall: ((totalRecall / 4) * 100).toFixed(2),
                F1: ((totalF1 / 4) * 100).toFixed(2),
            };
        });
    }, [data]);

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="col-span-2"
            >
                <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-800">Model Performance Comparison</CardTitle>
                        <CardDescription className="text-slate-500">
                            Comparing Accuracy, Precision, Recall, and F1 Score across all models.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={metrics}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        className="text-xs font-medium text-slate-500"
                                        tick={{ fill: '#64748b' }}
                                        axisLine={{ stroke: '#e2e8f0' }}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        className="text-xs font-medium text-slate-500"
                                        tick={{ fill: '#64748b' }}
                                        axisLine={{ stroke: '#e2e8f0' }}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f1f5f9' }}
                                        contentStyle={{
                                            backgroundColor: "#ffffff",
                                            borderRadius: "12px",
                                            border: "1px solid #e2e8f0",
                                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                                            padding: "12px"
                                        }}
                                        itemStyle={{ fontSize: "12px", fontWeight: 500 }}
                                    />
                                    <Legend
                                        wrapperStyle={{ paddingTop: "20px" }}
                                        iconType="circle"
                                    />
                                    <Bar dataKey="Accuracy" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Accuracy" />
                                    <Bar dataKey="Precision" fill="#10b981" radius={[4, 4, 0, 0]} name="Precision" />
                                    <Bar dataKey="Recall" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Recall" />
                                    <Bar dataKey="F1" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="F1 Score" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="col-span-2"
            >
                <Card className="border-slate-200 shadow-sm bg-slate-50/50">
                    <CardContent className="pt-6">
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="space-y-1">
                                <h4 className="font-semibold text-blue-900 text-sm">Accuracy</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    The ratio of correctly predicted observations to the total observations.
                                </p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-emerald-900 text-sm">Precision</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    The ratio of correctly predicted positive observations to the total predicted positives.
                                </p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-amber-900 text-sm">Recall</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    The ratio of correctly predicted positive observations to the all observations in actual class.
                                </p>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-violet-900 text-sm">F1 Score</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    The weighted average of Precision and Recall.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {metrics.map((metric, index) => (
                <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold text-slate-800">{metric.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col p-3 bg-blue-50 rounded-lg">
                                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">Accuracy</span>
                                    <span className="text-2xl font-bold text-blue-900">{metric.Accuracy}%</span>
                                </div>
                                <div className="flex flex-col p-3 bg-violet-50 rounded-lg">
                                    <span className="text-xs font-medium text-violet-600 uppercase tracking-wider">F1 Score</span>
                                    <span className="text-2xl font-bold text-violet-900">{metric.F1}%</span>
                                </div>
                                <div className="flex flex-col p-3 bg-emerald-50 rounded-lg">
                                    <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Precision</span>
                                    <span className="text-2xl font-bold text-emerald-900">{metric.Precision}%</span>
                                </div>
                                <div className="flex flex-col p-3 bg-amber-50 rounded-lg">
                                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">Recall</span>
                                    <span className="text-2xl font-bold text-amber-900">{metric.Recall}%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
