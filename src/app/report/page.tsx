"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText, BarChart2, Brain, GitBranch, Binary, Code, Database, Filter, Settings, MessageSquare, Sparkles } from "lucide-react";

export default function ReportPage() {
    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="mx-auto max-w-4xl space-y-8 md:space-y-12">
                {/* Header */}
                <header className="space-y-4 md:space-y-6 pt-4 md:pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                            Sentiment Analysis Project Report
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                            An evaluation of four techniques for sentiment classification and a Chatbot with its own knowledge base for a poker assistant.
                        </p>
                    </motion.div>
                </header>

                {/* Main Content */}
                <main className="space-y-16">
                    {/* Introduction */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-blue-600">
                            <FileText className="w-6 h-6" />
                            <h2 className="text-2xl font-bold text-foreground">Overview</h2>
                        </div>
                        <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                            <p>
                                <strong>Part 1</strong> focuses on the comparative analysis of four machine learning algorithms for sentiment classification
                                By analyzing a dataset of labeled text, we evaluate each model&apos;s accuracy, precision, and reliability to determine
                                the most effective approach for automated sentiment analysis.

                                <br></br>
                                <strong>Part 2</strong> Ideally I wanted to use the processed data for a RAG chatbot with ways to select topics, but unfortunately time didn&apos;t permit.
                                Instead I used Gemini 2.0 Flash and a  RAG (Retrieval Augmented Generation) architecture for domain specific expertise.
                            </p>
                        </div>
                    </motion.section>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                            <span className="bg-background px-4 text-muted-foreground">Part 1: Sentiment Analysis</span>
                        </div>
                    </div>



                    {/* Methodology & Data Pipeline */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-3 text-blue-600">
                            <Database className="w-6 h-6" />
                            <h2 className="text-2xl font-bold text-foreground">Methodology & Data Pipeline</h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-4 text-foreground">
                                    <Database className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">1. Data Loading</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    The analysis utilizes two primary datasets: <strong>Twitter Training</strong> and <strong>Twitter Validation</strong>.
                                    These datasets contain labeled tweets with columns for ID, Entity, Sentiment, and Text content.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-4 text-foreground">
                                    <Filter className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">2. Data Preprocessing</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Text data is cleaned to ensure consistency and remove noise. Steps include:
                                </p>
                                <ul className="list-disc list-inside mt-2 text-muted-foreground text-sm space-y-1 ml-2">
                                    <li>Converting all text to lowercase.</li>
                                    <li>Removing HTML tags and URLs.</li>
                                    <li>Removing non-alphabetic characters (keeping only a-z, A-Z, and whitespace).</li>
                                    <li>Dropping rows with missing text values.</li>
                                </ul>
                            </div>

                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-4 text-foreground">
                                    <Binary className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">3. Feature Engineering</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    We use <strong>TF-IDF (Term Frequency-Inverse Document Frequency)</strong> vectorization to convert text into numerical features.
                                    The vectorizer is configured with <code>max_features=5000</code> to focus on the most significant words and reduce dimensionality.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-4 text-foreground">
                                    <Settings className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">4. Model Configuration</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Four models are trained and evaluated with specific hyperparameters:
                                </p>
                                <ul className="list-disc list-inside mt-2 text-muted-foreground text-sm space-y-1 ml-2">
                                    <li><strong>Logistic Regression:</strong> <code>max_iter=1000</code> for convergence.</li>
                                    <li><strong>Naive Bayes:</strong> Multinomial variant for text counts.</li>
                                    <li><strong>Decision Tree:</strong> Default parameters.</li>
                                    <li><strong>Random Forest:</strong> <code>n_estimators=50</code> trees.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* Code Implementation */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-blue-600">
                            <Code className="w-6 h-6" />
                            <h2 className="text-2xl font-bold text-foreground">Python Implementation</h2>
                        </div>
                        <div className="rounded-2xl bg-slate-900 p-6 overflow-x-auto shadow-lg">
                            <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                                <code>{`import pandas as pd
import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier

# 1. Load Data
print("Loading datasets...")
col_names = ['id', 'entity', 'sentiment', 'text']
train_df = pd.read_csv('twitter_training.csv', names=col_names, header=None)
test_df = pd.read_csv('twitter_validation.csv', names=col_names, header=None)

# 2. Cleaning
print("Cleaning text...")
train_df = train_df.dropna(subset=['text'])
test_df = test_df.dropna(subset=['text'])

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'http\\S+', '', text)
    text = re.sub(r'[^a-zA-Z\\s]', '', text)
    return text

train_df['clean_text'] = train_df['text'].apply(clean_text)
test_df['clean_text'] = test_df['text'].apply(clean_text)

# 3. Vectorization
print("Vectorizing...")
tfidf = TfidfVectorizer(max_features=5000)
X_train = tfidf.fit_transform(train_df['clean_text'])
X_test = tfidf.transform(test_df['clean_text'])

y_train = train_df['sentiment']

# 4. Train & Predict
models = {
    "LogReg": LogisticRegression(max_iter=1000),
    "NaiveBayes": MultinomialNB(),
    "DecisionTree": DecisionTreeClassifier(),
    "RandomForest": RandomForestClassifier(n_estimators=50)
}

print("Training models...")
# ... training loop and evaluation ...`}</code>
                            </pre>
                        </div>
                    </motion.section>

                    {/* Techniques */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-3 text-blue-600">
                            <Brain className="w-6 h-6" />
                            <h2 className="text-2xl font-bold text-foreground">Methodologies Evaluated</h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Naive Bayes */}
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-4 text-indigo-600">
                                    <BarChart2 className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">Naive Bayes</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    A probabilistic classifier based on Bayes&apos; theorem with an assumption of independence between features.
                                    It is particularly effective for text classification due to its simplicity and efficiency with high-dimensional data.
                                </p>
                            </div>

                            {/* Decision Tree */}
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-4 text-emerald-600">
                                    <GitBranch className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">Decision Tree</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    A non-parametric supervised learning method used for classification and regression.
                                    It creates a model that predicts the value of a target variable by learning simple decision rules inferred from the data features.
                                </p>
                            </div>

                            {/* Random Forest */}
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-4 text-rose-600">
                                    <Brain className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">Random Forest</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    An ensemble learning method that operates by constructing a multitude of decision trees at training time.
                                    It corrects for decision trees&apos; habit of overfitting to their training set, generally providing higher accuracy.
                                </p>
                            </div>

                            {/* Logistic Regression */}
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-4 text-amber-600">
                                    <Binary className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">Logistic Regression</h3>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    A statistical model that in its basic form uses a logistic function to model a binary dependent variable.
                                    In this context, it estimates the probability of a text belonging to a specific sentiment class.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Conclusion */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="p-6 rounded-2xl bg-muted border border-border">
                            <h3 className="text-lg font-bold text-foreground mb-3">Key Findings</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                The comparative analysis reveals distinct strengths and weaknesses for each algorithm.
                                While simpler models like Naive Bayes offer speed and efficiency, ensemble methods like Random Forest
                                typically demonstrate superior accuracy at the cost of computational resources. The &quot;Best Model&quot; tab
                                on the dashboard highlights the top-performing technique based on the current dataset.
                            </p>
                        </div>
                    </motion.section>

                    <div className="relative py-8">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-sm font-medium leading-6">
                            <span className="bg-background px-4 text-muted-foreground">Part 2: Chatbot Implementation</span>
                        </div>
                    </div>

                    {/* Chatbot Architecture */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8 pb-12"
                    >
                        <div className="flex items-center gap-3 text-blue-600">
                            <MessageSquare className="w-6 h-6" />
                            <h2 className="text-2xl font-bold text-foreground">AI Assistant Architecture</h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Card 1: System Setup */}
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-indigo-600">
                                        <Settings className="w-6 h-6" />
                                        <h3 className="text-xl font-bold text-foreground">System Setup</h3>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        The assistant is built on <strong>Gemini 2.0 Flash</strong>, configured with a knowledge base derived from sources including <a href="https://www.masterclass.com/articles/types-of-poker-explained" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">MasterClass</a>, Wikipedia, and other strategy guides.
                                    </p>
                                    <div className="pt-2 space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                                            <Brain className="w-4 h-4 text-amber-500" />
                                            <span>Model Registration</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-foreground font-medium">
                                            <Database className="w-4 h-4 text-emerald-500" />
                                            <span>Poker Knowledge Base (RAG)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Process Flow */}
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-center">
                                <div className="flex items-center gap-3 text-blue-600 mb-6">
                                    <GitBranch className="w-6 h-6" />
                                    <h3 className="text-xl font-bold text-foreground">Interaction Process</h3>
                                </div>

                                <div className="flex flex-col gap-2 relative max-w-sm mx-auto w-full">
                                    {/* Line connecting nodes */}
                                    <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 via-amber-500 to-emerald-500 opacity-30 ml-[1px]"></div>

                                    {/* Step 1 */}
                                    <div className="relative z-10 flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 p-3 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/60 transition-colors backdrop-blur-sm">
                                            <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-0.5">Input</div>
                                            <div className="text-sm font-medium text-foreground">System Instructions + Context</div>
                                        </div>
                                    </div>

                                    {/* Link Icon */}
                                    <div className="pl-12 opacity-0"></div>

                                    {/* Step 2 */}
                                    <div className="relative z-10 flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                            <MessageSquare className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 p-3 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/60 transition-colors backdrop-blur-sm">
                                            <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-0.5">User Action</div>
                                            <div className="text-sm font-medium text-foreground">Natural Language Query</div>
                                        </div>
                                    </div>

                                    {/* Link Icon */}
                                    <div className="pl-12 opacity-0"></div>

                                    {/* Step 3 */}
                                    <div className="relative z-10 flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 p-3 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/60 transition-colors backdrop-blur-sm">
                                            <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-0.5">Output</div>
                                            <div className="text-sm font-medium text-foreground">Context-Aware Response</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </main>
            </div>
        </div>
    );
}