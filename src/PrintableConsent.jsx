// src/PrintableConsent.jsx
import React from 'react';

// Gigamit nato ang React.forwardRef para ma-access ni sa react-to-print
export const PrintableConsent = React.forwardRef((props, ref) => {
  const { name, address, provider, imgSrc, signatureSrc } = props;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div ref={ref} className="p-8 font-sans text-gray-800">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">PhilHealth Konsulta - Consent Form</h1>
        <p>Date: {currentDate}</p>
      </div>

      <div className="mb-6">
        <p className="mb-4 leading-relaxed">
          Pinaagi niini, ako, si <strong className="font-semibold underline">{name || "(Ngalan sa Pasyente)"}</strong>,
          nga nagpuyo sa <strong className="font-semibold underline">{address || "(Address sa Pasyente)"}</strong>,
          nagahatag sa akong pagtugot sa <strong className="font-semibold underline">{provider || "(Konsulta Provider)"}</strong>
          nga kolektahon, i-access, gamiton, i-proseso, ug i-store ang akong "personal and sensitive personal information" para sa mga musunod nga katuyoan:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>Pag-avail sa mga benepisyo sa PhilHealth Konsulta Package;</li>
          <li>Pag-refer kanako sa ubang mga health facilities kung gikinahanglan;</li>
          <li>Pag-gamit sa akong litrato ug pirma para sa katuyoan sa post-audit monitoring sa PhilHealth; ug</li>
          <li>Uban pang katuyoan nga subay sa Republic Act 10173 o ang Data Privacy Act of 2012.</li>
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-8 mt-10 border-t pt-6">
        <div className="text-center">
          <p className="font-semibold mb-2">Litrato sa Pasyente:</p>
          {imgSrc ? (
            <img src={imgSrc} alt="Beneficiary" className="w-40 h-40 object-cover border-2 border-gray-300 rounded-md mx-auto" />
          ) : (
            <div className="w-40 h-40 border-2 border-dashed rounded-md mx-auto flex items-center justify-center">
              <span className="text-sm text-gray-500">(Walay Litrato)</span>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="font-semibold mb-2">Pirma sa Pasyente:</p>
          {signatureSrc ? (
            <img src={signatureSrc} alt="Signature" className="w-48 h-24 object-contain border-b-2 border-gray-400 mx-auto" />
          ) : (
            <div className="w-48 h-24 border-b-2 border-gray-400 mx-auto flex items-center justify-center">
              <span className="text-sm text-gray-500">(Walay Pirma)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});