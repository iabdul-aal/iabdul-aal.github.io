/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export so the app can be deployed to GitHub Pages
  output: "export",

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Required for static exports when using the Next.js Image component
    unoptimized: true,
  },
}

export default nextConfig
