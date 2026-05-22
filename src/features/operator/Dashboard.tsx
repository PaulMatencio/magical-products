import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Database, Sparkles, Upload, FolderOpen, Loader2,
  CheckCircle2, XCircle, ArrowLeft, LogOut, Terminal, Sun, Moon
} from 'lucide-react';
import { useOperator } from '../../context/OperatorContext';
import { useInventory } from '../../context/InventoryContext';
import { useTheme } from '../../context/ThemeContext';
import { Button, Card } from '../../shared/ui';

interface DashboardProps {
  onBackToStore: () => void;
  onSignOut: () => void;
}

export function Dashboard({ onBackToStore, onSignOut }: DashboardProps) {
  const { theme, toggleTheme } = useTheme();
  const { categories, brands } = useInventory();
  
  const {
    imageFiles,
    isUploading,
    currentProgress,
    uploadLogs,
    handleFolderSelect,
    startBulkload,
    clearScannedFiles
  } = useOperator();

  const directoryInputRef = useRef<HTMLInputElement>(null);
  const logTerminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logTerminalRef.current) {
      logTerminalRef.current.scrollTop = logTerminalRef.current.scrollHeight;
    }
  }, [uploadLogs]);

  const onStartUpload = () => {
    startBulkload(categories, brands);
  };

  const handleSelectFolderClick = () => {
    if (directoryInputRef.current) {
      directoryInputRef.current.click();
    }
  };

  // Calculate stats
  const totalToUpload = imageFiles.length;
  const processedCount = currentProgress ? currentProgress.index : 0;
  const progressPercent = totalToUpload > 0 ? Math.round((processedCount / totalToUpload) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-slate-950 font-sans transition-colors duration-500 text-gray-900 dark:text-gray-100">
      
      {/* ── Sidebar ── */}
      <aside className="w-full md:w-80 flex flex-col bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-gray-100 dark:border-slate-800 shrink-0 p-6 md:p-8 transition-colors">
        <div className="flex items-center gap-3 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-2xl blur-md opacity-60" />
            <div className="relative p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl">
              <Database className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight leading-none">Operator</h1>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Portal</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
              Task Mode
            </h2>
            <Card padding="sm" className="bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/50">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-indigo-900 dark:text-indigo-200">Directory Bulk Load</p>
                  <p className="text-xs text-indigo-700/80 dark:text-indigo-400/80 mt-1 leading-relaxed">
                    Mass ingest products by selecting a folder containing pairs of images and JSON metadata files.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {totalToUpload > 0 && (
            <div className="space-y-3 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-850">
              <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                Scanned Items
              </h3>
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black">{totalToUpload}</span>
                <span className="text-xs font-bold text-gray-450 dark:text-slate-400">products ready</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800 space-y-2 shrink-0">
          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={toggleTheme}
            leftIcon={theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start hover:bg-gray-100 dark:hover:bg-slate-800"
            onClick={onBackToStore}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Store
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-rose-500 hover:text-rose-650 hover:bg-rose-50 dark:hover:bg-rose-950/20"
            onClick={onSignOut}
            leftIcon={<LogOut className="w-4 h-4" />}
          >
            Sign Out
          </Button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex flex-col p-6 md:p-8 overflow-y-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-black tracking-tight">Mass Product Ingestion</h2>
          <p className="text-gray-500 dark:text-slate-400 mt-1">Upload folders containing images and product metadata in bulk.</p>
        </header>

        {totalToUpload === 0 ? (
          /* Empty state - Scan Folder Trigger */
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-xl text-center">
              <div
                onClick={handleSelectFolderClick}
                className="group relative cursor-pointer border-2 border-dashed border-gray-250 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-3xl p-12 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center"
              >
                <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-5 transition-opacity" />
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <FolderOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black mb-2">Scan Local Folder</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
                  Select a directory containing product images (PNG, JPEG, WebP) and matching JSON metadata files.
                </p>
                <Button
                  onClick={handleSelectFolderClick}
                  leftIcon={<Upload className="w-4 h-4" />}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20 text-white font-bold rounded-xl"
                >
                  Choose Directory
                </Button>
              </div>

              {/* Hidden file input for webkitdirectory */}
              <input
                ref={directoryInputRef}
                type="file"
                className="hidden"
                {...({ webkitdirectory: '', directory: '' } as any)}
                multiple
                onChange={(e) => handleFolderSelect(e.target.files)}
              />
            </div>
          </div>
        ) : (
          /* Ingestion Flow View */
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Top Stats Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="flex items-center gap-4 p-5">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-2xl shrink-0">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Scanned Queue</p>
                  <p className="text-xl font-black">{totalToUpload} Products</p>
                </div>
              </Card>

              <Card className="flex items-center gap-4 p-5">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-2xl shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Ingested Successfully</p>
                  <p className="text-xl font-black">
                    {uploadLogs.filter(l => l.startsWith('✅')).length} / {totalToUpload}
                  </p>
                </div>
              </Card>

              <Card className="flex items-center gap-4 p-5">
                <div className="p-3 bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 rounded-2xl shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Failed Uploads</p>
                  <p className="text-xl font-black">
                    {uploadLogs.filter(l => l.startsWith('❌')).length}
                  </p>
                </div>
              </Card>
            </div>

            {/* Current upload progress bar */}
            {isUploading && (
              <Card className="p-6 border-indigo-200 dark:border-indigo-900 bg-indigo-50/10">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
                    <span className="text-sm font-bold">
                      Uploading: {currentProgress?.fileName}
                    </span>
                  </div>
                  <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                    {progressPercent}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </Card>
            )}

            {/* Ingestion Console / Logs Terminal */}
            <Card padding="none" className="flex-1 flex flex-col overflow-hidden border-slate-200 dark:border-slate-800 shadow-lg min-h-[300px]">
              <div className="bg-slate-900 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-slate-300">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold font-mono tracking-wider">INGESTION_LOG_STREAM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
              </div>
              <div
                ref={logTerminalRef}
                className="flex-1 p-6 bg-slate-950 font-mono text-xs text-slate-350 leading-relaxed overflow-y-auto max-h-[450px]"
              >
                {uploadLogs.length === 0 ? (
                  <p className="text-slate-500 italic">No activity logs recorded yet.</p>
                ) : (
                  uploadLogs.map((log, index) => (
                    <div
                      key={index}
                      className={`mb-1.5 transition-all ${
                        log.startsWith('✅') ? 'text-emerald-400 font-bold' :
                        log.startsWith('❌') ? 'text-rose-450 font-bold' :
                        log.startsWith('💥') || log.startsWith('Error') ? 'text-red-400 font-black bg-red-950/20 px-2 py-0.5 rounded' :
                        log.startsWith('🎉') ? 'text-cyan-400 font-black' :
                        'text-slate-400'
                      }`}
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 shrink-0">
              <Button
                variant="secondary"
                onClick={clearScannedFiles}
                disabled={isUploading}
                className="px-6 py-3 font-bold rounded-xl"
              >
                Clear / Scan Another
              </Button>
              
              <Button
                onClick={onStartUpload}
                isLoading={isUploading}
                disabled={imageFiles.length === 0}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20"
              >
                Start Bulk Upload
              </Button>
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
}
