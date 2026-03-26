import Link from 'next/link';
import { FileText, ArrowRight, Zap } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-5 py-2 rounded-3xl text-sm mb-6">
            <Zap className="w-4 h-4 text-emerald-400" />
            Multi-Agent AI System
          </div>
          <h1 className="text-6xl font-semibold tracking-tight mb-6">
            How Repurposer AI Works
          </h1>
          <p className="text-2xl text-zinc-400 max-w-2xl mx-auto">
            From one piece of content to a full multi-platform content strategy — powered by intelligent AI agents.
          </p>
        </div>

        {/* Step-by-Step Process */}
        <div className="space-y-24">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-emerald-400 text-sm font-medium tracking-widest mb-3">STEP 01</div>
              <h2 className="text-4xl font-semibold mb-6">Paste Your Content</h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Simply copy and paste any long-form content — blog posts, YouTube transcripts, 
                podcast episodes, LinkedIn drafts, meeting notes, or even raw ideas.
              </p>
              <div className="mt-8 flex items-center gap-4 text-sm text-zinc-500">
                <div className="bg-zinc-900 px-4 py-2 rounded-2xl">Blog Articles</div>
                <div className="bg-zinc-900 px-4 py-2 rounded-2xl">Video Transcripts</div>
                <div className="bg-zinc-900 px-4 py-2 rounded-2xl">Podcast Summaries</div>
              </div>
            </div>
            <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800">
              <div className="h-96 bg-zinc-950 rounded-2xl flex items-center justify-center border border-dashed border-zinc-700">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-zinc-600" />
                  <p className="text-zinc-500">Your original content goes here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="md:order-2">
              <div className="text-emerald-400 text-sm font-medium tracking-widest mb-3">STEP 02</div>
              <h2 className="text-4xl font-semibold mb-6">Our 3-Agent AI Crew Takes Over</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-900/50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Content Analyzer Agent</h4>
                    <p className="text-zinc-400">Extracts core message, tone, key takeaways, and viral hooks</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-900/50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Platform Repurposer Agent</h4>
                    <p className="text-zinc-400">Transforms content into native formats for Twitter, LinkedIn, Instagram, YouTube Shorts, newsletters, and more</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-emerald-900/50 rounded-2xl flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Performance Optimizer Agent</h4>
                    <p className="text-zinc-400">Suggests best posting times, A/B variations, and engagement predictions</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:order-1 bg-zinc-900 rounded-3xl p-10">
              <div className="text-emerald-400 mb-6">🤖 Multi-Agent Collaboration</div>
              <p className="text-zinc-400 leading-relaxed">
                The agents work together sequentially with shared memory. This produces far more consistent and higher-quality results than single-prompt AI tools.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="text-emerald-400 text-sm font-medium tracking-widest mb-3">STEP 03</div>
            <h2 className="text-4xl font-semibold mb-6">Get Ready-to-Post Assets</h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-lg mb-12">
              In under a minute, you receive a complete set of professionally formatted content optimized for each platform.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                "Twitter / X Threads",
                "LinkedIn Posts + Carousels",
                "Instagram Captions + Stories",
                "YouTube Shorts Scripts",
                "Newsletter Segments",
                "TikTok / Threads Hooks"
              ].map((platform) => (
                <div key={platform} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
                  <div className="text-emerald-400 mb-3">📱</div>
                  <p className="font-medium">{platform}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-24 text-center bg-zinc-900 rounded-3xl py-16 px-8">
          <h3 className="text-3xl font-semibold mb-4">Ready to 10x your content output?</h3>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Join hundreds of solopreneurs and creators saving 15+ hours every week.
          </p>
          <Link 
            href="/login"
            className="inline-flex items-center gap-3 bg-white text-zinc-900 hover:bg-white/90 px-10 py-5 rounded-2xl text-xl font-medium transition"
          >
            Start Repurposing Free
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}