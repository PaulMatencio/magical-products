import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export function TermsOfService() {
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold mb-12 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl">
            <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Terms of Service
          </h1>
        </div>

        <div className="prose prose-indigo dark:prose-invert max-w-none prose-lg">
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
            Last updated: May 2026
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              By accessing our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">2. Use License</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">3. Disclaimer</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
