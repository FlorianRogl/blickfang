import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import logo2 from '../../assets/Logo2.png';

type Section = 'home' | 'about' | 'courses' | 'blickfang' | 'contact';

interface NavLink {
    href: string;
    text: string;
    section: Section;
}

interface CartItem {
    courseTitle: string;
    variant: string;
    price: string;
    addedAt: number;
}

const Navbar = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<Section>('home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const handleAddToCart = (event: CustomEvent<CartItem>) => {
            setCartItems(prev => [...prev, event.detail]);
        };

        const handleClearCart = () => {
            setCartItems([]);
            setIsCartOpen(false);
        };

        window.addEventListener('addToCart', handleAddToCart as EventListener);
        window.addEventListener('clearCart', handleClearCart);

        return () => {
            window.removeEventListener('addToCart', handleAddToCart as EventListener);
            window.removeEventListener('clearCart', handleClearCart);
        };
    }, []);

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
        return 'rgba(0, 0, 0, 1)';
    };

    const getUnderlineColor = (): string => {
        return '#D5DD48';
    };

    const getLogoSizeClasses = (): string => {
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

    const removeFromCart = (index: number): void => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
    };

    const getTotalPrice = (): number => {
        return cartItems.reduce((total, item) => {
            const priceString = item.price.replace(/[^\d,]/g, '').replace(',', '.');
            return total + parseFloat(priceString);
        }, 0);
    };

    const handleReservation = (): void => {
        setIsCartOpen(false);
        navigate('/booking', {
            state: {
                cartItems: cartItems,
                totalPrice: getTotalPrice().toFixed(2).replace('.', ',') + ' €'
            }
        });
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

                        <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
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
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="p-2 hover:scale-110 transform transition-all duration-200 relative"
                                style={{ color: textColor }}
                                aria-label="Warenkorb"
                            >
                                <ShoppingCart size={24} strokeWidth={1.5} />
                                {cartItems.length > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium text-gray-900"
                                        style={{ backgroundColor: '#D5DD48' }}
                                    >
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="lg:hidden flex items-center space-x-3">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="p-2 hover:scale-110 transform transition-all duration-200 relative"
                                style={{ color: textColor }}
                                aria-label="Warenkorb"
                            >
                                <ShoppingCart size={24} strokeWidth={1.5} />
                                {cartItems.length > 0 && (
                                    <span
                                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium text-gray-900"
                                        style={{ backgroundColor: '#D5DD48' }}
                                    >
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>
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

            {/* Mobile Menu Sidebar */}
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
                            <X className="w-6 h-6" />
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

            {/* Cart Overlay */}
            <div
                className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
                    isCartOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
                style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: isCartOpen ? 'blur(4px)' : 'none'
                }}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Cart Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-96 max-w-full z-50 transition-all duration-300 ease-in-out transform ${
                    isCartOpen
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                }`}
                style={{
                    background: 'linear-gradient(to bottom, #ffffff 0%, #faf9f7 50%, #f5f4f0 100%)',
                    boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.08)',
                }}
            >
                {/* Cart Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <ShoppingCart size={22} strokeWidth={1.5} className="text-gray-700" />
                            <h2 className="text-xl font-normal text-gray-900">
                                Warenkorb
                            </h2>
                        </div>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 rounded-md hover:bg-gray-100 transition-all"
                            aria-label="Warenkorb schließen"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Cart Content */}
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto p-6" style={{ background: 'transparent' }}>
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <ShoppingCart size={48} strokeWidth={1.5} className="text-gray-300 mb-4" />
                                <p className="text-base font-normal text-gray-700 mb-1">
                                    Dein Warenkorb ist leer
                                </p>
                                <p className="text-sm text-gray-500">
                                    Füge Kurse hinzu, um zu beginnen
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {cartItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-md border border-gray-200"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <h3 className="font-normal text-base text-gray-900 mb-1">
                                                    {item.courseTitle}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {item.variant} Paket
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(index)}
                                                className="p-1.5 hover:bg-gray-100 rounded transition-all"
                                                aria-label="Aus Warenkorb entfernen"
                                            >
                                                <Trash2 size={16} className="text-gray-400" />
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                            <span className="text-sm text-gray-600">Preis</span>
                                            <span className="text-lg font-normal text-gray-900">{item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Footer */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-gray-200 p-6 bg-white">
                            <div className="space-y-6">
                                <div className="flex justify-between items-center pb-6 border-b border-gray-200">
                                    <span className="text-xl font-normal text-gray-700">Gesamtsumme</span>
                                    <span className="text-4xl font-normal text-gray-900">
                                        {getTotalPrice().toFixed(2).replace('.', ',')} €
                                    </span>
                                </div>
                                <button
                                    onClick={handleReservation}
                                    className="w-full py-5 rounded-md font-normal text-lg text-gray-900 transition-all duration-200 hover:opacity-90"
                                    style={{ backgroundColor: '#D5DD48' }}
                                >
                                    Jetzt Reservieren
                                </button>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full py-3 rounded-md font-normal text-gray-600 hover:bg-gray-100 transition-all duration-200"
                                >
                                    Weiter einkaufen
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;