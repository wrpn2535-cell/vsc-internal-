import React, { useRef, useState, useEffect } from 'react';
import { Pen, RotateCcw, Check } from 'lucide-react';

interface SignaturePadProps {
  label: string;
  signeeName: string;
  signeeTitle: string;
  initialDataUrl?: string;
  onSave: (dataUrl: string, name: string) => void;
  disabled?: boolean;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  label,
  signeeName,
  signeeTitle,
  initialDataUrl,
  onSave,
  disabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(Boolean(initialDataUrl));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSignature, setCurrentSignature] = useState<string | undefined>(initialDataUrl);

  useEffect(() => {
    setCurrentSignature(initialDataUrl);
    setHasDrawn(Boolean(initialDataUrl));
  }, [initialDataUrl]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSaveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    setCurrentSignature(dataUrl);
    onSave(dataUrl, signeeName);
    setIsModalOpen(false);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50/50 dark:bg-slate-800/40 text-center">
      <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">{label}</div>

      <div className="h-20 flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900 mb-2 relative overflow-hidden">
        {currentSignature ? (
          <img src={currentSignature} alt="Signature" className="max-h-16 max-w-full object-contain" />
        ) : (
          <span className="text-xs text-slate-400 italic">ยังไม่ได้ลงนาม</span>
        )}
      </div>

      <div className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">{signeeName || '...........................................'}</div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">{signeeTitle}</div>

      {!disabled && (
        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
            setTimeout(() => {
              if (canvasRef.current && currentSignature) {
                const ctx = canvasRef.current.getContext('2d');
                const img = new Image();
                img.onload = () => ctx?.drawImage(img, 0, 0);
                img.src = currentSignature;
              }
            }, 100);
          }}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Pen className="w-3 h-3 text-slate-500" />
          {currentSignature ? 'แก้ไขลายเซ็น' : 'ลงลายมือชื่อดิจิทัล'}
        </button>
      )}

      {/* Signature Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl max-w-md w-full p-5 shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">ลงนามดิจิทัล: {label}</h4>
                <p className="text-xs text-slate-500">{signeeName} ({signeeTitle})</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="border border-slate-300 dark:border-slate-700 rounded-lg bg-white overflow-hidden mb-3">
              <canvas
                ref={canvasRef}
                width={380}
                height={160}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-40 touch-none cursor-crosshair bg-white"
              />
            </div>
            <p className="text-[11px] text-slate-500 text-center mb-4">ใช้เมาส์หรือนิ้วสัมผัสเพื่อเซ็นชื่อในกรอบ</p>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={clearCanvas}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                ล้างลายเซ็น
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  onClick={handleSaveSignature}
                  disabled={!hasDrawn}
                  className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 rounded disabled:opacity-50"
                >
                  <Check className="w-3.5 h-3.5" />
                  บันทึกลายเซ็น
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
