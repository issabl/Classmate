// src/components/NotFound.tsx
import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-9xl font-black text-amber-700">404</h1>
        <p className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</p>
        <p className="text-lg text-gray-600 mt-3">The page you're looking for doesn't exist.</p>
        
        <div className="mt-10">
          <Link
            to="/"
            className="inline-block px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition"
          >
            Back to Home
          </Link>
        </div>

        <img src="/ClassMate.png" alt="ClassMate" className="h-16 mx-auto mt-16 opacity-70" />
      </div>
    </div>
  );
}