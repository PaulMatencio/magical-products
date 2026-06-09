import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Save, Image as ImageIcon, Loader2, FolderOpen, CheckCircle2, AlertCircle, FileJson, Info, Search, FileImage, QrCode, X, Copy, ExternalLink, Database } from 'lucide-react';
import { Product, Category, Brand } from '../../types/types';
import { QRCodeSVG } from 'qrcode.react';
import { useProductFormLogic } from '../../presentation/hooks/useProductFormLogic';
import { MetadataInspector } from '../../components/MetadataInspector';

interface ProductFormViewProps {
  onClose: () => void;
  onSave: (productData: Partial<Product>) => Promise<void>;
  initialData?: Product | null;
  categories: Category[];
  brands: Brand[];
  isMutating: boolean;
}

export function ProductFormView({ onClose, onSave, initialData, categories, brands, isMutating }: ProductFormViewProps) {
  const directoryInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = !!initialData;

  const {
    formData,
    setFormData,
    imageFiles,
    selectedFile,
    committedFileNames,
    isProcessing,
    uploadProgress,
    processedMetadata,
    showMetadataModal,
    setShowMetadataModal,
    handleFolderSelect,
    handleProcessFile,
    handleSubmit,
    copyMetadataToClipboard,
  } = useProductFormLogic(categories, brands);

  const [activeTab, setActiveTab] = useState<'preview' | 'json'>('preview');

  // Seed the form when editing an existing product
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, setFormData]);

  const discountPrice = formData.price && formData.discount_percentage
    ? (formData.price * (1 - formData.discount_percentage / 100)).toFixed(2)
    : null;

  // Wrap the hook's handleSubmit to supply the closure-scoped onSave & isEditMode
  const onFormSubmit = (e: React.FormEvent) => handleSubmit(e, onSave, isEditMode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-3 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-2xl transition-all shadow-sm border border-gray-100 dark:border-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
              {isEditMode ? 'Update product details and stock.' : 'Process IPFS files from your local filesystem.'}
            </p>
          </div>
        </div>
      </div>

      {/* File Processing Section (Only for new products) */}
      {!isEditMode && (
        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-[1rem] p-6 sm:p-8 border border-indigo-100 dark:border-indigo-800/30 shadow-sm transition-all overflow-hidden relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-600/20">
                <FolderOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-indigo-900 dark:text-indigo-100">Filesystem Explorer</h3>
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => directoryInputRef.current?.click()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-600/20 active:scale-95"
            >
              <FolderOpen className="w-5 h-5" />
              {imageFiles.length > 0 ? 'Change Directory' : 'Select Product Directory'}
            </button>
          </div>

          <input
            type="file"
            ref={directoryInputRef}
            style={{ display: 'none' }}
            {...({ webkitdirectory: '', directory: '' } as any)}
            onChange={handleFolderSelect}
          />

          <AnimatePresence mode="wait">
            {imageFiles.length > 0 ? (
              <motion.div
                key="file-list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-xs font-black text-indigo-600/60 dark:text-indigo-400/60 uppercase tracking-widest mb-2 px-1">
                  <Search className="w-3.5 h-3.5" /> Found {imageFiles.length} Images — Select one to process
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {imageFiles.map((file) => {
                    const isSelected = selectedFile?.name === file.name;
                    const isCommitted = committedFileNames.has(file.name);
                    return (
                      <button
                        key={file.name}
                        onClick={() => handleProcessFile(file)}
                        disabled={isProcessing || isCommitted}
                        className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all text-left relative overflow-hidden ${isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/30'
                          : isCommitted
                            ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/40 opacity-80'
                            : 'bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900/40 hover:border-indigo-400 dark:hover:border-indigo-500 text-gray-700 dark:text-slate-300'
                          }`}
                      >
                        <div className={`p-3 rounded-xl ${isSelected
                          ? 'bg-white/20'
                          : isCommitted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                          }`}>
                          {isCommitted ? <CheckCircle2 className="w-5 h-5" /> : <FileImage className="w-5 h-5" />}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{file.name}</p>
                          <p className={`text-[10px] font-medium opacity-60 ${isSelected ? 'text-white' : 'text-gray-500 dark:text-slate-400'}`}>
                            {isCommitted ? 'COMMITTED TO STORE' : `${(file.size / 1024).toFixed(1)} KB`}
                          </p>
                        </div>

                        {isCommitted && (
                          <div className="absolute top-0 right-0 p-1.5 bg-emerald-500 text-white rounded-bl-xl shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-dashed border-indigo-200 dark:border-indigo-800/40 rounded-[1rem] bg-white/40 dark:bg-slate-900/40"
              >
                <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 rounded-[1rem] mb-4">
                  <Search className="w-10 h-10 text-indigo-300 dark:text-indigo-700" />
                </div>
                <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-2">No Directory Selected</h4>
                <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70 max-w-sm">
                  Click the button above to select a folder on your filesystem. We'll scan it for product images and their matching JSON metadata.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Processing Overlay */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-indigo-600/90 backdrop-blur-sm flex flex-col items-center justify-center text-white z-10"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-20 animate-pulse" />
                  <Loader2 className="w-16 h-16 animate-spin relative z-10" />
                </div>
                <h3 className="text-2xl font-black mb-2 tracking-tight">Processing Magic...</h3>
                <div className="flex flex-col items-center gap-1.5 opacity-80">
                  {uploadProgress === 'uploading_image' && <p className="text-sm font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Pinning image to IPFS...</p>}
                  {uploadProgress === 'uploading_metadata' && <p className="text-sm font-bold flex items-center gap-2"><FileJson className="w-4 h-4" /> Consolidating and pinning JSON...</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Form Content */}
      <div className="bg-white dark:bg-slate-900 rounded-[1rem] shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors">
        <form id="product-form" onSubmit={onFormSubmit} className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Left Column: Readonly Metadata */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-[1rem] border border-gray-100 dark:border-slate-800 space-y-6">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                  <FileJson className="w-4 h-4 text-indigo-500" /> IPFS Record Info
                </h4>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Product Name</label>
                  <input readOnly value={formData.name || ''} className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 cursor-not-allowed outline-none font-bold" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Display Title</label>
                  <input readOnly value={formData.title || ''} className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 cursor-not-allowed outline-none font-bold" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Category</label>
                    <input
                      readOnly
                      value={categories.find(c => c.id === formData.category_id)?.name || ''}
                      className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 cursor-not-allowed outline-none font-bold text-center"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Barcode / CID</label>
                    <input readOnly value={formData.barcode_id?.substring(0, 10) + '...' || ''} title={formData.barcode_id} className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 cursor-not-allowed outline-none font-bold text-center" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1">Description Extract</label>
                  <textarea readOnly rows={4} value={formData.description || ''} className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 cursor-not-allowed outline-none resize-none font-medium leading-relaxed" />
                </div>
              </div>
            </div>

            {/* Right Column: Editable Business Data & Image */}
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest px-1 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-indigo-500" /> Image Asset Preview
                </label>
                <div className="w-full h-64 rounded-[1rem] border-2 border-dashed border-indigo-100 dark:border-slate-800 overflow-hidden bg-indigo-50/30 dark:bg-slate-800/20 relative group transition-colors flex items-center justify-center">
                  {formData.image_url ? (
                    <img src={formData.image_url} alt="Product" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-8">
                      <ImageIcon className="w-12 h-12 text-indigo-200 dark:text-slate-700 mx-auto mb-3" />
                      <p className="text-sm text-indigo-300 dark:text-slate-600 font-bold uppercase tracking-widest">No Image Loaded</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-8 rounded-[1rem] text-white shadow-xl shadow-indigo-600/20 space-y-8">
                <h4 className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Info className="w-4 h-4" /> Market Details (Editable)
                </h4>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/60 uppercase tracking-widest ml-1">Retail Price ($)</label>
                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price || 0}
                      onChange={e => setFormData(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))}
                      className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 focus:bg-white/20 outline-none transition-all font-black text-2xl text-white placeholder-white/30"
                    />
                    {discountPrice && (
                      <div className="flex items-center gap-2 px-1">
                        <span className="text-xs font-bold text-white/50 line-through">${formData.price}</span>
                        <span className="text-xs font-black text-emerald-300">Sale: ${discountPrice}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/60 uppercase tracking-widest ml-1">Discount (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={formData.discount_percentage || 0}
                      onChange={e => setFormData(p => ({ ...p, discount_percentage: parseInt(e.target.value, 10) || 0 }))}
                      className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 focus:bg-white/20 outline-none transition-all font-black text-2xl text-white placeholder-white/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/60 uppercase tracking-widest ml-1">Stock Level</label>
                    <input
                      required
                      type="number"
                      min="0"
                      max="100"
                      value={formData.quantity || 0}
                      onChange={e => setFormData(p => ({ ...p, quantity: parseInt(e.target.value, 10) || 0 }))}
                      className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 focus:bg-white/20 outline-none transition-all font-black text-2xl text-white placeholder-white/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/60 uppercase tracking-widest ml-1">Availability</label>
                    <div className="flex items-center h-[64px]">
                      <label className="relative inline-flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.in_stock}
                          onChange={e => setFormData(p => ({ ...p, in_stock: e.target.checked }))}
                        />
                        <div className="w-14 h-8 bg-black/20 peer-focus:outline-none rounded-full peer dark:bg-black/40 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
                        <span className="ml-4 text-sm font-black uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">{formData.in_stock ? 'Active' : 'Hidden'}</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2 col-span-2">
                    <label className="text-[10px] font-black text-white/60 uppercase tracking-widest ml-1">Product State</label>
                    <select
                      value={formData.product_state || 'active'}
                      onChange={e => setFormData(p => ({ ...p, product_state: e.target.value as any }))}
                      className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 focus:bg-white/20 focus:text-white outline-none transition-all font-black text-sm text-white cursor-pointer h-[64px]"
                    >
                      <option value="active" className="text-gray-900 bg-white">Active</option>
                      <option value="phasing_out" className="text-gray-900 bg-white">Phasing Out</option>
                      <option value="discontinued" className="text-gray-900 bg-white">Discontinued</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="p-8 border-t border-gray-100 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-800/40 flex flex-col sm:flex-row justify-between items-center gap-6 transition-colors">
          <div className="flex items-center gap-6">
            {formData.digital_passport_url ? (
              <button
                onClick={() => setShowMetadataModal(true)}
                className="group relative p-3 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all flex items-center justify-center"
                title="Inspect Metadata QR"
              >
                <div className="p-1 bg-white rounded-lg">
                  <QRCodeSVG value={formData.digital_passport_url} size={48} level="H" />
                </div>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-lg">
                  CLICK TO INSPECT JSON
                </div>
              </button>
            ) : (
              <div className="p-3 bg-gray-100 dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 opacity-40 grayscale">
                <QrCode className="w-12 h-12 text-gray-400" />
              </div>
            )}

            <div className="flex items-center gap-4 text-gray-400 dark:text-slate-500">
              <Info className="w-5 h-5" />
              <p className="text-xs font-bold uppercase tracking-widest">Metadata must be processed before saving</p>
            </div>
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-10 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-xs text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-800 transition-all bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-sm"
              disabled={isMutating}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="product-form"
              disabled={isMutating || !formData.image_url || !formData.barcode_id}
              className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-12 py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-xs text-white bg-gray-900 dark:bg-indigo-600 hover:bg-black dark:hover:bg-indigo-700 transition-all shadow-xl shadow-gray-900/20 dark:shadow-indigo-900/20 disabled:opacity-30 disabled:cursor-not-allowed group"
            >
              {isMutating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 transition-transform group-hover:scale-110" />}
              {isMutating ? 'Synchronizing...' : 'Commit to Store'}
            </button>
          </div>
        </div>
      </div>

      {/* Metadata Inspection Modal */}
      <AnimatePresence>
        {showMetadataModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMetadataModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-[1rem] shadow-2xl overflow-hidden border border-white/10"
            >
              <div className="p-8 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/30">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-600/20">
                    <FileJson className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Metadata Inspector</h3>
                    <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Consolidated IPFS JSON</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowMetadataModal(false)}
                  className="p-3 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-2xl transition-colors text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>              {/* Tab switcher */}
              <div className="flex border-b border-gray-100 dark:border-slate-800 px-8 bg-gray-50/50 dark:bg-slate-800/20">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`py-4 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'preview' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  Visual Preview
                </button>
                <button
                  onClick={() => setActiveTab('json')}
                  className={`py-4 px-6 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'json' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                >
                  Raw JSON
                </button>
              </div>

              {activeTab === 'preview' ? (
                <div className="p-8 max-h-[55vh] overflow-y-auto bg-gray-50/20 dark:bg-slate-900/10">
                  <MetadataInspector metadata={processedMetadata?.partial_metadata || null} />
                </div>
              ) : (
                <div className="p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl">
                      <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-xs font-black text-indigo-900 dark:text-indigo-100 uppercase tracking-widest">CID: {formData.barcode_id}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={copyMetadataToClipboard}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold transition-all"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy JSON
                      </button>
                      <a
                        href={formData.digital_passport_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl text-xs font-bold transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Open Gateway
                      </a>
                    </div>
                  </div>

                  <div className="relative group">
                    <pre className="w-full max-h-[300px] overflow-auto p-6 bg-slate-950 rounded-[1rem] text-indigo-300 font-mono text-sm leading-relaxed border border-white/5 scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-transparent">
                      {JSON.stringify(processedMetadata, null, 2)}
                    </pre>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-black text-white/60 uppercase tracking-widest border border-white/5">
                        Read Only
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-2xl">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                      This is the exact JSON structure that has been pinned to IPFS and will be stored in the database. Verify all fields before committing.
                    </p>
                  </div>
                </div>
              )}

              <div className="p-8 bg-gray-50 dark:bg-slate-800/30 border-t border-gray-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setShowMetadataModal(false)}
                  className="px-8 py-3 bg-gray-900 dark:bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black dark:hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-900/20"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
