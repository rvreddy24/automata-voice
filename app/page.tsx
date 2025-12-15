import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import AudioProof from '@/components/sections/AudioProof';
import ProblemSolution from '@/components/sections/ProblemSolution';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Audio Proof Section */}
        <AudioProof />

        {/* Problem/Solution Grid */}
        <ProblemSolution />

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)]">
          <div className="container-narrow text-center">
            {/* Background glow */}
            <div className="absolute inset-0 bg-glow opacity-50" />

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your phone experience?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              Try AutomataVoice free for 14 days. No credit card required.
              Setup takes less than 5 minutes.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo">
                <Button variant="primary" size="lg">
                  Try Live Demo
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Talk to Sales
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {[
                { value: '500+', label: 'Active Businesses' },
                { value: '1M+', label: 'Calls Handled' },
                { value: '98%', label: 'Customer Satisfaction' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold text-[var(--accent)]">{stat.value}</div>
                  <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
