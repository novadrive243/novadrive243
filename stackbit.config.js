
export default {
  stackbitVersion: "~0.6.0",
  ssgName: "vite",
  buildCommand: "npm run build",
  publishDir: "dist",
  devCommand: "npm run dev",
  nodeVersion: "18",
  contentSources: [
    {
      name: "pages",
      label: "Pages",
      rootPath: "src/pages",
      extension: "tsx",
      previewUrlPrefix: "/"
    },
    {
      name: "components",
      label: "Components",
      rootPath: "src/components",
      extension: "tsx",
      previewUrlPrefix: "/components/"
    }
  ],
  contentModels: [
    {
      name: "page",
      label: "Page",
      urlPath: "/{slug}",
      filePath: "src/pages/{slug}.tsx",
      fieldGroups: [
        {
          name: "general",
          label: "General",
          fields: ["title", "description"]
        },
        {
          name: "seo",
          label: "SEO",
          fields: ["metaTitle", "metaDescription"]
        }
      ],
      fields: [
        { name: "title", type: "string", label: "Title", required: true },
        { name: "description", type: "text", label: "Description" },
        { name: "metaTitle", type: "string", label: "Meta Title" },
        { name: "metaDescription", type: "text", label: "Meta Description" }
      ]
    }
  ],
  assets: {
    referenceType: "static",
    staticDir: "public",
    uploadDir: "lovable-uploads",
    publicPath: "/"
  },
  // Adding Netlify-specific configuration
  deployment: {
    provider: "netlify",
    siteId: "your-netlify-site-id", // This should be replaced with the actual Netlify site ID
    buildHook: "" // Optional: Add a build hook URL if you have one configured
  }
}
