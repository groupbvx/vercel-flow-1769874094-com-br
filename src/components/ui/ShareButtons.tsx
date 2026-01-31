'use client';

import { useState } from 'react';
import { Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { cn, isBrowser } from '@/lib/utils';
import { AnalyticsService } from '@/services/AnalyticsService';

interface ShareButtonsProps {
  url: string;
  title: string;
  articleId?: string;
  className?: string;
}

export function ShareButtons({ url, title, articleId, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };

  const handleShare = (platform: string) => {
    if (articleId) {
      AnalyticsService.captureArticleShare(articleId, title, platform);
    }
    
    if (isBrowser()) {
      window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = async () => {
    if (!isBrowser()) return;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      
      if (articleId) {
        AnalyticsService.captureArticleShare(articleId, title, 'copy_link');
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2 hidden sm:inline">
        Share:
      </span>

      <button
        onClick={() => handleShare('twitter')}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-[#1DA1F2] hover:text-white transition-all"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>

      <button
        onClick={() => handleShare('facebook')}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </button>

      <button
        onClick={() => handleShare('linkedin')}
        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-all"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>

      <button
        onClick={handleCopyLink}
        className={cn(
          'w-9 h-9 flex items-center justify-center rounded-full transition-all',
          copied
            ? 'bg-green-500 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
        )}
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4" />
        ) : (
          <LinkIcon className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
