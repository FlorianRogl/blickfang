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
            className="relative py-16 overflow-hidden"
            style={{ backgroundColor: '#F5F4F0' }}
        >
            {/* Decorative Line */}
            <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(213, 221, 72, 0.3) 50%, transparent 100%)'
                }}
            ></div>

            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <h2 className="text-5xl font-thin text-gray-800 mb-8 leading-tight relative">
                        Kontakt
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-2 opacity-70 rounded-full mt-4" style={{ backgroundColor: '#D5DD48' }}></div>
                    </h2>
                    <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Besuchen Sie uns in unserem Studio in St. Veit am Vogau oder kontaktieren Sie uns.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Left Column - Contact Info */}
                    <div className={`space-y-6 transition-all duration-800 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

                        {/* Contact Methods */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Phone */}
                            <div className="bg-white rounded-lg p-6 shadow-lg">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="rounded p-3" style={{ backgroundColor: '#D5DD48' }}>
                                        <Phone className="w-6 h-6 text-gray-800" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-800">Telefon</h3>
                                </div>
                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="text-base font-light transition-colors duration-300 block mb-2"
                                    style={{ color: '#D5DD48' }}
                                >
                                    {contactInfo.phone}
                                </a>
                                <span className="text-sm text-gray-500">Rufen Sie uns an</span>
                            </div>

                            {/* Email */}
                            <div className="bg-white rounded-lg p-6 shadow-lg">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="rounded p-3" style={{ backgroundColor: '#D5DD48' }}>
                                        <Mail className="w-6 h-6 text-gray-800" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-800">E-Mail</h3>
                                </div>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="text-base font-light transition-colors duration-300 block mb-2 break-all"
                                    style={{ color: '#D5DD48' }}
                                >
                                    {contactInfo.email}
                                </a>
                                <span className="text-sm text-gray-500">Für Anfragen</span>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Social Media & Chat</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* WhatsApp */}
                                <a
                                    href={`https://wa.me/${contactInfo.phone.replace(/\s+/g, '').replace('+', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 transition-all duration-300"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="font-medium">WhatsApp</span>
                                </a>

                                {/* Instagram */}
                                <a
                                    href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-3 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-3 transition-all duration-300"
                                >
                                    <Instagram className="w-5 h-5" />
                                    <span className="font-medium">Instagram</span>
                                </a>
                            </div>
                        </div>

                        {/* Opening Hours */}
                        <div className="bg-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center space-x-2 mb-3">
                                <Clock className="w-4 h-4" style={{ color: '#D5DD48' }} />
                                <h3 className="text-base font-medium text-gray-800">Öffnungszeiten</h3>
                            </div>
                            <div className="space-y-1">
                                {openingHours.map((schedule) => (
                                    <div key={schedule.day} className="flex justify-between items-center py-0.5 border-b border-gray-100 last:border-b-0">
                                        <span className="text-xs text-gray-600">{schedule.day}</span>
                                        <span className={`text-xs ${schedule.hours === 'Geschlossen' ? 'text-red-500' : 'text-gray-800'} font-medium`}>
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
                        <div className="bg-white rounded-lg p-6 shadow-lg h-full flex flex-col">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Standort</h3>
                            <p className="text-gray-600 mb-4 font-light">{contactInfo.address}</p>
                            <div className="relative w-full flex-1 rounded overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2728.123456789!2d15.7123456!3d46.7123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDQyJzQ0LjQiTiAxNcKwNDInNDQuNCJF!5e0!3m2!1sde!2sat!4v1234567890123!5m2!1sde!2sat"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="blickfang Nagelstudio Standort"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;