/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload, FileJson, CheckCircle2, AlertCircle,
  Loader2, Trash2, Database, Box, Sparkles,
  ArrowLeft, LogOut, LayoutDashboard, Settings
} from 'lucide-react';
import { useOperator } from '../../context/OperatorContext';
import { BulkProductData, UploadResult } from '../../types/types';

interface DashboardProps {
  onBackToStore: () => void;
  onSignOut: () => void;
}

export function Dashboard({ onBackToStore, onSignOut }: DashboardProps) {
  const { bulkload, isUploading } = useOperator();
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<BulkProductData[] | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (extension !== "json" && extension !== "csv") {
      setError("Please upload a JSON or CSV file.");
      return;
    }
    setError(null);
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        if (extension === "json") {
          const json = JSON.parse(content);
          if (Array.isArray(json)) {
            setParsedData(json);
          } else {
            setError("JSON must be an array of products.");
          }
        } else {
          const data = parseCSV(content);
          if (data.length > 0) {
            setParsedData(data);
          } else {
            setError("CSV file is empty or invalid.");
          }
        }
      } catch (err) {
        setError("Error parsing file format.");
      }
    };
    reader.readAsText(file);
  };

  const parseCSV = (content: string): BulkProductData[] => {
    const lines = content.split(/\r?\n/).filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const results: BulkProductData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      const obj: any = {};

      headers.forEach((header, index) => {
        let val = currentline[index]?.trim().replace(/^"|"$/g, '') || '';

        if (header === 'price' || header === 'categoryId' || header === 'quantity') {
          obj[header] = Number(val);
        } else if (header === 'inStock') {
          obj[header] = val.toLowerCase() === 'true' || val === '1';
        } else {
          obj[header] = val;
        }
      });

      if (obj.title) {
        results.push(obj as BulkProductData);
      }
    }
    return results;
  };

  const handleUpload = async () => {
    if (!parsedData) return;
    setError(null);
    setUploadResult(null);
    try {
      const result = await bulkload(parsedData);
      setUploadResult(result);
      if (result.failed.length === 0) {
        setParsedData(null);
        setFile(null);
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload products.");
    }
  };

  const clearFile = () => {
    setFile(null);
    setParsedData(null);
    setUploadResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-950 transition-colors duration-500">
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-72 fixed inset-y-0 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 z-40 transition-colors">
        <div className="p-7">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">Operator</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Inventory Hub</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button className="w-full flex items-center gap-3 px-4 py-3.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl font-bold text-sm transition-all">
              <LayoutDashboard className="w-5 h-5" />
              Bulk Upload
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-2xl font-bold text-sm transition-all">
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </nav>
        </div>

        <div className="mt-auto p-7 space-y-3">
          <button
            onClick={onBackToStore}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-2xl font-bold text-sm transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Store
          </button>
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-2xl font-bold text-sm transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 md:ml-72 p-4 md:p-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight transition-colors">Bulk Inventory Load</h2>
            <p className="text-gray-500 dark:text-slate-400 font-medium mt-2">Ingest large batches of products into the system via JSON.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-gray-600 dark:text-slate-300">System Ready</span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl space-y-8">
          {/* ── Upload Area ── */}
          {!file ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-[2.5rem] p-16 text-center transition-all duration-300 ${dragActive
                ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10 scale-[1.02]"
                : "border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                  <Upload className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Upload Inventory JSON/CSV</h3>
                <p className="text-gray-400 dark:text-slate-500 font-medium max-w-xs mx-auto mb-8">
                  Drag and drop your product list or click to browse files.
                </p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".json,.csv"
                  onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                />
                <label
                  htmlFor="file-upload"
                  className="px-10 py-4 bg-gray-900 dark:bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-black dark:hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 cursor-pointer active:scale-95"
                >
                  Choose File
                </label>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-8 shadow-sm transition-colors"
            >
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center">
                    <FileJson className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900 dark:text-white">{file.name}</h4>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                      {(file.size / 1024).toFixed(1)} KB · {parsedData?.length || 0} Products
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearFile}
                  className="p-3 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>

              {parsedData && (
                <div className="space-y-6">
                  <div className="max-h-60 overflow-y-auto rounded-2xl bg-gray-50 dark:bg-slate-800 p-4 font-mono text-xs text-gray-600 dark:text-slate-400 transition-colors border border-gray-100 dark:border-slate-700">
                    <pre>{JSON.stringify(parsedData.slice(0, 5), null, 2)}</pre>
                    {parsedData.length > 5 && <div className="mt-2 text-center font-bold">... and {parsedData.length - 5} more items</div>}
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <button
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="flex-1 py-5 px-8 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Uploading Magic...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-6 h-6" />
                          Execute Bulk Load
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Status Messages ── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/30 p-6 rounded-3xl flex items-start gap-4 transition-colors"
              >
                <AlertCircle className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <h5 className="font-bold text-rose-900 dark:text-rose-400">Error Encountered</h5>
                  <p className="text-sm text-rose-700 dark:text-rose-500 font-medium mt-1">{error}</p>
                </div>
              </motion.div>
            )}

            {uploadResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-8 rounded-[2.5rem] border flex flex-col gap-6 transition-colors ${uploadResult.failed.length === 0
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30"
                  : "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30"
                  }`}
              >
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${uploadResult.failed.length === 0 ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                    }`}>
                    {uploadResult.failed.length === 0 ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                  </div>
                  <div>
                    <h4 className={`text-2xl font-black ${uploadResult.failed.length === 0 ? "text-emerald-900 dark:text-emerald-400" : "text-amber-900 dark:text-amber-400"}`}>
                      {uploadResult.failed.length === 0 ? "Bulk Load Complete!" : "Upload Partial Success"}
                    </h4>
                    <p className={`font-medium mt-1 ${uploadResult.failed.length === 0 ? "text-emerald-700 dark:text-emerald-500" : "text-amber-700 dark:text-amber-500"}`}>
                      {(uploadResult.success.supabase?.length || 0) + (uploadResult.success.appwrite?.length || 0)} products successfully added.
                    </p>
                  </div>
                </div>

                {uploadResult.failed.length > 0 && (
                  <div className="bg-white/50 dark:bg-black/20 rounded-2xl p-5 border border-amber-200/50">
                    <p className="text-xs font-black uppercase tracking-widest text-amber-800 dark:text-amber-500 mb-3">Failed Items ({uploadResult.failed.length})</p>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                      {uploadResult.failed.map((fail, i) => (
                        <div key={i} className="flex items-center justify-between text-xs py-2 border-b border-amber-100/30 last:border-0">
                          <span className="font-bold text-amber-900 dark:text-amber-400 truncate max-w-[200px]">{fail.data.title}</span>
                          <span className="text-amber-600 dark:text-amber-600 font-medium">{fail.error}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Quick Stats ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10">
            <StatCard icon={Box} label="Products In Queue" value="0" iconBg="bg-indigo-500" />
            <StatCard icon={Database} label="System Capacity" value="99.9%" iconBg="bg-emerald-500" />
            <StatCard icon={Sparkles} label="Recent Uploads" value="12" iconBg="bg-pink-500" />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, iconBg }: { icon: any, label: string, value: string, iconBg: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-3 transition-colors shadow-sm">
      <div className={`w-10 h-10 ${iconBg} text-white rounded-xl flex items-center justify-center`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-gray-900 dark:text-white mt-0.5">{value}</p>
      </div>
    </div>
  );
}
