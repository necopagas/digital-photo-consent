// src/ConsentForm.jsx
import React, { useState, useRef, useCallback } from 'react';
import Webcam from "react-webcam";
import SignatureCanvas from 'react-signature-canvas';
import toast from 'react-hot-toast';
import { CameraIcon, PencilIcon, UserCircleIcon, MapPinIcon, BuildingOffice2Icon } from '@heroicons/react/24/solid';

import ReactToPrint from 'react-to-print';
import { PrintableConsent } from './PrintableConsent';

import InputField from './components/InputField';
import PrimaryButton from './components/PrimaryButton';
import SectionCard from './components/SectionCard';

const konsultaProviders = [
  "Baganga Municipal Health Office",
  "Banaybanay Municipal Health Office",
  "Boston District Hospital",
  "Caraga Municipal Health Office",
  "Cateel District Hospital",
  "Davao Oriental Provincial Medical Center",
  "Manay District Hospital",
  "Mati City Health Office",
  "San Isidro Municipal Health Office",
  "Tarragona Municipal Health Office",
];

export default function ConsentForm() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [imgSrc, setImgSrc] = useState(null);
  const [provider, setProvider] = useState('');
  const [signatureSrc, setSignatureSrc] = useState('');

  const webcamRef = useRef(null);
  const sigPadRef = useRef(null);
  const componentToPrintRef = useRef();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    toast.success('Photo captured!');
  }, [webcamRef, setImgSrc]);

  const retake = () => setImgSrc(null);
  
  const clearSignature = () => {
    sigPadRef.current.clear();
    setSignatureSrc('');
  };

  const handleSignatureEnd = () => {
    setSignatureSrc(sigPadRef.current.toDataURL());
  };

  // Kining function kay i-check ang validation sa dili pa mag-print
  const handleBeforePrint = () => {
    if (!name || !address || !provider || !imgSrc || sigPadRef.current.isEmpty()) {
      toast.error("Please complete all fields before printing.");
      return false; // Kini ang mag-cancel sa print
    }
    return true;
  };

  // Kining function kay i-reset ang form human ug print
  const handleAfterPrint = () => {
    toast.success('Form ready to be saved or printed!');
    setName('');
    setAddress('');
    setProvider('');
    setImgSrc(null);
    clearSignature();
  };

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="print-source">
        <PrintableConsent
          ref={componentToPrintRef}
          name={name}
          address={address}
          provider={provider}
          imgSrc={imgSrc}
          signatureSrc={signatureSrc}
        />
      </div>

      <div className="max-w-6xl w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 md:gap-6 mb-4">
            <img src="/lgu_logo.jpg" alt="LGU Logo" className="h-14 md:h-16 w-auto" />
            <div className="text-center">
              <p className="font-semibold text-slate-700 text-base md:text-xl">Municipal Health Office</p>
              <p className="text-sm md:text-base text-slate-600">- Tarragona -</p>
            </div>
            <img src="/doh_logo.jpg" alt="DOH Logo" className="h-14 md:h-16 w-auto" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Digital Consent Portal</h1>
          <p className="text-slate-500 mt-1">PhilHealth Konsulta Program</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
            <InputField id="fullName" label="Beneficiary Full Name" value={name} onChange={(e) => setName(e.target.value)} required icon={UserCircleIcon} placeholder="Juan A. Dela Cruz" />
            <InputField id="address" label="Beneficiary Address" value={address} onChange={(e) => setAddress(e.target.value)} required icon={MapPinIcon} placeholder="123 Sampaguita, Mati City" />
            
            <div>
                <label htmlFor="provider" className="block text-sm font-medium text-slate-700 mb-1">Konsulta Provider</label>
                <div className="relative">
                <BuildingOffice2Icon className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1-2 left-3 text-slate-400" />
                <select
                    id="provider"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    required
                    className="pl-10 mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                >
                    <option value="" disabled>-- Select a provider --</option>
                    {konsultaProviders.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                </div>
            </div>
            
            <div className="bg-slate-50 border-l-4 border-teal-500 p-4 rounded-r-lg">
                <p className="text-sm text-slate-700 leading-relaxed">
                    Pinaagi sa pagpirma sa ubos, ako, si <strong className="font-semibold text-slate-800">{name || "(Imong Ngalan)"}</strong>, nagahatag sa akong pagtugot sa <strong className="font-semibold text-slate-800">{provider || "(Selected Provider)"}</strong> nga kolektahon, i-access, gamiton, i-proseso, ug i-store ang akong "personal and sensitive personal information"...
                </p>
            </div>

            <div className='pt-4 hidden lg:block'>
                <ReactToPrint
                    trigger={() => <PrimaryButton>Generate PDF / Print</PrimaryButton>}
                    content={() => componentToPrintRef.current}
                    onBeforePrint={handleBeforePrint}
                    onAfterPrint={handleAfterPrint}
                />
            </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
            <SectionCard title="1. Photo Capture" icon={CameraIcon}>
                <div className="flex-grow flex items-center justify-center bg-slate-200 rounded-md mt-2 w-full min-h-[160px]">
                    {imgSrc ? <img src={imgSrc} alt="Captured" className="rounded-md max-h-[160px] object-cover" /> : <Webcam height={160} width={213} ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-md"/>}
                </div>
                <div className="mt-4 w-full">
                    {imgSrc ? <button type="button" onClick={retake} className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all">Retake</button> : <button type="button" onClick={capture} className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-all">Capture</button>}
                </div>
            </SectionCard>
            <SectionCard title="2. Signature" icon={PencilIcon}>
                <div className="w-full h-[160px] bg-slate-100 rounded-md mt-2 cursor-crosshair">
                    <SignatureCanvas ref={sigPadRef} penColor='black' canvasProps={{ className: 'w-full h-full' }} onEnd={handleSignatureEnd} />
                </div>
                <div className="mt-4 w-full">
                    <button type="button" onClick={clearSignature} className="w-full bg-slate-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600 transition-all">Clear</button>
                </div>
            </SectionCard>
            </div>
            
            <div className='pt-4 lg:hidden'>
                <ReactToPrint
                    trigger={() => <PrimaryButton>Generate PDF / Print</PrimaryButton>}
                    content={() => componentToPrintRef.current}
                    onBeforePrint={handleBeforePrint}
                    onAfterPrint={handleAfterPrint}
                />
            </div>
        </div>
      </div>
    </div>
  );
}