import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { ViewState } from '../types/types';
import { useNavigation } from '../context/NavigationContext';

export function PrivacyPolicy() {
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
            <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
        </div>

        <div className="prose prose-indigo dark:prose-invert max-w-none prose-lg">
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
            Last updated: May 2026
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, phone number, shipping address, and payment information.
              In accordance with GDPR, we only collect data that is strictly necessary for providing our services.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <li>Process your orders and manage your account</li>
              <li>Communicate with you about products, services, offers, and promotions</li>
              <li>Provide and improve our customer support</li>
              <li>Detect, investigate, and prevent fraudulent transactions</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">3. Data Subject Rights (GDPR)</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you are a resident of the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR). We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us. In certain circumstances, you have the following data protection rights:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-600 dark:text-gray-300">
              <li>The right to access, update or to delete the information we have on you.</li>
              <li>The right of rectification.</li>
              <li>The right to object.</li>
              <li>The right of restriction.</li>
              <li>The right to data portability.</li>
              <li>The right to withdraw consent.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">4. Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
