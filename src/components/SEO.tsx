import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  schema?: object;
  children?: React.ReactNode;
}

export function SEO({ title, description, keywords, url, schema, children }: SEOProps) {
  const siteName = "QRGenius Tools";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {url && <link rel="canonical" href={url} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      {url && <meta property="twitter:url" content={url} />}
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": siteName,
          "url": url || window.location.origin,
          "description": description,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All"
        })}
      </script>
      {children}
    </Helmet>
  );
}
