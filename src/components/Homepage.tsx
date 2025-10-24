import HeroCarousel from "./Homepage/HeroCarousel.tsx";
import AboutSection from "./Homepage/AboutSection.tsx";
import StudioSection from "./Homepage/StudioSection.tsx";
import ContactSection from "./Homepage/ContactSection.tsx";
import CoursesSection from "./Homepage/courses/CoursesSection.tsx";

function Homepage() {
    return (
        <div>
            {/* Alle Sections mit IDs fü dieNavigation */}
            <section id="home">
                <HeroCarousel/>
            </section>

            <section id="about">
                <AboutSection/>
            </section>

            <section id="services">
                <CoursesSection />
            </section>

            <section id="blickfang">
                <StudioSection/>
            </section>

            <section id="contact">
                <ContactSection/>
            </section>

        </div>
    );
}

export default Homepage;