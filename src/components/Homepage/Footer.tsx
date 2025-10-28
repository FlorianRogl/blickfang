import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    MapPin,
    Phone,
    Mail,
    Instagram,
    MessageCircle,
    Sparkles
} from 'lucide-react';

const Footer: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const footerElement = document.getElementById('footer-section');
        if (footerElement) {
            observer.observe(footerElement);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleSocialButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        const target = e.currentTarget;
        target.style.backgroundColor = '#D5DD48';
        target.style.borderColor = '#D5DD48';
    };

    const handleSocialButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        const target = e.currentTarget;
        target.style.backgroundColor = '#1f2937';
        target.style.borderColor = '#374151';
    };

    interface QuickLink {
        text: string;
        href: string;
    }

    const quickLinks: QuickLink[] = [
        { text: 'Home', href: '#home' },
        { text: 'Über Mich', href: '#about' },
        { text: 'Unsere Kurse', href: '#courses' },
        { text: 'Blickfang', href: '#blickfang' },
        { text: 'Kontakt', href: '#contact' },
        { text: 'Impressum', href: '/impressum' }
    ];

    return (
        <footer
            id="footer-section"
            className="relative bg-gray-900 text-white"
        >
            {/* Top Border */}
            <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ backgroundColor: '#D5DD48' }}
            ></div>

            <div className="container mx-auto px-6 py-16 relative z-10">

                {/* Main Footer Content */}
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-12">

                    {/* Company Info */}
                    <div className={`space-y-6 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div
                                    className="rounded-lg p-2"
                                    style={{ backgroundColor: '#D5DD48' }}
                                >
                                    <Sparkles className="w-6 h-6 text-gray-800" />
                                </div>
                                <h3
                                    className="text-2xl font-bold"
                                    style={{ color: '#D5DD48' }}
                                >
                                    blickfang
                                </h3>
                            </div>


                        </div>

                        {/* Social Media */}
                        <div className="space-y-3">
                            <h4 className="text-lg font-medium text-white">Folgen Sie uns</h4>
                            <div className="flex space-x-3">
                                <a
                                    href="https://www.instagram.com/blickfang.nagelstudio/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-800 p-2.5 rounded-lg hover:scale-105 transform transition-all duration-200 border border-gray-700"
                                    onMouseEnter={handleSocialButtonMouseEnter}
                                    onMouseLeave={handleSocialButtonMouseLeave}
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5 text-white" />
                                </a>


                                <a
                                    href="https://wa.me/436644523026"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-800 p-2.5 rounded-lg hover:scale-105 transform transition-all duration-200 border border-gray-700"
                                    onMouseEnter={handleSocialButtonMouseEnter}
                                    onMouseLeave={handleSocialButtonMouseLeave}
                                    aria-label="WhatsApp"
                                >
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={`space-y-4 transition-all duration-800 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h4 className="text-lg font-medium text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.text}>
                                    {link.href.startsWith('#') ? (
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                                        >
                                            <div
                                                className="w-1.5 h-1.5 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                style={{ backgroundColor: '#D5DD48' }}
                                            ></div>
                                            <span>{link.text}</span>
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.href}
                                            className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                                        >
                                            <div
                                                className="w-1.5 h-1.5 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                style={{ backgroundColor: '#D5DD48' }}
                                            ></div>
                                            <span>{link.text}</span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Hours */}
                    <div className={`space-y-4 transition-all duration-800 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h4 className="text-lg font-medium text-white mb-4">Kontakt</h4>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-4 h-4 mt-0.5" style={{ color: '#D5DD48' }} />
                                <div className="text-sm">
                                    <p className="text-gray-300">Am Kirchpl. 7

                                    </p>
                                    <p className="text-gray-300"> 8423 St. Veit am Vogaua</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4" style={{ color: '#D5DD48' }} />
                                <a
                                    href="tel:+436644523026"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    +43 664 4523026
                                </a>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4" style={{ color: '#D5DD48' }} />
                                <a
                                    href="mailto:hi@blickfang-nagelstudio.at"
                                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    hi@blickfang-nagelstudio.at
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    className="border-t pt-6"
                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © 2025 blickfang Nagelstudio. Alle Rechte vorbehalten.
                        </div>
                        <div className="flex space-x-6 text-sm">

                            <Link
                                to="/impressum"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Impressum
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;