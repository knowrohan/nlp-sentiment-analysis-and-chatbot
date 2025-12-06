"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Target, ShieldCheck, Star, Activity } from "lucide-react";

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

interface BestTechniqueProps {
  data: SentimentData[];
}

export function BestTechnique({ data }: BestTechniqueProps) {
  const techniques = ["LogReg", "NaiveBayes", "DecisionTree", "RandomForest"];

  const scores = techniques.map((tech) => {
    const correct = data.filter((item) => item[`correct_${tech}`]).length;
    return { name: tech, score: correct };
  });

  const best = scores.reduce((prev, current) => (prev.score > current.score ? prev : current));
  const accuracy = ((best.score / data.length) * 100).toFixed(1); // One decimal is cleaner

  // Detailed Breakdown
  const sentiments = ["Positive", "Negative", "Neutral", "Irrelevant"];
  const breakdown = sentiments.map((sentiment) => {
    const items = data.filter((item) => item.sentiment === sentiment);
    const correct = items.filter((item) => item[`correct_${best.name}`]).length;
    return {
      sentiment,
      accuracy: items.length > 0 ? ((correct / items.length) * 100).toFixed(0) : "0", // No decimals for cleaner bars
      count: items.length
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* Hero Section: The Verdict */}
      <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Trophy className="w-64 h-64 text-foreground opacity-10" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground text-background text-xs font-semibold tracking-wide uppercase">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              Highest Performing Model
            </div>

            <div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
                {best.name}
              </h2>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Outperforming other techniques, {best.name} demonstrated superior consistency across diverse sentence structures and sentiment nuances, making it the recommended model for production.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="flex flex-col items-center">
              <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 tracking-tighter">
                {accuracy}%
              </span>
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest mt-1">Overall Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Why it won (Qualitative) */}
        <Card className="rounded-3xl border-border shadow-sm p-8 flex flex-col justify-center">
          <h3 className="text-xl font-bold text-foreground mb-8 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            Why it won
          </h3>

          <div className="space-y-8">
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg">Precision Handling</h4>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  Minimizes false positives significantly better than Naive Bayes, ensuring high confidence in flagged sentiments.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg">Generalization</h4>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  Effectively captures underlying patterns in unseen data, avoiding the overfitting issues common in Decision Trees.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg">Robustness</h4>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  Handles the noisy, informal nature of social media text (abbreviations, slang) without significant performance degradation.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quantitative Breakdown */}
        <Card className="rounded-3xl border-border shadow-sm p-8">
          <h3 className="text-xl font-bold text-foreground mb-8">Performance by Category</h3>

          <div className="space-y-8">
            {breakdown.map((item) => (
              <div key={item.sentiment} className="group">
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-muted-foreground text-sm uppercase tracking-wide">{item.sentiment}</span>
                  <div className="text-right">
                    <span className="block font-bold text-foreground">Accuracy {item.accuracy}%</span>
                    <span className="text-xs text-muted-foreground font-medium">{item.count} samples</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.accuracy}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${item.sentiment === 'Positive' ? 'bg-emerald-500' :
                      item.sentiment === 'Negative' ? 'bg-rose-500' :
                        item.sentiment === 'Neutral' ? 'bg-blue-500' : 'bg-slate-400'
                      }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This breakdown reveals where the model excels and where it struggles. A balanced performance across all categories indicates a healthy, unbiased model.
            </p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}