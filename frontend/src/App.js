import React from 'react';
import Home from './pages/Home';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
            Task Manager
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Stay organized. Stay productive.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-xl rounded-xl p-6 border border-gray-100">
          <Home />
        </div>

      </div>
    </div>
  );
}
