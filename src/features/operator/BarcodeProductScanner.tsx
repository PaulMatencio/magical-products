import { ReactNode } from 'react';
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
import { useBarcodeProductScannerLogic } from '../../presentation/hooks/useBarcodeProductScannerLogic';

interface BarcodeProductScannerProps {
  onBack: () => void;
}

export function BarcodeProductScanner({ onBack }: BarcodeProductScannerProps) {
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
    analyzeImage,
    captureAndAnalyze,
    isNativeSupported,
  } = useBarcodeProductScannerLogic();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Button variant="ghost" size="sm" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-black tracking-tight truncate">Barcode Initial JSON</h1>
              <p className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">{scannerLabel}</p>
            </div>
          </div>
          <Button
            variant={status === 'scanning' || status === 'starting' ? 'danger' : 'primary'}
            size="sm"
            onClick={status === 'scanning' || status === 'starting' ? stopCamera : startCamera}
            leftIcon={status === 'starting' ? <Loader2 className="w-4 h-4 animate-spin" /> : status === 'scanning' ? <Square className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          >
            {status === 'scanning' || status === 'starting' ? 'Stop' : 'Scan'}
          </Button>
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
                <h3 className="text-sm font-bold">Multimodal AI Scanner Enabled</h3>
                <p className="text-xs text-gray-500 dark:text-slate-400">Scan barcodes/QR or upload package photos to auto-extract details using Gemini 2.5 Flash.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => saveApiKey(e.target.value)}
                placeholder="Enter Gemini API Key..."
                className="w-full sm:w-64 px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-5">
          <section className="space-y-5">
            <Card padding="none" className="overflow-hidden relative">
              <div className="relative aspect-[4/3] bg-slate-950 flex items-center justify-center">
                <video ref={videoRef} muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                {status !== 'scanning' && status !== 'starting' && (
                  <div className="relative z-10 flex flex-col items-center gap-3 text-slate-400">
                    <ScanLine className="w-14 h-14" />
                    <span className="text-xs font-black uppercase tracking-widest">Scanner idle</span>
                  </div>
                )}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-slate-950/80 z-30 flex flex-col items-center justify-center gap-3 text-white">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
                    <span className="text-xs font-bold tracking-widest uppercase">Gemini Analyzing...</span>
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
                    Snap & Analyze
                  </Button>
                </div>

                <div className="w-full sm:w-auto">
                  <label className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl cursor-pointer text-xs font-bold text-gray-500 dark:text-slate-400 transition-colors w-full">
                    <Upload className="w-4 h-4" />
                    Upload Photo
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
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Barcode</label>
              <div className="flex gap-2">
                <input
                  value={scannedCode}
                  onChange={(event) => setScannedCode(event.target.value)}
                  className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 font-mono text-sm"
                  placeholder="EAN, UPC, Code 128, QR payload"
                />
                <Button variant="secondary" onClick={() => applyScannedValue(scannedCode)} leftIcon={<ScanLine className="w-4 h-4" />}>
                  Apply
                </Button>
              </div>
            </div>

            {!isNativeSupported && (
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-xl p-3">
                Note: Native browser barcode auto-detection is unsupported in this browser. You can still use the Camera to take package photos with the "Snap & Analyze" button, upload packaging photos directly, or enter details manually.
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
              <h2 className="text-base font-black">Initial Product Data</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Name" value={form.name} onChange={(value) => updateForm('name', value)} required />
              <Field label="SKU" value={form.sku} onChange={(value) => updateForm('sku', value)} />
              <Field label="Manufacturer" value={form.manufacturer} onChange={(value) => updateForm('manufacturer', value)} />
              <SelectField label="Category" value={form.category} onChange={(value) => updateForm('category', value)} required>
                {categories.map(category => (
                  <option key={category.id} value={category.path || category.title || category.name}>{category.path || category.title || category.name}</option>
                ))}
              </SelectField>
              <SelectField label="Brand" value={form.brand} onChange={(value) => updateForm('brand', value)}>
                <option value="">No brand</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.name}>{brand.name}</option>
                ))}
              </SelectField>
              <Field label="Color" value={form.color} onChange={(value) => updateForm('color', value)} />
              <Field label="Size" value={form.size} onChange={(value) => updateForm('size', value)} />
              <Field label="Material" value={form.material} onChange={(value) => updateForm('material', value)} />
              <Field label="Weight" value={form.weight} onChange={(value) => updateForm('weight', value)} />
              <Field label="Length" type="number" value={form.dimensionLength} onChange={(value) => updateForm('dimensionLength', value)} />
              <Field label="Width" type="number" value={form.dimensionWidth} onChange={(value) => updateForm('dimensionWidth', value)} />
              <Field label="Height" type="number" value={form.dimensionHeight} onChange={(value) => updateForm('dimensionHeight', value)} />
              <Field label="Dimension Unit" value={form.dimensionUnit} onChange={(value) => updateForm('dimensionUnit', value)} />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Description *</label>
              <textarea
                value={form.description}
                onChange={(event) => updateForm('description', event.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm resize-none"
              />
            </div>

            <div className="border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Nutritional Information (Food Products)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Calories" type="number" value={form.calories} onChange={(value) => updateForm('calories', value)} />
                <Field label="Total Fat" value={form.totalFat} onChange={(value) => updateForm('totalFat', value)} />
                <Field label="Saturated Fat" value={form.saturatedFat} onChange={(value) => updateForm('saturatedFat', value)} />
                <Field label="Carbohydrates" value={form.carbohydrates} onChange={(value) => updateForm('carbohydrates', value)} />
                <Field label="Sugars" value={form.sugars} onChange={(value) => updateForm('sugars', value)} />
                <Field label="Protein" value={form.protein} onChange={(value) => updateForm('protein', value)} />
                <Field label="Sodium" value={form.sodium} onChange={(value) => updateForm('sodium', value)} />
                <Field label="Ingredients (comma-separated)" value={form.ingredients} onChange={(value) => updateForm('ingredients', value)} />
                <Field label="Allergens (comma-separated)" value={form.allergens} onChange={(value) => updateForm('allergens', value)} />
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-slate-800 pt-4 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Sustainability & Lifecycle</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Life Span" value={form.lifeSpan} onChange={(value) => updateForm('lifeSpan', value)} />
              <Field label="Reliability" value={form.reliability} onChange={(value) => updateForm('reliability', value)} />
              <Field label="Reusability" value={form.reusability} onChange={(value) => updateForm('reusability', value)} />
              <Field label="Refurbishment" value={form.refurbishment} onChange={(value) => updateForm('refurbishment', value)} />
              <Field label="Recycled Content" value={form.recycledContent} onChange={(value) => updateForm('recycledContent', value)} />
              <Field label="Ease of Repair" value={form.easeOfRepair} onChange={(value) => updateForm('easeOfRepair', value)} />
              <Field label="Spare Parts" value={form.spareParts} onChange={(value) => updateForm('spareParts', value)} />
              <Field label="Maintenance Manual" value={form.maintenanceManual} onChange={(value) => updateForm('maintenanceManual', value)} />
              <Field label="Origin" value={form.origin} onChange={(value) => updateForm('origin', value)} />
              <Field label="Material Composition" value={form.materialComposition} onChange={(value) => updateForm('materialComposition', value)} />
              <Field label="Substance of Concern" value={form.substanceOfConcern} onChange={(value) => updateForm('substanceOfConcern', value)} />
              <Field label="Carbon Footprint" value={form.carbonFootprint} onChange={(value) => updateForm('carbonFootprint', value)} />
              <Field label="Environmental Footprint" value={form.environmentalFootprint} onChange={(value) => updateForm('environmentalFootprint', value)} />
              <Field label="Water Usage" value={form.waterUsage} onChange={(value) => updateForm('waterUsage', value)} />
            </div>
          </div>
        </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-black">Generated JSON</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="secondary" disabled={!jsonText} onClick={copyJson} leftIcon={<Clipboard className="w-4 h-4" />}>
                  Copy
                </Button>
                <Button size="sm" disabled={!jsonText} onClick={downloadJson} leftIcon={<Download className="w-4 h-4" />}>
                  JSON
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
