import { useState, useEffect } from 'react';
import logo2 from '../../assets/Logo2.png';

type Section = 'home' | 'about' | 'courses' | 'blickfang' | 'contact';

interface NavLink {
    href: string;
    text: string;
    section: Section;
}

const Navbar = () => {
    const [activeSection, setActiveSection] = useState<Section>('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = (): void => {
            const currentScrollY = window.scrollY;

            const sections: Section[] = ['home', 'about', 'courses', 'blickfang', 'contact'];
            let currentSection: Section = 'home';

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const offsetTop = currentScrollY + rect.top;

                    if (currentScrollY >= offsetTop - 100) {
                        currentSection = sectionId;
                    }
                }
            }

            setActiveSection(currentSection);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const getBackgroundOpacity = (): number => {
        return 1;
    };

    const getTextColor = (): string => {
        return 'rgba(55, 65, 81, 1)';
    };

    const getUnderlineColor = (): string => {
        return '#D5DD48';
    };

    const getLogoSizeClasses = (): string => {
        // Größeres Logo für mobile, normale Größe für Desktop
        return "h-12 sm:h-14 md:h-12 lg:h-14 w-auto";
    };

    const backgroundOpacity = getBackgroundOpacity();
    const textColor = getTextColor();
    const underlineColor = getUnderlineColor();

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        const target = e.target as HTMLAnchorElement;
        target.style.borderBottom = `2px solid ${underlineColor}`;
        target.style.transform = 'translateY(-2px)';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>, linkSection: Section): void => {
        const target = e.target as HTMLAnchorElement;
        const isActive = activeSection === linkSection;
        target.style.borderBottom = isActive ? `3px solid ${underlineColor}` : '2px solid transparent';
        target.style.transform = 'translateY(0)';
    };

    const getLinkStyle = (section: Section): React.CSSProperties => {
        const isActive = activeSection === section;
        return {
            color: textColor,
            transition: 'all 200ms ease-out',
            borderBottom: isActive ? `3px solid ${underlineColor}` : '2px solid transparent',
            paddingBottom: '6px',
            fontSize: '1.2rem',
            fontWeight: '300'
        };
    };

    const navLinks: NavLink[] = [
        { href: '#home', text: 'Home', section: 'home' },
        { href: '#about', text: 'Über Mich', section: 'about' },
        { href: '#courses', text: 'Unsere Kurse', section: 'courses' },
        { href: '#blickfang', text: 'Blickfang', section: 'blickfang' },
        { href: '#contact', text: 'Kontakt', section: 'contact' }
    ];

    const handleLinkClick = (): void => {
        setIsMobileMenuOpen(false);
    };

    const Logo = () => (
        <img
            src={logo2}
            alt="blickfang logo"
            className={getLogoSizeClasses()}
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
                    background: `rgba(234, 233, 229, ${backgroundOpacity})`,
                    backdropFilter: backgroundOpacity > 0 ? 'blur(12px)' : 'none',
                    boxShadow: backgroundOpacity > 0.5 ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
                    transition: 'all 150ms ease-out'
                }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-3 lg:py-6">
                    <div className="flex items-center justify-between min-h-[4rem] sm:min-h-[3.5rem] md:min-h-[4rem] lg:min-h-[4.5rem]">
                        <div className="flex items-center flex-shrink-0 py-2 lg:-mt-2">
                            <Logo />
                        </div>

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

                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2.5 rounded-md transition-all duration-300"
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

            <div
                className={`fixed top-0 right-0 h-full w-80 max-w-sm z-50 lg:hidden transition-all duration-300 ease-in-out transform ${
                    isMobileMenuOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                }`}
                style={{
                    background: 'rgba(234, 233, 229, 0.98)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div className="p-4 border-b border-gray-200 border-opacity-30">
                    <div className="flex justify-end">
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

                <div className="p-6">
                    <div className="flex flex-col space-y-6">
                        {navLinks.map((link, index) => (
                            <a
                                key={link.section}
                                href={link.href}
                                className="font-light px-4 py-3 block rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-50"
                                style={{
                                    ...getLinkStyle(link.section),
                                    fontSize: '1.25rem',
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