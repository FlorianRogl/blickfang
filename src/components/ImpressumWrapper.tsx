// ImpressumWrapper.tsx - SEO-optimierte Version
import React from 'react';
import SEO from './SEO';
import Impressum from "@components/Homepage/Impressum.tsx";

// Import deiner originalen Impressum-Komponente
// import OriginalImpressum from './Homepage/Impressum';

const ImpressumWrapper: React.FC = () => {
    return (
        <>
            <SEO
                title="Impressum - blickfang Nagelstudio"
                description="Impressum und rechtliche Informationen von blickfang Nagelstudio in St. Veit am Vogau, Steiermark."
                canonicalUrl="https://blickfang-nagelstudio.at/impressum"
                noindex={true}
            />
            
            <main itemScope itemType="https://schema.org/AboutPage">
                <Impressum />
            </main>
        </>
    );
};

export default ImpressumWrapper;
