import HeroCarousel from "./Homepage/HeroCarousel.tsx";
import AboutSection from "./Homepage/AboutSection.tsx";
import StudioSection from "./Homepage/StudioSection.tsx";
import ContactSection from "./Homepage/ContactSection.tsx";
import CoursesSection from "./Homepage/courses/CoursesSection.tsx";
import SEO from "./SEO.tsx";
import {aggregateSchema} from "./utils/schemas.ts";

function Homepage() {
    return (
        <>
            <SEO
                title="blickfang Nagelstudio St. Veit - Professionelle Nageldesign Kurse & Academy"
                description="Lerne Nageldesign bei blickfang in St. Veit am Vogau, Steiermark. Professionelle Kurse: Gel-Nägel Grundkurs, Russian Manicure, Fast Tips & mehr. Nail Academy mit Trainerin Adriana seit 2010."
                canonicalUrl="https://blickfang-nagelstudio.at/"
                keywords="Nagelstudio St. Veit, Nageldesign Kurs Steiermark, Nail Academy Österreich, Russian Manicure Kurs, Gel-Nägel Ausbildung, Nageldesign lernen, Nail Training Steiermark, Nagelstudio Leibnitz, blickfang"
                structuredData={aggregateSchema}
            />

            <div>
                {/* Alle Sections mit semantischen HTML-Tags und IDs für Navigation */}
                <section id="home" aria-label="Startseite Hero-Bereich">
                    <HeroCarousel/>
                </section>

                <section id="about" aria-label="Über Adriana und blickfang">
                    <AboutSection/>
                </section>

                <section id="services" aria-label="Unsere Nageldesign-Kurse">
                    <CoursesSection />
                </section>

                <section id="blickfang" aria-label="Unser Studio">
                    <StudioSection/>
                </section>

                <section id="contact" aria-label="Kontakt und Buchung">
                    <ContactSection/>
                </section>
            </div>
        </>
    );
}

export default Homepage;