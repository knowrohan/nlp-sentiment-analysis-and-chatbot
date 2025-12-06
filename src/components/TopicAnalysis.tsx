"use client";

import { useMemo, useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2, Zap, ArrowLeft, Quote, MessageSquare } from "lucide-react";

interface SentimentData {
  id: number;
  entity: string;
  sentiment: string;
  text: string;
  clean_text: string;
  pred_LogReg: string;
  conf_LogReg: number;
  correct_LogReg: boolean;
  agreement: number;
  [key: string]: string | number | boolean | undefined;
}

interface TopicAnalysisProps {
  data: SentimentData[];
}

export function TopicAnalysis({ data }: TopicAnalysisProps) {
  const [viewMode, setViewMode] = useState<"sentiment" | "accuracy">("sentiment");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // 1. Process Data for Chart
  const topicMetrics = useMemo(() => {
    const groups: Record<string, SentimentData[]> = {};
    data.forEach((item) => {
      if (!groups[item.entity]) groups[item.entity] = [];
      groups[item.entity].push(item);
    });

    const metrics = Object.keys(groups).map((entity) => {
      const items = groups[entity];
      const total = items.length;
      const positive = items.filter((i) => i.sentiment === "Positive").length;
      const negative = items.filter((i) => i.sentiment === "Negative").length;
      const neutral = items.filter((i) => i.sentiment === "Neutral").length;
      const irrelevant = items.filter((i) => i.sentiment === "Irrelevant").length;

      // Calculate accuracy for LogReg as a proxy for "Model Performance" on this topic
      const accLogReg = (items.filter((i) => i.correct_LogReg).length / total) * 100;

      return {
        name: entity,
        total,
        Positive: positive,
        Negative: negative,
        Neutral: neutral,
        Irrelevant: irrelevant,
        Accuracy: parseFloat(accLogReg.toFixed(1)),
      };
    });

    // Sort by volume and take top 15 for a dense but readable chart
    return metrics.sort((a, b) => b.total - a.total).slice(0, 15);
  }, [data]);

  // 2. Get details for the selected topic
  const selectedTopicData = useMemo(() => {
    if (!selectedTopic) return null;
    const items = data.filter((item) => item.entity === selectedTopic);

    // Get 3 random text samples
    const samples = items.sort(() => 0.5 - Math.random()).slice(0, 4);

    // Basic stats
    const total = items.length;
    const positive = items.filter((i) => i.sentiment === "Positive").length;
    const negative = items.filter((i) => i.sentiment === "Negative").length;
    const dominantSentiment = [
      { label: 'Positive', count: positive },
      { label: 'Negative', count: negative },
      { label: 'Neutral', count: items.filter((i) => i.sentiment === "Neutral").length },
    ].sort((a, b) => b.count - a.count)[0].label;

    return {
      name: selectedTopic,
      total,
      dominantSentiment,
      samples,
      items // full list if needed
    };
  }, [data, selectedTopic]);

  // Handlers
  const handleBarClick = (data: { activeLabel?: string | number }) => {
    if (data && data.activeLabel) {
      setSelectedTopic(String(data.activeLabel));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls (Only show when not in detail view) */}
      {!selectedTopic && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-3xl border border-border shadow-sm"
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Topic Landscape</h2>
            <p className="text-muted-foreground mt-1">
              Explore the top <span className="font-semibold text-foreground">{topicMetrics.length}</span> discussed topics. Click on any bar to see what people are actually saying.
            </p>
          </div>
          <div className="flex flex-wrap gap-1 bg-muted p-1.5 rounded-xl">
            <button
              onClick={() => setViewMode("sentiment")}
              className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${viewMode === "sentiment"
                ? "bg-card shadow-sm text-blue-600 ring-1 ring-black/5 dark:ring-border"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
            >
              <BarChart2 className="w-4 h-4 mr-2" />
              Sentiment
            </button>
            <button
              onClick={() => setViewMode("accuracy")}
              className={`flex items-center px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${viewMode === "accuracy"
                ? "bg-card shadow-sm text-blue-600 ring-1 ring-black/5 dark:ring-border"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
            >
              <Zap className="w-4 h-4 mr-2" />
              Difficulty
            </button>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {selectedTopic && selectedTopicData ? (
          /* DETAIL VIEW */
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <button
                onClick={() => setSelectedTopic(null)}
                className="group flex items-center text-sm font-semibold text-muted-foreground hover:text-blue-600 transition-colors"
              >
                <div className="bg-card border border-border p-2 rounded-lg mr-2 group-hover:border-blue-200 shadow-sm">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                Back to Overview
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Col: Topic Stats */}
              <Card className="lg:col-span-1 rounded-3xl border-border shadow-sm overflow-hidden h-fit">
                <div className="bg-foreground p-6 text-background">
                  <h2 className="text-3xl font-bold">{selectedTopicData.name}</h2>
                  <p className="text-muted-foreground mt-1">Entity Report</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Volume</div>
                    <div className="text-3xl font-bold text-foreground">{selectedTopicData.total} <span className="text-base font-normal text-muted-foreground">mentions</span></div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Dominant Sentiment</div>
                    <div className={`text-2xl font-bold ${selectedTopicData.dominantSentiment === 'Positive' ? 'text-emerald-600' :
                      selectedTopicData.dominantSentiment === 'Negative' ? 'text-rose-600' : 'text-blue-600'
                      }`}>
                      {selectedTopicData.dominantSentiment}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Right Col: The Human Element (Samples) */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  What people are saying
                </h3>

                <div className="grid gap-4">
                  {selectedTopicData.samples.map((sample, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <Quote className="w-5 h-5 text-muted-foreground fill-muted" />
                        </div>
                        <div className="space-y-3">
                          <p className="text-foreground leading-relaxed font-medium">&quot;{sample.text}&quot;</p>
                          <div className="flex gap-2">
                            <span className={`text-xs px-2 py-1 rounded-md font-medium ${sample.sentiment === 'Positive' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' :
                              sample.sentiment === 'Negative' ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300' :
                                'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                              }`}>
                              {sample.sentiment}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* MAIN CHART VIEW */
          <motion.div
            key="chart"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="bg-muted/50 border-b border-border pb-8">
                <CardTitle className="text-xl font-bold text-foreground">
                  {viewMode === "sentiment"
                    ? "Sentiment Distribution by Topic"
                    : "Model Difficulty by Topic"}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {viewMode === "sentiment"
                    ? "Stacked breakdown of sentiments per entity. Click a bar to drill down."
                    : "Percentage of correct predictions per topic. Lower is harder."}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 px-2 sm:px-8">
                <div className="overflow-x-auto pb-4">
                  <div className="h-[500px] w-full min-w-[600px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topicMetrics}
                        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                        onClick={handleBarClick}
                        className="cursor-pointer"
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          className="text-xs font-medium text-muted-foreground"
                          tick={{ fill: 'currentColor' }}
                          axisLine={{ stroke: 'var(--border)' }}
                          tickLine={false}
                        />
                        <YAxis
                          className="text-xs font-medium text-muted-foreground"
                          tick={{ fill: 'currentColor' }}
                          axisLine={{ stroke: 'var(--border)' }}
                          tickLine={false}
                        />
                        <Tooltip
                          cursor={{ fill: 'var(--muted)', opacity: 0.8 }}
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            borderRadius: "16px",
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                            padding: "16px"
                          }}
                          itemStyle={{ fontSize: "13px", fontWeight: 600, padding: "2px 0" }}
                        />
                        <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
                        {viewMode === "sentiment" ? (
                          <>
                            <Bar dataKey="Positive" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                            <Bar dataKey="Negative" stackId="a" fill="#f43f5e" />
                            <Bar dataKey="Neutral" stackId="a" fill="#3b82f6" />
                            <Bar dataKey="Irrelevant" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                          </>
                        ) : (
                          <Bar
                            dataKey="Accuracy"
                            fill="#6366f1"
                            radius={[6, 6, 0, 0]}
                            activeBar={{ fill: '#4f46e5' }}
                          />
                        )}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}