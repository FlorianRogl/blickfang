import React, { useState, useEffect, useRef } from 'react';
import {
    Phone,
    Mail,
    Instagram,
    MessageCircle,
    Clock
} from 'lucide-react';

const ContactSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
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

    const contactInfo = {
        phone: '+43 3472 12345',
        email: 'info@blickfang-nagelstudio.at',
        address: 'Am Kirchpl. 7, 8423 St. Veit am Vogau',
        instagram: '@blickfang_nagelstudio'
    };

    const openingHours = [
        { day: 'Montag', hours: '09:00 - 18:00' },
        { day: 'Dienstag', hours: '09:00 - 18:00' },
        { day: 'Mittwoch', hours: '09:00 - 18:00' },
        { day: 'Donnerstag', hours: '09:00 - 20:00' },
        { day: 'Freitag', hours: '09:00 - 18:00' },
        { day: 'Samstag', hours: '09:00 - 16:00' },
        { day: 'Sonntag', hours: 'Geschlossen' }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-12 sm:py-16 lg:py-20 overflow-hidden"
            style={{ backgroundColor: '#F5F4F0' }}
        >
            {/* Decorative Line */}
            <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(213, 221, 72, 0.3) 50%, transparent 100%)'
                }}
            ></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header */}
                <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <h2 className="text-4xl sm:text-5xl font-thin text-gray-800 mb-4 sm:mb-6 leading-tight">
                        Kontakt
                    </h2>
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <div className="w-20 sm:w-32 h-1 sm:h-1.5 opacity-70 rounded-full" style={{ backgroundColor: '#D5DD48' }}></div>
                    </div>
                    <p className="text-base sm:text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                        Besuchen Sie uns in unserem Studio in St. Veit am Vogau oder kontaktieren Sie uns.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">

                    {/* Left Column - Contact Info */}
                    <div className={`space-y-4 sm:space-y-6 transition-all duration-800 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

                        {/* Contact Methods */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Phone */}
                            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                                    <div className="rounded p-2 sm:p-3" style={{ backgroundColor: '#D5DD48' }}>
                                        <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-medium text-gray-800">Telefon</h3>
                                </div>
                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="text-sm sm:text-base font-light transition-colors duration-300 block mb-2 text-gray-800 hover:text-gray-600 touch-manipulation"
                                >
                                    {contactInfo.phone}
                                </a>
                            </div>

                            {/* Email */}
                            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                                    <div className="rounded p-2 sm:p-3" style={{ backgroundColor: '#D5DD48' }}>
                                        <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-gray-800" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-medium text-gray-800">E-Mail</h3>
                                </div>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="text-sm sm:text-base font-light transition-colors duration-300 block mb-2 break-all text-gray-800 hover:text-gray-600 touch-manipulation"
                                >
                                    {contactInfo.email}
                                </a>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
                            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Social Media & Chat</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {/* WhatsApp */}
                                <a
                                    href={`https://wa.me/${contactInfo.phone.replace(/\s+/g, '').replace('+', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center space-x-2 sm:space-x-3 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 sm:p-4 transition-all duration-300 hover:scale-105 touch-manipulation"
                                >
                                    <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                                    <span className="font-medium text-sm sm:text-base">WhatsApp</span>
                                </a>

                                {/* Instagram */}
                                <a
                                    href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-3 sm:p-4 transition-all duration-300 hover:scale-105 touch-manipulation"
                                >
                                    <Instagram className="w-4 sm:w-5 h-4 sm:h-5" />
                                    <span className="font-medium text-sm sm:text-base">Instagram</span>
                                </a>
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
                            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                                <Clock className="w-4 h-4" style={{ color: '#D5DD48' }} />
                                <h3 className="text-base sm:text-lg font-medium text-gray-800">Öffnungszeiten</h3>
                            </div>
                            <div className="space-y-2 sm:space-y-2">
                                {openingHours.map((schedule) => (
                                    <div key={schedule.day} className="flex justify-between items-center py-1 sm:py-1.5 border-b border-gray-100 last:border-b-0">
                                        <span className="text-xs sm:text-sm text-gray-600 font-light">{schedule.day}</span>
                                        <span className={`text-xs sm:text-sm ${schedule.hours === 'Geschlossen' ? 'text-red-500' : 'text-gray-800'} font-medium`}>
                                            {schedule.hours}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Map */}
                    <div className={`transition-all duration-800 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

                        {/* Maps Widget */}
                        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg h-full flex flex-col">
                            <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Standort</h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-4 font-light">{contactInfo.address}</p>
                            <div className="relative w-full flex-1 rounded overflow-hidden" style={{ minHeight: '300px' }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2728.123456789!2d15.7123456!3d46.7123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDQyJzQ0LjQiTiAxNcKwNDInNDQuNCJF!5e0!3m2!1sde!2sat!4v1234567890123!5m2!1sde!2sat"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="blickfang Nagelstudio Standort"
                                    className="rounded"
                                ></iframe>
                            </div>

                            {/* Mobile Map Link */}
                            <div className="mt-4 sm:hidden">
                                <a
                                    href={`https://www.google.com/maps/search/${encodeURIComponent(contactInfo.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg p-3 transition-all duration-300 touch-manipulation"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="font-medium text-sm">In Maps öffnen</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;