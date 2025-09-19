import { useState, useEffect } from 'react';
import logo from '../../assets/Logo2.png';

const Navbar = () => {
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);

            // Bestimme aktive Sektion basierend auf Scroll-Position
            const sections = ['home', 'about', 'courses', 'blickfang', 'contact'];
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

    const handleMouseEnter = (e) => {
        const target = e.target;
        target.style.borderBottom = `2px solid ${underlineColor}`;
        target.style.transform = 'translateY(-2px)';
        // Textfarbe bleibt unverändert
    };

    const handleMouseLeave = (e, linkSection) => {
        const target = e.target;
        const isActive = activeSection === linkSection;
        target.style.borderBottom = isActive ? `3px solid ${underlineColor}` : '2px solid transparent';
        target.style.transform = 'translateY(0)';
        // Textfarbe bleibt unverändert
    };

    const getLinkStyle = (section) => {
        const isActive = activeSection === section;
        return {
            color: textColor, // Text bleibt immer konstant schwarz
            transition: 'all 200ms ease-out',
            borderBottom: isActive ? `3px solid ${underlineColor}` : '2px solid transparent',
            paddingBottom: '6px',
            fontSize: '1.25rem',
            fontWeight: '300' // Elegante, dünnere Schrift
        };
    };

    const navLinks = [
        { href: '#home', text: 'Home', section: 'home' },
        { href: '#about', text: 'Über Mich', section: 'about' },
        { href: '#courses', text: 'Unsere Kurse', section: 'courses' },
        { href: '#blickfang', text: 'Blickfang', section: 'blickfang' },
        { href: '#contact', text: 'Kontakt', section: 'contact' }
    ];

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    // Logo component
    const Logo = () => (
        <img
            src={logo}
            alt="blickfang logo"
            className="h-28 w-auto"
            style={{
                filter: 'none',
                transition: 'all 150ms ease-out'
            }}
        />
    );

    return (
        <>
            <nav
                className="fixed top-0 w-full z-50"
                style={{
                    background: `rgba(234, 233, 229, ${backgroundOpacity})`, // Beige #EAE9E5
                    backdropFilter: backgroundOpacity > 0 ? 'blur(12px)' : 'none',
                    boxShadow: backgroundOpacity > 0.5 ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
                    transition: 'all 150ms ease-out'
                }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center flex-shrink-0">
                            <Logo />
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex space-x-8 xl:space-x-12">
                            {navLinks.map((link) => (
                                <a
                                    key={link.section}
                                    href={link.href}
                                    className="font-light hover:scale-105 transform px-2 py-2 whitespace-nowrap"
                                    style={getLinkStyle(link.section)}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={(e) => handleMouseLeave(e, link.section)}
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-3 rounded-md transition-all duration-300"
                                style={{ color: textColor }}
                                aria-label="Menü öffnen"
                            >
                                <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                                    <span
                                        className="block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out"
                                        style={{
                                            transform: isMobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'translateY(0)',
                                            transformOrigin: 'center'
                                        }}
                                    />
                                    <span
                                        className="block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out"
                                        style={{
                                            opacity: isMobileMenuOpen ? '0' : '1',
                                            transform: isMobileMenuOpen ? 'scale(0)' : 'scale(1)'
                                        }}
                                    />
                                    <span
                                        className="block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out"
                                        style={{
                                            transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'translateY(0)',
                                            transformOrigin: 'center'
                                        }}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
                style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: isMobileMenuOpen ? 'blur(4px)' : 'none'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-80 max-w-sm z-50 lg:hidden transition-all duration-300 ease-in-out transform ${
                    isMobileMenuOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                }`}
                style={{
                    background: `rgba(234, 233, 229, 0.98)`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Menu Header */}
                <div className="p-6 border-b border-gray-200 border-opacity-30">
                    <div className="flex items-center justify-between">
                        <Logo />
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 rounded-md"
                            style={{ color: textColor }}
                            aria-label="Menü schließen"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="p-6">
                    <div className="flex flex-col space-y-6">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.section}
                                href={link.href}
                                className="font-light px-4 py-3 block rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-50"
                                style={{
                                    ...getLinkStyle(link.section),
                                    fontSize: '1.375rem',
                                    borderBottom: 'none',
                                    borderLeft: activeSection === link.section ? `4px solid ${underlineColor}` : '4px solid transparent',
                                    paddingLeft: activeSection === link.section ? '20px' : '16px',
                                    animationDelay: `${index * 50}ms`
                                }}
                                onClick={handleLinkClick}
                            >
                                {link.text}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Menu Footer */}
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            © 2024 Blickfang
                        </p>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Navbar;