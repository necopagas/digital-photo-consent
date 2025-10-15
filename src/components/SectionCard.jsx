import React from 'react';

export default function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 text-center flex flex-col h-full">
      <h3 className="font-semibold text-slate-700 mb-2 flex items-center justify-center">
        {Icon && <Icon className="w-5 h-5 mr-2 text-teal-600" />}
        {title}
      </h3>
      {children}
    </div>
  );
}