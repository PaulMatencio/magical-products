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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-5">
        <section className="space-y-5">
          <Card padding="none" className="overflow-hidden">
            <div className="relative aspect-[4/3] bg-slate-950 flex items-center justify-center">
              <video ref={videoRef} muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              {status !== 'scanning' && status !== 'starting' && (
                <div className="relative z-10 flex flex-col items-center gap-3 text-slate-400">
                  <ScanLine className="w-14 h-14" />
                  <span className="text-xs font-black uppercase tracking-widest">Scanner idle</span>
                </div>
              )}
              <div className="absolute inset-x-8 top-1/2 h-px bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
              <div className="absolute inset-6 border-2 border-white/60 rounded-2xl pointer-events-none" />
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

            {status === 'unsupported' && (
              <p className="text-sm font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-xl p-3">
                Native barcode scanning is unavailable in this browser. Manual entry is active.
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
