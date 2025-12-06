"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText, BarChart2, Brain, GitBranch, Binary, Code, Database, Filter, Settings, MessageSquare, Sparkles } from "lucide-react";

export default function ReportPage() {
    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto max-w-4xl space-y-12">
                {/* Header */}
                <header className="space-y-6 pt-8">
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
                            Sentiment Analysis Report
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                            A comprehensive evaluation of four machine learning techniques for sentiment classification, coupled with an intelligent RAG-based poker assistant.
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
                                This study compares the performance of four distinct machine learning algorithms in classifying text sentiment.
                                By analyzing a dataset of labeled text, we evaluate each model&apos;s accuracy, precision, and reliability to determine
                                the most effective approach for automated sentiment analysis. Additionally, we integrate a Generative AI chatbot configured with Retrieval Augmented Generation (RAG) principles to serve as a domain expert.
                            </p>
                        </div>
                    </motion.section>

                    {/* Chatbot Architecture */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-3 text-blue-600">
                            <MessageSquare className="w-6 h-6" />
                            <h2 className="text-2xl font-bold text-foreground">AI Assistant Architecture</h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="p-6 rounded-2xl bg-foreground text-background shadow-xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Sparkles className="w-32 h-32" />
                                </div>
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-3 text-amber-400">
                                        <Brain className="w-6 h-6" />
                                        <h3 className="text-xl font-bold text-background">The Brain: Gemini 2.0</h3>
                                    </div>
                                    <p className="leading-relaxed">
                                        The core intelligence is powered by Google&apos;s <strong>Gemini 2.0 Flash</strong> model. Selected for its low latency and high reasoning capabilities, it processes natural language queries with context-aware precision.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-indigo-600">
                                        <Database className="w-6 h-6" />
                                        <h3 className="text-xl font-bold text-foreground">Context Injection (RAG)</h3>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Unlike standard chatbots, this assistant doesn&apos;t hallucinate rules. We utilize a static RAG (Retrieval-Augmented Generation) approach where the entire <strong>Poker Knowledge Base</strong> (rules, hands, strategies) is injected into the model&apos;s system instruction.
                                    </p>
                                    <ul className="space-y-2 mt-4">
                                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            System Instruction: &quot;You are a helpful assistant...&quot;
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Context: &quot;Poker Definitions, Hand Rankings...&quot;
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            User Query: &quot;What is a Flush?&quot;
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.section>

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
                        className="space-y-6 pb-12"
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
                </main>
            </div>
        </div>
    );
}