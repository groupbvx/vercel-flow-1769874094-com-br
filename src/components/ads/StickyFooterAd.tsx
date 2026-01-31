'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AdSpot } from '@/components/AdSpot';
import { cn } from '@/lib/utils';

export function StickyFooterAd() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show ad after scrolling down
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    // Remember dismissal for this session
    sessionStorage.setItem('stickyAdDismissed', 'true');
  };

  useEffect(() => {
    // Check if already dismissed in this session
    if (sessionStorage.getItem('stickyAdDismissed') === 'true') {
      setIsDismissed(true);
    }
  }, []);

  if (!isVisible || isDismissed) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40',
        'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg',
        'transform transition-transform duration-300',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="container-main relative">
        <button
          onClick={handleDismiss}
          className="absolute right-2 top-1 z-10 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Dismiss ad"
        >
          <X className="w-4 h-4" />
        </button>
        <AdSpot position="sticky-bottom" className="min-h-[50px] max-h-[90px]" />
      </div>
    </div>
  );
}
