'use client';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FileText, Clock, Zap, ArrowRight, Loader2, Check, Copy } from 'lucide-react';

//TODO: move these interfaces to common library and share between front/backend.
interface RepurposeRequest {
   topic?: string;
   originalContent: string;
   platform?: string;
}

interface RepurposeResponseData {
   success: boolean;
   input: Record<string, string | number>;
   result: string;
   date: string;
}
interface RepurposeResponse {
   data: RepurposeResponseData;
}

type ContentResult = Omit<RepurposeResponseData, 'success'>;

const CONTENT_HISTORY_KEY = 'ContentHistory';

export default function Dashboard() {
   const [contentIn, setContentIn] = useState('');
   const [contentOut, setContentOut] = useState<ContentResult | null>(null);
   const [loading, setLoading] = useState(false);
   const [copied, setCopied] = useState(false);
   const [sectionCopied, setSectionCopied] = useState<string | null>(null);
   const router = useRouter();

   // const migrateStorage = () => {
   //    const storage = localStorage.getItem(CONTENT_HISTORY_KEY);
   //    const items: ContentResult[] = storage ? JSON.parse(storage) : [];
   //    localStorage.setItem(
   //       CONTENT_HISTORY_KEY,
   //       JSON.stringify(
   //          items.map((x) => {
   //             return { date: x.date, input: x.input, result: x.result };
   //          })
   //       )
   //    );
   // };

   useEffect(() => {
      if (!localStorage.getItem('token')) router.push('/login');
   }, []);

   const updateStorage = (content: ContentResult) => {
      console.log(`contentResult: ${JSON.stringify(content)}`);
      const storage = localStorage.getItem(CONTENT_HISTORY_KEY);
      const items: ContentResult[] = storage ? JSON.parse(storage) : [];
      items.push({ input: content.input, result: content.result, date: new Date().toUTCString() });
      console.log(`storage: ${JSON.stringify(storage)}, items: ${JSON.stringify(items)}`);
      localStorage.setItem(CONTENT_HISTORY_KEY, JSON.stringify(items));
   };

   const handleRepurpose = async () => {
      setLoading(true);
      //setContentIn('');
      setContentOut(null);
      try {
         const res = await axios.post<RepurposeRequest, RepurposeResponse>('/repurpose', {
            originalContent: contentIn
         });
         setContentOut(res.data);
         updateStorage(res.data);
      } catch (e) {
         console.log(`Error – ${e}`);
      } finally {
         setLoading(false);
      }
   };

   const copyAll = async () => {
      if (!contentOut) return;
      await navigator.clipboard.writeText(contentOut.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   // Smart section detection and copying
   const copySection = async (heading: string) => {
      if (!contentOut) return;

      // Split the markdown by headings (## or ###)
      const sections = contentOut.result.split(/(?=^#{2,3}\s)/gm);

      const section = sections.find(
         (s) => s.trim().startsWith(heading) || s.toLowerCase().includes(heading.toLowerCase())
      );

      if (section) {
         await navigator.clipboard.writeText(section.trim());
         setSectionCopied(heading);
      } else {
         // Fallback: copy the whole result if section not found
         await navigator.clipboard.writeText(contentOut.result);
         setSectionCopied(heading);
      }
   };
   return (
      <div className="min-h-screen bg-zinc-950 text-white p-8">
         <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h1 className="text-4xl font-semibold">Content Generator</h1>
                  <p className="text-zinc-400">
                     Turn one input into 10+ platform-ready assets using AI agents
                  </p>
               </div>
               <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Powered by 3 autonomous AI agents
               </div>
            </div>
            {/* Instructions Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-10">
               <div className="grid md:grid-cols-2 gap-8">
                  <div>
                     <h3 className="font-medium mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        How to Use
                     </h3>
                     <ul className="space-y-3 text-zinc-400 text-sm">
                        <li className="flex gap-3">
                           <span className="font-mono text-emerald-400">1.</span>
                           Paste your blog post, video transcript, podcast summary, LinkedIn draft,
                           or any long-form content
                        </li>
                        <li className="flex gap-3">
                           <span className="font-mono text-emerald-400">2.</span>
                           Click “Repurpose with AI Crew”
                        </li>
                        <li className="flex gap-3">
                           <span className="font-mono text-emerald-400">3.</span>
                           Receive beautifully formatted content for Twitter, LinkedIn, Instagram,
                           YouTube, newsletters & more
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="font-medium mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-emerald-400" />
                        What to Expect
                     </h3>
                     <div className="space-y-3 text-sm text-zinc-400">
                        <p>
                           <strong>Input:</strong> 100–5000+ words of any content type
                        </p>
                        <p>
                           <strong>Output:</strong> Structured markdown with analysis +
                           ready-to-post assets for multiple platforms
                        </p>
                        <p>
                           <strong>Processing time:</strong> Usually 20–45 seconds (longer content
                           may take up to 60 seconds)
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            {/* Main Input Area */}
            <div className="bg-zinc-900 rounded-3xl p-8 mb-8">
               <textarea
                  value={contentIn}
                  onChange={(e) => setContentIn(e.target.value)}
                  placeholder="Paste your content here (blog post, transcript, notes, LinkedIn draft, etc.)..."
                  className="w-full h-80 bg-zinc-950 border border-zinc-700 focus:border-emerald-400 rounded-2xl p-6 text-lg resize-y outline-none placeholder:text-zinc-500 font-light"
                  disabled={loading}
               />

               <button
                  onClick={handleRepurpose}
                  disabled={loading || !contentIn.trim()}
                  className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 hover:cursor-pointer disabled:bg-zinc-700 disabled:cursor-not-allowed transition-all text-white py-6 rounded-2xl text-xl font-medium flex items-center justify-center gap-3"
               >
                  {loading ? (
                     <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        AI Agents are generating your content... (20–45 seconds)
                     </>
                  ) : (
                     <>
                        Generate with AI Crew
                        <ArrowRight className="w-6 h-6" />
                     </>
                  )}
               </button>
            </div>
            {/* Results Section */}
            {contentOut && (
               <div className="bg-zinc-900 rounded-3xl p-10">
                  <div className="flex items-center justify-between mb-8">
                     <h2 className="text-3xl font-medium flex items-center gap-3">
                        ✨ Your Repurposed Content
                     </h2>

                     <button
                        onClick={copyAll}
                        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer px-6 py-3 rounded-2xl transition text-sm"
                     >
                        {copied ? (
                           <>
                              <Check className="w-4 h-4 text-emerald-400" /> Copied!
                           </>
                        ) : (
                           <>
                              <Copy className="w-4 h-4" /> Copy All
                           </>
                        )}
                     </button>
                  </div>

                  <div className="prose prose-invert prose-zinc max-w-none bg-zinc-950 border border-zinc-800 rounded-2xl p-10 overflow-auto">
                     <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                           h2: ({ children }) => {
                              const headingText = String(children);
                              return (
                                 <div className="group relative flex items-center justify-between mt-10 mb-4">
                                    <h2 className="text-2xl font-semibold">{children}</h2>
                                    <button
                                       onClick={() => copySection(headingText)}
                                       className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-xl"
                                    >
                                       {sectionCopied === headingText ? (
                                          <>✓ Copied</>
                                       ) : (
                                          <>📋 Copy Section</>
                                       )}
                                    </button>
                                 </div>
                              );
                           },
                           h3: ({ children }) => {
                              const headingText = String(children);
                              return (
                                 <div className="group relative flex items-center justify-between mt-8 mb-3">
                                    <h3 className="text-xl font-semibold">{children}</h3>
                                    <button
                                       onClick={() => copySection(headingText)}
                                       className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-xl"
                                    >
                                       {sectionCopied === headingText ? (
                                          <>✓ Copied</>
                                       ) : (
                                          <>📋 Copy Section</>
                                       )}
                                    </button>
                                 </div>
                              );
                           }
                        }}
                     >
                        {contentOut.result}
                     </ReactMarkdown>{' '}
                  </div>

                  <div className="mt-8 text-center text-xs text-zinc-500">
                     Tip: Click &quot;Copy Section&quot; on any heading to quickly grab that
                     platform’s content
                  </div>
               </div>
            )}{' '}
         </div>
      </div>
   );
}
