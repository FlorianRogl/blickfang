import React, { useState, useEffect, useRef } from 'react';
// Oben in der Datei
import { getOpeningHours, type OpeningHour } from '../../lib/sanity';

import {
    Phone,
    Mail,
    Instagram,
    MessageCircle,
    MapPin,
    Clock
} from 'lucide-react';

const ContactSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Öffnungszeiten von Sanity laden
    useEffect(() => {
        async function fetchOpeningHours() {
            try {
                const data = await getOpeningHours();
                setOpeningHours(data);
            } catch (error) {
                console.error('Fehler beim Laden der Öffnungszeiten:', error);
                // Fallback zu hardcodierten Zeiten
                setOpeningHours([
                    { day: 'Montag', hours: '09:00 - 18:00', isOpen: true },
                    { day: 'Dienstag', hours: '09:00 - 18:00', isOpen: true },
                    { day: 'Mittwoch', hours: '09:00 - 18:00', isOpen: true },
                    { day: 'Donnerstag', hours: '09:00 - 20:00', isOpen: true },
                    { day: 'Freitag', hours: '09:00 - 18:00', isOpen: true },
                    { day: 'Samstag', hours: '09:00 - 16:00', isOpen: true },
                    { day: 'Sonntag', hours: 'Geschlossen', isOpen: false }
                ]);
            } finally {
                setIsLoading(false);
            }
        }

        fetchOpeningHours();
    }, []);

    const contactInfo = {
        phone: '+43 664 4523026',
        email: 'hi@blickfang-nagelstudio.at',
        address: 'Am Kirchpl. 7, 8423 St. Veit am Vogau',
        instagram: 'blickfang.nagelstudio'
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-12 sm:py-16 lg:py-20 xl:py-14 2xl:py-20 overflow-hidden"
            style={{ backgroundColor: '#F5F4F0' }}
        >
            {/* Decorative Line */}
            <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(213, 221, 72, 0.3) 50%, transparent 100%)'
                }}
            ></div>

            <div className="relative w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl xl:max-w-6xl 2xl:max-w-[1400px] mx-auto">
                    {/* Header */}
                    <div className={`text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-8 2xl:mb-16 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <h2 className="text-4xl sm:text-5xl xl:text-3xl 2xl:text-5xl font-thin text-gray-800 mb-4 sm:mb-6 xl:mb-3 2xl:mb-6 leading-tight">
                            Kontakt & Anfahrt
                        </h2>
                        <div className="flex justify-center mb-4 sm:mb-6 xl:mb-3 2xl:mb-6">
                            <div className="w-20 sm:w-32 xl:w-16 2xl:w-32 h-1 sm:h-1.5 xl:h-0.5 2xl:h-1.5 opacity-70 rounded-full" style={{ backgroundColor: '#D5DD48' }}></div>
                        </div>
                        <p className="text-base sm:text-lg xl:text-sm 2xl:text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                            Lass uns in Kontakt treten – ich freue mich auf deine Nachricht
                        </p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-8 2xl:gap-16">

                        {/* Left Column - Contact Cards */}
                        <div className={`space-y-4 sm:space-y-6 xl:space-y-3 2xl:space-y-6 transition-all duration-800 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

                            {/* Quick Contact Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-2.5 2xl:gap-4">
                                {/* Phone Card */}
                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="group bg-white/80 backdrop-blur-sm rounded-xl xl:rounded-lg 2xl:rounded-xl p-5 xl:p-3 2xl:p-5 border border-gray-100 hover:border-opacity-0 transition-all duration-300 hover:shadow-lg touch-manipulation"
                                    onMouseEnter={() => setHoveredCard('phone')}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        borderColor: hoveredCard === 'phone' ? '#D5DD48' : undefined
                                    }}
                                >
                                    <div className="flex items-start space-x-3 xl:space-x-2 2xl:space-x-3">
                                        <div
                                            className="p-2.5 xl:p-1.5 2xl:p-2.5 rounded-lg transition-all duration-300"
                                            style={{ backgroundColor: hoveredCard === 'phone' ? '#D5DD48' : 'rgba(213, 221, 72, 0.1)' }}
                                        >
                                            <Phone className="w-5 h-5 xl:w-3.5 xl:h-3.5 2xl:w-5 2xl:h-5" style={{ color: hoveredCard === 'phone' ? '#2C3E16' : '#A8B536' }} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-light text-gray-500 mb-1 xl:mb-0.5 2xl:mb-1">Telefon</p>
                                            <p className="text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 group-hover:text-gray-600">{contactInfo.phone}</p>
                                        </div>
                                    </div>
                                </a>

                                {/* Email Card */}
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="group bg-white/80 backdrop-blur-sm rounded-xl xl:rounded-lg 2xl:rounded-xl p-5 xl:p-3 2xl:p-5 border border-gray-100 hover:border-opacity-0 transition-all duration-300 hover:shadow-lg touch-manipulation"
                                    onMouseEnter={() => setHoveredCard('email')}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        borderColor: hoveredCard === 'email' ? '#D5DD48' : undefined
                                    }}
                                >
                                    <div className="flex items-start space-x-3 xl:space-x-2 2xl:space-x-3">
                                        <div
                                            className="p-2.5 xl:p-1.5 2xl:p-2.5 rounded-lg transition-all duration-300"
                                            style={{ backgroundColor: hoveredCard === 'email' ? '#D5DD48' : 'rgba(213, 221, 72, 0.1)' }}
                                        >
                                            <Mail className="w-5 h-5 xl:w-3.5 xl:h-3.5 2xl:w-5 2xl:h-5" style={{ color: hoveredCard === 'email' ? '#2C3E16' : '#A8B536' }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-light text-gray-500 mb-1 xl:mb-0.5 2xl:mb-1">E-Mail</p>
                                            <p className="text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 group-hover:text-gray-600 truncate">{contactInfo.email}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            {/* Address Card */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl xl:rounded-lg 2xl:rounded-xl p-5 xl:p-3 2xl:p-5 border border-gray-100">
                                <div className="flex items-start space-x-3 xl:space-x-2 2xl:space-x-3">
                                    <div
                                        className="p-2.5 xl:p-1.5 2xl:p-2.5 rounded-lg"
                                        style={{ backgroundColor: 'rgba(213, 221, 72, 0.1)' }}
                                    >
                                        <MapPin className="w-5 h-5 xl:w-3.5 xl:h-3.5 2xl:w-5 2xl:h-5" style={{ color: '#A8B536' }} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-light text-gray-500 mb-1 xl:mb-0.5 2xl:mb-1">Adresse</p>
                                        <p className="text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 leading-relaxed">{contactInfo.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Buttons */}
                            <div className="grid grid-cols-2 gap-3 xl:gap-2 2xl:gap-3">
                                <a
                                    href={`https://wa.me/${contactInfo.phone.replace(/\s+/g, '').replace('+', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center space-x-2 xl:space-x-1.5 2xl:space-x-2 bg-green-500 hover:bg-green-600 text-white rounded-lg xl:rounded 2xl:rounded-lg py-3 xl:py-2 2xl:py-3 px-4 xl:px-2.5 2xl:px-4 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md touch-manipulation"
                                >
                                    <MessageCircle className="w-4 h-4 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4" />
                                    <span className="font-medium text-sm xl:text-xs 2xl:text-sm">WhatsApp</span>
                                </a>

                                <a
                                    href={`https://instagram.com/${contactInfo.instagram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center space-x-2 xl:space-x-1.5 2xl:space-x-2 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg xl:rounded 2xl:rounded-lg py-3 xl:py-2 2xl:py-3 px-4 xl:px-2.5 2xl:px-4 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md touch-manipulation"
                                >
                                    <Instagram className="w-4 h-4 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4" />
                                    <span className="font-medium text-sm xl:text-xs 2xl:text-sm">Instagram</span>
                                </a>
                            </div>

                            {/* Opening Hours */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl xl:rounded-lg 2xl:rounded-xl p-5 xl:p-3 2xl:p-5 border border-gray-100">
                                <div className="flex items-center space-x-2 xl:space-x-1.5 2xl:space-x-2 mb-4 xl:mb-2 2xl:mb-4">
                                    <Clock className="w-4 h-4 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4" style={{ color: '#D5DD48' }} />
                                    <h3 className="text-base xl:text-xs 2xl:text-base font-medium text-gray-800">Öffnungszeiten</h3>
                                </div>

                                {isLoading ? (
                                    <div className="space-y-2 xl:space-y-1 2xl:space-y-2">
                                        {[...Array(7)].map((_, i) => (
                                            <div key={i} className="h-8 bg-gray-100 animate-pulse rounded"></div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-2 xl:space-y-1 2xl:space-y-2">
                                        {openingHours.map((schedule) => (
                                            <div
                                                key={schedule.day}
                                                className="flex justify-between items-center py-1.5 xl:py-0.5 2xl:py-1.5 border-b border-gray-100 last:border-b-0"
                                            >
                                                <span className="text-sm xl:text-xs 2xl:text-sm text-gray-600 font-light">{schedule.day}</span>
                                                <div className="flex items-center space-x-2 xl:space-x-1.5 2xl:space-x-2">
                                                    {schedule.isOpen && (
                                                        <span className="w-1.5 h-1.5 xl:w-1 xl:h-1 2xl:w-1.5 2xl:h-1.5 rounded-full" style={{ backgroundColor: '#D5DD48' }}></span>
                                                    )}
                                                    <span className={`text-sm xl:text-xs 2xl:text-sm font-medium ${schedule.isOpen ? 'text-gray-800' : 'text-gray-400'}`}>
                                                    {schedule.hours}
                                                </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Map */}
                        <div className={`transition-all duration-800 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl xl:rounded-lg 2xl:rounded-xl p-5 xl:p-3 2xl:p-5 border border-gray-100 h-full flex flex-col shadow-sm">
                                <div className="flex items-center space-x-2 xl:space-x-1.5 2xl:space-x-2 mb-3 xl:mb-2 2xl:mb-3">
                                    <MapPin className="w-4 h-4 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4" style={{ color: '#D5DD48' }} />
                                    <h3 className="text-base xl:text-xs 2xl:text-base font-medium text-gray-800">So findest du uns</h3>
                                </div>

                                <div className="relative w-full flex-1 rounded-lg overflow-hidden" style={{ minHeight: '350px' }}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2727.847639458892!2d15.731486376834637!3d46.74583994706314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f97d2d8c8a8a9%3A0x9d9d9d9d9d9d9d9d!2sAm%20Kirchpl.%207%2C%208423%20St.%20Veit%20am%20Vogau!5e0!3m2!1sde!2sat!4v1697000000000!5m2!1sde!2sat"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="blickfang Nagelstudio Standort"
                                        className="rounded-lg"
                                    ></iframe>
                                </div>

                                {/* Map Action Button */}
                                <div className="mt-4 xl:mt-2.5 2xl:mt-4">
                                    <a
                                        href={`https://www.google.com/maps/search/${encodeURIComponent(contactInfo.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center space-x-2 xl:space-x-1.5 2xl:space-x-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg xl:rounded 2xl:rounded-lg py-3 xl:py-2 2xl:py-3 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md touch-manipulation"
                                    >
                                        <MapPin className="w-4 h-4 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4" />
                                        <span className="font-medium text-sm xl:text-xs 2xl:text-sm">Route planen</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;