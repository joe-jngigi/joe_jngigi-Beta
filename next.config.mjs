import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    domains: ['api.daily.dev']
}
  // Optionally, add any other Next.js config below
}
 
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    // providerImportSource: '@mdx-js/react',
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)
// module.exports = nextConfig