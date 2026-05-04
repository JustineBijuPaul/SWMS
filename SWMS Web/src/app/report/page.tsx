'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Camera, CheckCircle, X, ImageIcon } from 'lucide-react';

export default function ReportIssue() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [locationText, setLocationText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocationText(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
      }, () => {
        alert("Unable to retrieve your location.");
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Upload image first if one was selected
      let image_url: string | null = null;
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadData = await uploadRes.json();
        image_url = uploadData.url;
      }

      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, description, locationText, image_url })
      });
      
      if (!res.ok) {
        if (res.status === 401) throw new Error('Please log in first.');
        throw new Error('Failed to submit');
      }

      setIsSuccess(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to report issue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950">
        <div className="glass-card max-w-md w-full p-8 rounded-2xl text-center animate-slide-up">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Issue Reported!</h2>
          <p className="text-slate-400 mb-8">
            Thank you for helping keep the city clean. Your report has been logged and assigned to the nearest worker.
          </p>
          <Link href="/citizen" className="px-6 py-3 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors w-full inline-block">
            Go to My Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <div className="glass-card p-8 rounded-3xl border border-white/5">
          <h1 className="text-3xl font-bold text-white mb-2">Report an Issue</h1>
          <p className="text-slate-400 mb-8">Provide details about the waste issue so we can resolve it quickly.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
              <select required value={category} onChange={e=>setCategory(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                <option value="">Select a category</option>
                <option value="WET">Wet Waste</option>
                <option value="DRY">Dry Waste</option>
                <option value="SANITARY">Sanitary Waste</option>
                <option value="HAZARDOUS">Hazardous Waste</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
              <div className="flex gap-2">
                <input required value={locationText} onChange={e=>setLocationText(e.target.value)} type="text" placeholder="Enter address or landmark" className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="button" onClick={getLocation} className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors flex items-center justify-center border border-white/5">
                  <MapPin className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea required value={description} onChange={e=>setDescription(e.target.value)} rows={4} placeholder="Describe the issue in detail..." className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Photo Evidence</label>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              {previewUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
                  <button type="button" onClick={removeFile} className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full hover:bg-black/80 transition-colors">
                    <X className="w-4 h-4 text-white" />
                  </button>
                  <div className="absolute bottom-2 left-2 flex items-center gap-2 px-3 py-1 bg-black/60 rounded-full">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs text-white">{selectedFile?.name}</span>
                  </div>
                </div>
              ) : (
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group bg-slate-900/30">
                  <Camera className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 mx-auto mb-3 transition-colors" />
                  <p className="text-sm text-slate-400">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-bold text-lg shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
