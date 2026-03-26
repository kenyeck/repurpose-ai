'use client';
import { useState, SubmitEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Mail, Lock } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';

export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const router = useRouter();

   const handleEmailLogin = async (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      if (email.toLowerCase() === 'admin@test.com' && password === 'password') {
         const token = `demo-email-token-${Date.now()}`;
         localStorage.setItem('token', token);
         router.push('/dashboard');
      } else {
         setError('Invalid credentials. Try: admin@test.com / password');
      }

      setLoading(false);
   };

   const handleSocialLogin = (provider: string) => {
      setLoading(true);
      setError('');

      setTimeout(() => {
         const token = `demo-${provider}-token-${Date.now()}`;
         localStorage.setItem('token', token);
         router.push('/dashboard');
      }, 800);
   };

   return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
         <div className="w-full max-w-md">
            <div className="text-center mb-12">
               <div className="flex justify-center mb-6">
                  <div className="bg-linear-to-br from-emerald-500 to-teal-500 w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl">
                     <Zap className="w-11 h-11 text-white" />
                  </div>
               </div>
               <h1 className="text-4xl font-semibold tracking-tight mb-3">Welcome back</h1>
               <p className="text-zinc-400">Sign in to start repurposing your content with AI</p>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 shadow-2xl">
               {/* Email/Password Form */}
               <form
                  onSubmit={(fs) => {
                    console.log(`form submitted...`);
                     handleEmailLogin(fs);
                  }}
                  className="space-y-6"
               >
                  <div>
                     <label className="block text-sm text-zinc-400 mb-2 font-medium">
                        Email Address
                     </label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
                        <input
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="admin@test.com"
                           className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:border-emerald-500 outline-none transition"
                           required
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm text-zinc-400 mb-2 font-medium">
                        Password
                     </label>
                     <div className="relative">
                        <Lock className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
                        <input
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="••••••••"
                           className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:border-emerald-500 outline-none transition"
                           required
                        />
                     </div>
                  </div>

                  {error && (
                     <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm p-4 rounded-2xl">
                        {error}
                     </div>
                  )}

                  <button
                     type="submit"
                     disabled={loading}
                     className="w-full bg-white hover:bg-white/90 text-zinc-900 font-semibold py-4 rounded-2xl transition disabled:opacity-70 cursor-pointer"
                  >
                     {loading ? 'Signing in...' : 'Sign in with Email'}
                  </button>
               </form>

               <div className="relative my-10">
                  <div className="absolute inset-0 flex items-center">
                     <div className="w-full border-t border-zinc-700"></div>
                  </div>
                  <div className="relative flex justify-center">
                     <span className="bg-zinc-900 px-6 text-xs uppercase tracking-widest text-zinc-500">
                        or sign in with
                     </span>
                  </div>
               </div>

               {/* Social Buttons using react-icons */}
               <div className="space-y-4">
                  <button
                     onClick={() => handleSocialLogin('google')}
                     disabled={loading}
                     className="w-full flex items-center justify-center gap-4 bg-white hover:bg-white/90 text-zinc-900 border border-zinc-300 py-4 rounded-2xl font-medium transition disabled:opacity-70 cursor-pointer"
                  >
                     <FcGoogle className="w-5 h-5" />
                     Continue with Google
                  </button>

                  <button
                     onClick={() => handleSocialLogin('facebook')}
                     disabled={loading}
                     className="w-full flex items-center justify-center gap-4 bg-[#1877F2] hover:bg-[#166fe0] text-white py-4 rounded-2xl font-medium transition disabled:opacity-70 cursor-pointer"
                  >
                     <FaFacebook className="w-5 h-5" />
                     Continue with Facebook
                  </button>

                  <button
                     onClick={() => handleSocialLogin('github')}
                     disabled={loading}
                     className="w-full flex items-center justify-center gap-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 py-4 rounded-2xl font-medium transition disabled:opacity-70 cursor-pointer"
                  >
                     <FaGithub className="w-5 h-5" />
                     Continue with GitHub
                  </button>
               </div>
            </div>

            <div className="mt-8 text-center">
               <p className="text-zinc-500 text-sm">
                  Demo: <span className="font-mono text-emerald-400">admin@test.com</span> /{' '}
                  <span className="font-mono text-emerald-400">password</span>
               </p>
            </div>
         </div>
      </div>
   );
}
