// src/components/ThreeStepModal.jsx
import React, { useState } from 'react';

export default function StepForm({ show, onClose }) {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSave = () => {
        alert("Data berhasil disimpan!");
        onClose();
        setStep(1); // Reset step
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative text-slate-950">
                <h2 className="text-xl font-bold mb-4">Langkah {step}</h2>

                {step === 1 &&
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col'>
                            <label>Mempelai Pria</label>
                            <input type="text" className='input border-black bg-white w-full' name='nama_pria' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Mempelai Wanita</label>
                            <input type="text" className='input border-black bg-white w-full' name="nama_wanita" id="" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Deskripsi</label>
                            <textarea type="text" className='textarea border-black bg-white w-full' name="deskripsi" id="" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">url</label>
                            
                            <div className="flex flex-row border rounded-lg">
                                <span className="link p-2 text-gray-500">https://undangan-online/</span>
                                <input type="text" className='input border-black bg-white h-inherit'  />
                            </div>
                        </div>
                    </div>}
                {step === 2 && 
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col'>
                            <label>Tanggal</label>
                            <input type="text" className='input border-black bg-white w-full' name='nama_pria' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Jam</label>
                            <input type="text" className='input border-black bg-white w-full' name="nama_wanita" id="" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Alamat</label>
                            <textarea type="text" className='textarea border-black bg-white w-full' name="deskripsi" id="" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Koordinat maps</label>
                            <textarea type="text" className='textarea border-black bg-white w-full' name="deskripsi" id="" />
                        </div>
                    </div>}
                {step === 3 && <div>✅ Konfirmasi dan Simpan Data</div>}

                <div className="flex justify-between mt-6">
                    <button
                        onClick={prevStep}
                        disabled={step === 1}
                        className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                    >
                        Kembali
                    </button>

                    {step < 3 ? (
                        <button
                            onClick={nextStep}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Lanjut
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Simpan
                        </button>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                >
                    ×
                </button>
            </div>
        </div>
    );
}
