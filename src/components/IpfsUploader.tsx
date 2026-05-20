/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Copy, ExternalLink, FileUp, Image as ImageIcon, Loader2, UploadCloud, X } from 'lucide-react';
import { ipfsService, IpfsUploadResult } from '../services/ipfsService';

type UploadStatus = 'ready' | 'uploading' | 'uploaded' | 'error';

interface UploadItem {
    id: string;
    file: File;
    previewUrl?: string;
    status: UploadStatus;
    result?: IpfsUploadResult;
    error?: string;
}

export interface IpfsUploaderProps {
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    maxSizeMB?: number;
    metadata?: Record<string, unknown>;
    title?: string;
    isEnabled?: boolean;
    onUploaded?: (result: IpfsUploadResult, file: File) => void;
}

function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function createUploadItem(file: File): UploadItem {
    return {
        id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        status: 'ready',
    };
}

export function IpfsUploader({
    accept = 'image/*,application/octet-stream',
    multiple = true,
    maxFiles = 6,
    maxSizeMB = 25,
    metadata,
    title = 'IPFS Upload',
    isEnabled = true,
    onUploaded,
}: IpfsUploaderProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const previewUrlsRef = useRef<string[]>([]);
    const [items, setItems] = useState<UploadItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [copyTarget, setCopyTarget] = useState<string | null>(null);

    const readyCount = useMemo(() => items.filter(item => item.status === 'ready').length, [items]);
    const isUploading = items.some(item => item.status === 'uploading');

    useEffect(() => {
        previewUrlsRef.current = items
            .map(item => item.previewUrl)
            .filter((url): url is string => Boolean(url));
    }, [items]);

    useEffect(() => {
        return () => {
            previewUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
        };
    }, []);

    const addFiles = (fileList: FileList | File[]) => {
        const files = Array.from(fileList).slice(0, maxFiles);
        const maxBytes = maxSizeMB * 1024 * 1024;

        setItems(previous => {
            const openSlots = Math.max(0, maxFiles - previous.length);
            const nextFiles = files.slice(0, openSlots);
            const nextItems = nextFiles.map(file => {
                const item = createUploadItem(file);
                if (file.size > maxBytes) {
                    return {
                        ...item,
                        status: 'error' as const,
                        error: `File is larger than ${maxSizeMB} MB.`,
                    };
                }
                return item;
            });
            return [...previous, ...nextItems];
        });
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) addFiles(event.target.files);
        event.target.value = '';
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        addFiles(event.dataTransfer.files);
    };

    const removeItem = (id: string) => {
        setItems(previous => {
            const found = previous.find(item => item.id === id);
            if (found?.previewUrl) URL.revokeObjectURL(found.previewUrl);
            return previous.filter(item => item.id !== id);
        });
    };

    const uploadItem = async (item: UploadItem) => {
        setItems(previous => previous.map(current =>
            current.id === item.id ? { ...current, status: 'uploading', error: undefined } : current
        ));

        try {
            const result = await ipfsService.uploadFile(item.file, {
                fileName: item.file.name,
                metadata: {
                    fileName: item.file.name,
                    fileType: item.file.type || 'application/octet-stream',
                    ...metadata,
                },
                pinataOptions: { cidVersion: 1 },
            });

            setItems(previous => previous.map(current =>
                current.id === item.id ? { ...current, status: 'uploaded', result } : current
            ));
            onUploaded?.(result, item.file);


        } catch (error: any) {
            setItems(previous => previous.map(current =>
                current.id === item.id ? { ...current, status: 'error', error: error.message || 'Upload failed.' } : current
            ));
        }
    };

    const uploadReady = async () => {
        const queue = items.filter(item => item.status === 'ready');
        for (const item of queue) {
            await uploadItem(item);
        }
    };

    const copyText = async (value: string) => {
        await navigator.clipboard.writeText(value);
        setCopyTarget(value);
        window.setTimeout(() => setCopyTarget(null), 1000);
    };

    return (
        <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-colors">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-gray-50/50 dark:bg-slate-800/20 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 transition-colors">
                        <UploadCloud className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-sm font-black text-gray-900 dark:text-white truncate transition-colors">{title}</h3>
                        <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">{items.length}/{maxFiles} selected</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={uploadReady}
                    disabled={!isEnabled || readyCount === 0 || isUploading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all active:scale-95"
                >
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />}
                    Upload
                </button>
            </div>

            <div
                onDragOver={event => {
                    event.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`m-4 rounded-2xl border-2 border-dashed p-6 text-center transition-all ${isDragging 
                    ? 'border-indigo-400 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-800/30'
                }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="mx-auto w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all active:scale-95"
                    title="Choose files"
                >
                    <UploadCloud className="w-6 h-6" />
                </button>
                <p className="mt-3 text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors">Drop files or choose from disk</p>
                <p className="mt-1 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Images preview inline. Other blobs upload as files.</p>
            </div>

            {items.length > 0 && (
                <div className="px-4 pb-4 space-y-3">
                    {items.map(item => (
                        <div key={item.id} className="rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/40 p-3 transition-colors">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden flex items-center justify-center shrink-0 transition-colors">
                                    {item.previewUrl ? (
                                        <img src={item.previewUrl} alt={item.file.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="w-6 h-6 text-gray-300 dark:text-slate-600" />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate transition-colors">{item.file.name}</p>
                                            <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase transition-colors">{formatFileSize(item.file.size)}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="w-8 h-8 rounded-lg text-gray-400 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center shrink-0"
                                            title="Remove"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="mt-3">
                                        {item.status === 'uploading' && (
                                            <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 transition-colors">
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading
                                            </p>
                                        )}
                                        {item.status === 'uploaded' && item.result && (
                                            <div className="space-y-3">
                                                <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 transition-colors">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Uploaded
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => copyText(item.result!.cid)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-wider text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                                                    >
                                                        <Copy className="w-3.5 h-3.5" />
                                                        {copyTarget === item.result.cid ? 'Copied' : 'CID'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => copyText(item.result!.gatewayUrl)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-wider text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                                                    >
                                                        <Copy className="w-3.5 h-3.5" />
                                                        {copyTarget === item.result.gatewayUrl ? 'Copied' : 'URL'}
                                                    </button>
                                                    <a
                                                        href={item.result.gatewayUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-[10px] font-black uppercase tracking-wider text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                        Open
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                        {item.status === 'error' && (
                                            <p className="inline-flex items-start gap-2 text-[10px] font-black uppercase tracking-widest text-red-600 transition-colors">
                                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                                <span>{item.error}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
