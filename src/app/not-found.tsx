import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-main py-16">
      <div className="max-w-lg mx-auto text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-primary/20 dark:text-primary/10">
            404
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-primary w-full sm:w-auto"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-outline w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/categoria/news"
              className="text-sm text-primary hover:text-blue-600 transition-colors"
            >
              News
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/categoria/tutorials"
              className="text-sm text-primary hover:text-blue-600 transition-colors"
            >
              Tutorials
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/categoria/reviews"
              className="text-sm text-primary hover:text-blue-600 transition-colors"
            >
              Reviews
            </Link>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <Link
              href="/about"
              className="text-sm text-primary hover:text-blue-600 transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
