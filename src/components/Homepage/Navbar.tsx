import { useState, useEffect } from 'react';
import '../../index.css';

import logo from '../../assets/Logo2.png'

const Navbar = () => {
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('home');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Animate navbar immediately on load
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);

            // Bestimme aktive Sektion basierend auf Scroll-Position
            const sections = ['home', 'gallery', 'about', 'services', 'contact'];
            let currentSection = 'home';

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const offsetTop = currentScrollY + rect.top;

                    // Sektion ist aktiv wenn sie im oberen Bereich des Viewports ist
                    if (currentScrollY >= offsetTop - 100) {
                        currentSection = sectionId;
                    }
                }
            }

            setActiveSection(currentSection);
        };

        // Initial call
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Hintergrund-Opazität basierend auf Scroll-Position
    const getBackgroundOpacity = () => {
        if (scrollY === 0) return 0.95; // Leicht transparent am Anfang
        return Math.min(1, scrollY / 100); // Wird opaker beim Scrollen
    };

    const getTextColor = () => {
        return 'rgba(55, 65, 81, 1)'; // Immer dunkle Farbe (schwarz)
    };

    const getUnderlineColor = () => {
        return '#D5DD48'; // Grünton für den Unterstrich
    };

    const backgroundOpacity = getBackgroundOpacity();
    const textColor = getTextColor();
    const underlineColor = getUnderlineColor();

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.target as HTMLAnchorElement;
        target.style.borderBottom = `2px solid ${underlineColor}`;
        target.style.transform = 'translateY(-2px) scale(1.05)';
        target.style.textShadow = '0 2px 8px rgba(213, 221, 72, 0.3)';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>, linkSection: string) => {
        const target = e.target as HTMLAnchorElement;
        const isActive = activeSection === linkSection;
        target.style.borderBottom = isActive ? `3px solid ${underlineColor}` : '2px solid transparent';
        target.style.transform = 'translateY(0) scale(1)';
        target.style.textShadow = 'none';
    };

    const getLinkStyle = (section: string) => {
        const isActive = activeSection === section;
        return {
            color: textColor, // Text bleibt immer konstant schwarz
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            borderBottom: isActive ? `3px solid ${underlineColor}` : '2px solid transparent',
            paddingBottom: '6px',
            fontSize: '1.25rem',
            fontWeight: '600'
        };
    };

    const navLinks = [
        { href: '#home', text: 'Home', section: 'home' },
        { href: '#gallery', text: 'Galerie', section: 'gallery' },
        { href: '#about', text: 'Über Mich', section: 'about' },
        { href: '#services', text: 'Services', section: 'services' },
        { href: '#contact', text: 'Kontakt', section: 'contact' }
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
                isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}
            style={{
                background: `rgba(234, 233, 229, ${backgroundOpacity})`, // Neues beige #EAE9E5
                backdropFilter: backgroundOpacity > 0 ? 'blur(12px)' : 'none',
                boxShadow: backgroundOpacity > 0.5 ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            <div className="container mx-auto px-8 py-2">
                <div className="flex items-center justify-between">
                    <div className={`flex items-center transition-all duration-500 delay-200 ${
                        isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
                    }`}>
                        <img
                            src={logo}
                            alt="blickfang logo"
                            className="h-28 w-auto hover:scale-105 transition-transform duration-300"
                            style={{
                                filter: 'none',
                                transition: 'all 300ms ease-out'
                            }}
                        />
                    </div>
                    <div className="hidden md:flex space-x-12">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.section}
                                href={link.href}
                                className={`font-medium hover:scale-105 transform px-2 py-2 transition-all duration-500 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
                                }`}
                                style={{
                                    ...getLinkStyle(link.section),
                                    transitionDelay: `${300 + index * 100}ms`
                                }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={(e) => handleMouseLeave(e, link.section)}
                            >
                                {link.text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;