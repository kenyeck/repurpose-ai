import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
   return (
      <div className="min-h-screen bg-zinc-950 text-white">
         {/* Hero */}
         <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
            <div className="text-center">
               <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-3xl text-sm mb-6">
                  <span className="text-emerald-400">●</span>
                  Powered by Multi-Agent AI
               </div>

               <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-6">
                  One piece of content.
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                     Ten platforms.
                  </span>
               </h1>

               <p className="text-2xl text-zinc-400 max-w-2xl mx-auto mb-10">
                  Repurposer AI instantly transforms blogs, videos, podcasts, and LinkedIn posts
                  into perfectly optimized content for Twitter, LinkedIn, Instagram, YouTube,
                  newsletters, and more — all powered by a 3-agent AI crew.
               </p>

               <div className="flex items-center justify-center gap-4">
                  <a
                     href="/login"
                     className="bg-white text-zinc-900 hover:bg-white/90 px-10 py-4 rounded-2xl text-xl font-medium transition"
                  >
                     Start for Free
                  </a>
                  <Link
                     href="/how-it-works"
                     className="border border-zinc-700 hover:border-zinc-600 px-8 py-4 rounded-2xl text-xl transition inline-flex items-center gap-2"
                  >
                     See how it works
                     <ArrowRight className="w-5 h-5" />
                  </Link>
               </div>

               <p className="text-zinc-500 text-sm mt-6">
                  No credit card required • 30-day free trial
               </p>
            </div>
         </div>

         {/* What it does + Benefits */}
         <div className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800">
            <div className="grid md:grid-cols-3 gap-10">
               <div>
                  <h3 className="text-emerald-400 text-lg font-medium mb-3">What the site does</h3>
                  <p className="text-zinc-400">
                     Our multi-agent AI crew analyzes your content, extracts key messages and tone,
                     then intelligently repurposes it into native formats for every major platform —
                     complete with hooks, formatting, and posting suggestions.
                  </p>
               </div>

               <div>
                  <h3 className="text-emerald-400 text-lg font-medium mb-3">Who it’s for</h3>
                  <p className="text-zinc-400">
                     Solopreneurs, content creators, marketers, consultants, coaches, and small
                     teams who want to 10x their reach without spending hours repurposing content
                     manually.
                  </p>
               </div>

               <div>
                  <h3 className="text-emerald-400 text-lg font-medium mb-3">Key benefits</h3>
                  <ul className="space-y-3 text-zinc-400">
                     <li className="flex items-start gap-2">• Save 15–20 hours per week</li>
                     <li className="flex items-start gap-2">
                        • Consistent brand voice across all platforms
                     </li>
                     <li className="flex items-start gap-2">
                        • Higher engagement with platform-optimized formats
                     </li>
                     <li className="flex items-start gap-2">
                        • Professional results in under 45 seconds
                     </li>
                     <li className="flex items-start gap-2">
                        • Run your entire content engine on autopilot
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         {/* CTA Footer */}
         <div className="bg-zinc-900 py-12 text-center">
            <p className="text-xl text-zinc-400 mb-4">
               Ready to turn one piece of content into your entire marketing calendar?
            </p>
            <a
               href="/login"
               className="inline-block bg-emerald-600 hover:bg-emerald-500 px-12 py-5 rounded-3xl text-xl font-medium"
            >
               Get Started Free
            </a>
         </div>
      </div>
   );
}
