import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Users, Target, Zap, Award } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: `About - ${SITE_CONFIG.name}`,
  description: `Learn more about ${SITE_CONFIG.name} - Your trusted source for technology news, reviews, and tutorials.`,
};

const values = [
  {
    icon: Target,
    title: 'Accuracy',
    description: 'We prioritize factual, well-researched content that you can trust.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Staying ahead of the curve to bring you the latest in technology.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a community of tech enthusiasts and professionals.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to delivering high-quality content that adds value.',
  },
];

export default function AboutPage() {
  return (
    <div className="container-main py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li className="text-gray-900 dark:text-white">About</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          About {SITE_CONFIG.name}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {SITE_CONFIG.tagline}
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="card p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            At {SITE_CONFIG.name}, we&apos;re passionate about making technology accessible
            and understandable for everyone. Our mission is to deliver high-quality,
            accurate, and timely information about the ever-evolving world of technology.
            From breaking news to in-depth tutorials, we cover it all to keep you informed
            and empowered in the digital age.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div key={value.title} className="card p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Cover Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          What We Cover
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Technology News
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Stay updated with the latest happenings in the tech world, from product
              launches to industry trends.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Software Reviews
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              In-depth reviews of software, tools, and applications to help you make
              informed decisions.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Tutorials & Guides
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Step-by-step tutorials and comprehensive guides for developers and
              tech enthusiasts.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              AI & Machine Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Exploring the cutting edge of artificial intelligence and machine
              learning technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="card p-8 md:p-12 bg-gradient-to-r from-primary to-accent text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Join Our Community</h2>
        <p className="text-white/80 mb-6 max-w-xl mx-auto">
          Subscribe to our newsletter and be the first to know about new articles,
          tech trends, and exclusive content.
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterForm source="about-page" variant="dark" />
        </div>
      </section>
    </div>
  );
}
