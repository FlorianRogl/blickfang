import HeroCarousel from "./Homepage/HeroCarousel.tsx";
import AboutSection from "./Homepage/AboutSection.tsx";
import CoursesSection from "./Homepage/CoursesSection.tsx";
import Footer from "./Homepage/Footer.tsx";
import StudioSection from "./Homepage/StudioSection.tsx";
import ContactSection from "./Homepage/ContactSection.tsx";
import Navbar from "./Homepage/Navbar.tsx";

function Homepage() {
    return (
        <div>
            {/* Navbar bleibt fixed oben */}
            <Navbar />

            {/* Alle Sections mit IDs für die Navigation */}
            <section id="home">
                <HeroCarousel/>
            </section>

            <section id="about">
                <AboutSection/>
            </section>

            <section id="services"> {/* Für Courses - passt zu deiner Navbar */}
                <CoursesSection/>
            </section>

            <section id="gallery"> {/* Studio als Galerie */}
                <StudioSection/>
            </section>

            <section id="contact">
                <ContactSection/>
            </section>

            <Footer/>
        </div>
    );
}

export default Homepage;