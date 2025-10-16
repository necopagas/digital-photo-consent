// src/AdminView.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

// --- BAG-O NGA IMPORTS GIKAN SA FIREBASE ---
import { db } from './firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// ---------------------------------------------

export default function AdminView() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Kuhaon ang data gikan sa Firestore, i-order by pinakabag-o
        const q = query(collection(db, 'submissions'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);

        const subsList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            // I-convert ang Firestore timestamp to a readable date
            submittedAt: data.submittedAt ? data.submittedAt.toDate() : new Date()
          };
        });

        setSubmissions(subsList);
      } catch (error) {
        console.error("Error fetching submissions: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Admin Dashboard</h1>
            <Link to="/" className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-all">
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Form
            </Link>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <p className="text-center p-8 text-slate-500">Loading submissions...</p>
          ) : (
            <table className="min-w-full bg-white border border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-slate-600">Date Submitted</th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-slate-600">Name</th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-slate-600">Address</th>
                  <th className="py-3 px-4 border-b text-left text-sm font-semibold text-slate-600">Provider</th>
                  <th className="py-3 px-4 border-b text-center text-sm font-semibold text-slate-600">Links</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 border-b text-slate-700">{sub.submittedAt.toLocaleString()}</td>
                    <td className="py-3 px-4 border-b text-slate-700">{sub.name}</td>
                    <td className="py-3 px-4 border-b text-slate-700">{sub.address}</td>
                    <td className="py-3 px-4 border-b text-slate-700">{sub.provider}</td>
                    <td className="py-3 px-4 border-b text-center">
                      <a href={sub.photoUrl} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline mr-4">Photo</a>
                      <a href={sub.signatureUrl} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">Signature</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}