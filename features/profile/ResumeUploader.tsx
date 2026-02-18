import React, { useState, useCallback } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { parseResumePdf, ParsedResume } from '../../services/api/resumeParserService';

interface ResumeUploaderProps {
    onParseComplete: (data: ParsedResume) => void;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onParseComplete }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successFile, setSuccessFile] = useState<string | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const processFile = async (file: File) => {
        if (file.type !== 'application/pdf') {
            setError("Only PDF files are supported.");
            return;
        }

        setIsParsing(true);
        setError(null);

        try {
            const data = await parseResumePdf(file);
            setSuccessFile(file.name);
            onParseComplete(data);
        } catch (err: any) {
            console.error("Parsing failed", err);
            setError(err.message || "Failed to parse resume.");
        } finally {
            setIsParsing(false);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const resetState = () => {
        setSuccessFile(null);
        setError(null);
    };

    if (isParsing) {
        return (
            <div className="w-full border-2 border-dashed border-blue-400 bg-blue-50 dark:bg-blue-900/10 rounded-xl p-8 flex flex-col items-center justify-center text-center animate-pulse">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-3" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">AI is reading your resume...</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Extracting experience, skills, and details.</p>
            </div>
        );
    }

    if (successFile) {
        return (
            <div className="w-full border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/10 dark:border-emerald-800 rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                        <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Resume Processed!</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Successfully extracted data from {successFile}</p>
                    </div>
                </div>
                <button
                    onClick={resetState}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            {error && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <div
                className={`
                    relative w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer group
                    ${isDragging
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-[#252525]'
                    }
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept=".pdf"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileSelect}
                />

                <div className="mb-4 p-4 bg-slate-100 dark:bg-[#2a2a2a] rounded-full group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud className="h-8 w-8 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                    Upload your Resume
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    Drag & drop your PDF here or click to browse.
                    <span className="block mt-1 text-xs text-blue-600 dark:text-blue-400 font-medium">
                        ✨ Powered by Affinda AI
                    </span>
                </p>
            </div>
        </div>
    );
};
