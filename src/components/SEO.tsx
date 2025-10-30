import React from 'react';
import { Helmet } from '@vuer-ai/react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: string;
    keywords?: string;
    noindex?: boolean;
    structuredData?: object | object[];
}

const SEO: React.FC<SEOProps> = ({
                                     title,
                                     description,
                                     canonicalUrl,
                                     ogImage = 'https://blickfang-nagelstudio.at/og-image.jpg',
                                     ogType = 'website',
                                     keywords,
                                     noindex = false,
                                     structuredData
                                 }) => {
    const baseUrl = 'https://blickfang-nagelstudio.at';
    const fullCanonicalUrl = canonicalUrl || baseUrl;
    const fullTitle = title.includes('blickfang') ? title : `${title} | blickfang Nagelstudio`;

    return (
        <Helmet>
            {/* Grundlegende Meta-Tags */}
            <html lang="de" />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Canonical URL */}
            <link rel="canonical" href={fullCanonicalUrl} />

            {/* Robots */}
            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            )}
            <meta name="googlebot" content="index, follow" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullCanonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content="blickfang Nagelstudio" />
            <meta property="og:locale" content="de_AT" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* Weitere Meta-Tags */}
            <meta name="author" content="blickfang Nagelstudio" />
            <meta name="copyright" content="© 2025 blickfang Nagelstudio" />
            <meta httpEquiv="content-language" content="de-AT" />

            {/* Geo Tags für lokales SEO */}
            <meta name="geo.region" content="AT-6" />
            <meta name="geo.placename" content="St. Veit am Vogau" />
            <meta name="geo.position" content="46.7333;15.6167" />
            <meta name="ICBM" content="46.7333, 15.6167" />

            {/* Strukturierte Daten */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;