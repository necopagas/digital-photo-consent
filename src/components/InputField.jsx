import React from 'react';

export default function InputField({ id, label, value, onChange, placeholder, required, icon: Icon }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-slate-400" />}
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className="pl-10 mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}