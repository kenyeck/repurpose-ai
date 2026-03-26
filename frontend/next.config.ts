import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   /* config options here */

   // Added CORS headers to allow remote (same network) requests from the frontend to the backend during development
   allowedDevOrigins: ['192.168.0.200'],
   async headers() {
      return [
         {
            source: '/(.*)',
            headers: [
               {
                  key: 'Access-Control-Allow-Origin',
                  value: '*',
               },
               {
                  key: 'Access-Control-Allow-Credentials',
                  value: 'true',
               },
               {
                  key: 'Access-Control-Allow-Methods',
                  value: 'GET,POST,PUT,DELETE,OPTIONS',
               },
               {
                  key: 'Access-Control-Allow-Headers',
                  value: 'Content-Type, Authorization, Upgrade',
               },
            ],
         },
      ];
   },
};

export default nextConfig;
