import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

export default function PrimaryButton({ type = 'button', onClick, disabled, isLoading, children, className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full flex items-center justify-center bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 ${className}`}
    >
      {isLoading && <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />}
      {isLoading ? 'Submitting...' : children}
    </button>
  );
}