import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Camera,
  Clipboard,
  Download,
  Loader2,
  PackagePlus,
  ScanLine,
  Square,
  Sparkles,
  Settings,
  Upload,
} from 'lucide-react';
import { Button, Card } from '../../shared/ui';
import i18n from '../../i18n';
import { useBarcodeProductScannerLogic } from '../../presentation/hooks/useBarcodeProductScannerLogic';


interface BarcodeProductScannerProps {
  onBack: () => void;
}

export function BarcodeProductScanner({ onBack }: BarcodeProductScannerProps) {
  const { t } = useTranslation('scanner');
  const [isDragging, setIsDragging] = useState(false);
  const {
    applyScannedValue,
    brands,
    categories,
    copyJson,
    downloadJson,
    error,
    form,
    jsonText,
    scannerLabel,
    scannedCode,
    setScannedCode,
    startCamera,
    status,
    stopCamera,
    updateForm,
    videoRef,
    apiKey,
    saveApiKey,
    isAnalyzing,
    isTranslating,
    translateFormToLanguage,
    analyzeImage,
    captureAndAnalyze,
    isNativeSupported,
    internetImageUrl,
    isFetchingInternetImage,
    internetProductInfo,
    downloadProductImage,
  } = useBarcodeProductScannerLogic();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          analyzeImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Button variant="ghost" size="sm" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              {t('header.back')}
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-black tracking-tight truncate">{t('header.title')}</h1>
              <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{scannerLabel}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isTranslating && (
              <span className="flex items-center gap-1.5 text-xs text-indigo-500 font-semibold animate-pulse mr-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Translating...</span>
              </span>
            )}
            <select
              value={i18n.language}
              disabled={isTranslating}
              onChange={async (e) => {
                const targetLang = e.target.value;
                await i18n.changeLanguage(targetLang);
                translateFormToLanguage(targetLang, form);
              }}
              className="px-2 py-1.5 text-xs font-bold rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>
            <Button
              variant={status === 'scanning' || status === 'starting' ? 'danger' : 'primary'}
              size="sm"
              onClick={status === 'scanning' || status === 'starting' ? stopCamera : startCamera}
              leftIcon={status === 'starting' ? <Loader2 className="w-4 h-4 animate-spin" /> : status === 'scanning' ? <Square className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
            >
              {status === 'scanning' || status === 'starting' ? t('camera.stop_button') : t('camera.scan_button')}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Gemini API Key Configuration Panel */}
        <Card className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-100/50 dark:border-indigo-900/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold">{t('api_key.title')}</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">{t('api_key.description')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => saveApiKey(e.target.value)}
                placeholder={t('api_key.placeholder')}
                className="w-full sm:w-64 px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-5">
          <section className="space-y-5">
            <Card padding="none" className="overflow-hidden relative">
              <div
                className="relative aspect-[4/3] bg-slate-950 flex items-center justify-center"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {isDragging && (
                  <div className="absolute inset-0 bg-indigo-600/35 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-3 text-white border-4 border-dashed border-indigo-400 m-2 rounded-2xl animate-pulse">
                    <Upload className="w-12 h-12 text-indigo-200" />
                    <span className="text-sm font-black tracking-widest uppercase">{t('camera.drag_drop')}</span>
                  </div>
                )}
                <video ref={videoRef} muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                {status !== 'scanning' && status !== 'starting' && (
                  <div className="relative z-10 flex flex-col items-center gap-3 text-slate-400">
                    <ScanLine className="w-14 h-14" />
                    <span className="text-xs font-black uppercase tracking-widest">{t('camera.idle')}</span>
                  </div>
                )}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-950/80 z-30 flex flex-col items-center justify-center gap-3 text-white">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
                    <span className="text-xs font-bold tracking-widest uppercase">{t('camera.analyzing')}</span>
                  </div>
                )}
                <div className="absolute inset-x-8 top-1/2 h-px bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
                <div className="absolute inset-6 border-2 border-white/60 rounded-2xl pointer-events-none" />
              </div>

              {/* Camera Actions & Image Upload */}
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={status !== 'scanning' || isAnalyzing}
                    onClick={captureAndAnalyze}
                    className="flex-1 sm:flex-none"
                    leftIcon={<Sparkles className="w-4 h-4" />}
                  >
                    {t('camera.snap_analyze')}
                  </Button>
                </div>

                <div className="w-full sm:w-auto">
                  <label className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl cursor-pointer text-xs font-bold text-gray-500 dark:text-slate-400 transition-colors w-full">
                    <Upload className="w-4 h-4" />
                    {t('camera.upload_photo')}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              analyzeImage(reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </Card>

            <Card className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">{t('manual_entry.barcode_label')}</label>
                <div className="flex gap-2">
                  <input
                    value={scannedCode}
                    onChange={(event) => setScannedCode(event.target.value)}
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono text-sm"
                    placeholder={t('manual_entry.placeholder')}
                  />
                  <Button variant="secondary" onClick={() => applyScannedValue(scannedCode)} leftIcon={<ScanLine className="w-4 h-4" />}>
                    {t('manual_entry.apply')}
                  </Button>
                </div>
              </div>

              {isFetchingInternetImage && (
                <div className="flex items-center gap-2 py-3 justify-center text-xs font-bold text-gray-500 dark:text-slate-400">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  <span>{t('lookup.searching')}</span>
                </div>
              )}

              {internetImageUrl && (
                <div className="border border-gray-100 dark:border-slate-800 rounded-xl p-4 bg-gray-50/50 dark:bg-slate-900/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {t('lookup.found')}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={downloadProductImage}
                      leftIcon={<Download className="w-3.5 h-3.5" />}
                    >
                      {t('lookup.download_image')}
                    </Button>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-800 bg-white flex items-center justify-center shrink-0">
                      <img src={internetImageUrl} alt="Internet Product Lookup" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate text-gray-900 dark:text-white">
                        {internetProductInfo?.name || t('lookup.unknown')}
                      </p>
                      <p className="text-[10px] font-semibold text-gray-500 dark:text-slate-400">
                        {t('lookup.brand_label')}: {internetProductInfo?.brand || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!isNativeSupported && (
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-xl p-3">
                  {t('camera.unsupported_warning')}
                </p>
              )}
              {error && (
                <p className="text-sm font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 rounded-xl p-3">
                  {error}
                </p>
              )}
            </Card>
          </section>

          <section className="space-y-5">
            <Card className="space-y-4">
              <div className="flex items-center gap-2">
                <PackagePlus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-base font-black">{t('sections.initial_data')}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label={t('fields.name')} value={form.name} onChange={(value) => updateForm('name', value)} required />
                <Field label={t('fields.sku')} value={form.sku} onChange={(value) => updateForm('sku', value)} />
                <SelectField label={t('fields.category')} value={form.category} onChange={(value) => updateForm('category', value)} required>
                  <option value="">{t('fields.select_category')}</option>
                  {form.category && !categories.some(c => (c.path || c.name) === form.category) && (
                    <option value={form.category}>{form.category}</option>
                  )}
                  {categories.map(category => {
                    const val = category.path || category.name;
                    return (
                      <option key={category.id} value={val}>{val}</option>
                    );
                  })}
                </SelectField>
                <SelectField label={t('fields.brand')} value={form.brand} onChange={(value) => updateForm('brand', value)}>
                  <option value="">{t('fields.select_brand')}</option>
                  {form.brand && !brands.some(b => b.name === form.brand) && (
                    <option value={form.brand}>{form.brand}</option>
                  )}
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.name}>{brand.name}</option>
                  ))}
                </SelectField>
                <Field label={t('fields.color')} value={form.color} onChange={(value) => updateForm('color', value)} />
                <Field label={t('fields.size')} value={form.size} onChange={(value) => updateForm('size', value)} />
                <Field label={t('fields.material')} value={form.material} onChange={(value) => updateForm('material', value)} />
                <Field label={t('fields.weight')} value={form.weight} onChange={(value) => updateForm('weight', value)} />
                <Field label={t('fields.length')} type="number" value={form.dimensionLength} onChange={(value) => updateForm('dimensionLength', value)} />
                <Field label={t('fields.width')} type="number" value={form.dimensionWidth} onChange={(value) => updateForm('dimensionWidth', value)} />
                <Field label={t('fields.height')} type="number" value={form.dimensionHeight} onChange={(value) => updateForm('dimensionHeight', value)} />
                <Field label={t('fields.dimension_unit')} value={form.dimensionUnit} onChange={(value) => updateForm('dimensionUnit', value)} />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">{t('fields.description')} *</label>
                <textarea
                  value={form.description}
                  onChange={(event) => updateForm('description', event.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm resize-none"
                />
              </div>

              <div className="border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{t('sections.nutritional')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label={t('fields.calories')} type="number" value={form.calories} onChange={(value) => updateForm('calories', value)} />
                  <Field label={t('fields.total_fat')} value={form.totalFat} onChange={(value) => updateForm('totalFat', value)} />
                  <Field label={t('fields.saturated_fat')} value={form.saturatedFat} onChange={(value) => updateForm('saturatedFat', value)} />
                  <Field label={t('fields.carbohydrates')} value={form.carbohydrates} onChange={(value) => updateForm('carbohydrates', value)} />
                  <Field label={t('fields.sugars')} value={form.sugars} onChange={(value) => updateForm('sugars', value)} />
                  <Field label={t('fields.protein')} value={form.protein} onChange={(value) => updateForm('protein', value)} />
                  <Field label={t('fields.sodium')} value={form.sodium} onChange={(value) => updateForm('sodium', value)} />
                  <Field label={t('fields.ingredients')} value={form.ingredients} onChange={(value) => updateForm('ingredients', value)} />
                  <Field label={t('fields.allergens')} value={form.allergens} onChange={(value) => updateForm('allergens', value)} />
                  <Field label={t('fields.main_ingredients')} value={form.mainIngredients} onChange={(value) => updateForm('mainIngredients', value)} />
                  <Field label={t('fields.certifications')} value={form.certifications} onChange={(value) => updateForm('certifications', value)} />
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{t('sections.sustainability')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label={t('fields.life_span')} value={form.lifeSpan} onChange={(value) => updateForm('lifeSpan', value)} />
                  <Field label={t('fields.reliability')} value={form.reliability} onChange={(value) => updateForm('reliability', value)} />
                  <Field label={t('fields.reusability')} value={form.reusability} onChange={(value) => updateForm('reusability', value)} />
                  <Field label={t('fields.refurbishment')} value={form.refurbishment} onChange={(value) => updateForm('refurbishment', value)} />
                  <Field label={t('fields.recycled_content')} value={form.recycledContent} onChange={(value) => updateForm('recycledContent', value)} />
                  <Field label={t('fields.ease_of_repair')} value={form.easeOfRepair} onChange={(value) => updateForm('easeOfRepair', value)} />
                  <Field label={t('fields.spare_parts')} value={form.spareParts} onChange={(value) => updateForm('spareParts', value)} />
                  <Field label={t('fields.maintenance_manual')} value={form.maintenanceManual} onChange={(value) => updateForm('maintenanceManual', value)} />
                  <Field label={t('fields.origin')} value={form.origin} onChange={(value) => updateForm('origin', value)} />
                  <Field label={t('fields.material_composition')} value={form.materialComposition} onChange={(value) => updateForm('materialComposition', value)} />
                  <Field label={t('fields.substance_of_concern')} value={form.substanceOfConcern} onChange={(value) => updateForm('substanceOfConcern', value)} />
                  <Field label={t('fields.carbon_footprint')} value={form.carbonFootprint} onChange={(value) => updateForm('carbonFootprint', value)} />
                  <Field label={t('fields.environmental_footprint')} value={form.environmentalFootprint} onChange={(value) => updateForm('environmentalFootprint', value)} />
                  <Field label={t('fields.water_usage')} value={form.waterUsage} onChange={(value) => updateForm('waterUsage', value)} />
                </div>
              </div>
            </Card>

            <Card className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-black">{t('output.title')}</h2>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" disabled={!jsonText} onClick={copyJson} leftIcon={<Clipboard className="w-4 h-4" />}>
                    {t('output.copy')}
                  </Button>
                  <Button size="sm" disabled={!jsonText} onClick={downloadJson} leftIcon={<Download className="w-4 h-4" />}>
                    {t('output.download')}
                  </Button>
                </div>
              </div>
              <textarea
                readOnly
                value={jsonText || 'Complete the required fields to generate InitialProductData JSON.'}
                rows={16}
                className="w-full rounded-xl bg-slate-950 text-slate-100 p-4 font-mono text-xs leading-relaxed resize-y outline-none"
              />
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">
        {label}{required ? ' *' : ''}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  required = false,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">
        {label}{required ? ' *' : ''}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
      >
        {children}
      </select>
    </label>
  );
}
