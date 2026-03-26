import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
   title: 'Repurposer AI',
   description: 'Turn one piece of content into 10+ platform-ready assets'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className="bg-zinc-950 text-white">{children}</body>
      </html>
   );
}
