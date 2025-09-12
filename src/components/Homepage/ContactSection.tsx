import {useState, useEffect, useRef} from 'react';
import {
    MapPin,
    Phone,
    Instagram,
    Facebook,
    MessageCircle,
    Calendar,
    Navigation
} from 'lucide-react';

const ContactSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {threshold: 0.2}
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
        instagram: '@blickfang_nagelstudio',
        facebook: 'blickfang.nagelstudio'
    };

    return (
        <section
            ref={sectionRef}
            className="py-16 bg-gray-50"
        >
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section Header */}
                <div
                    className={`text-center mb-12 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <h2 className="text-4xl font-bold text-green-800 mb-4">
                        Besuchen Sie uns in Vogau
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Moderne Nagelpflege in zentraler Lage - wir freuen uns auf Ihren Besuch
                    </p>
                </div>

                {/* Map Section - Full Width */}
                <div
                    className={`mb-12 transition-all duration-800 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2786.7!2d15.766667!3d46.708611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f4a8a8a8a8a8a%3A0x8a8a8a8a8a8a8a8a!2s8480%20Mureck%2C%20Austria!5e0!3m2!1sen!2sat!4v1234567890123"
                                width="100%"
                                height="400"
                                style={{border: 0}}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>

                            {/* Overlay Info Card */}
                            <div
                                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-sm">
                                <div className="flex items-start space-x-3">
                                    <div className="bg-green-600 rounded-lg p-2">
                                        <MapPin className="w-5 h-5 text-white"/>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">blickfang Nagelstudio</h3>
                                        <p className="text-gray-600 text-sm mb-3">{contactInfo.address}</p>
                                        <a
                                            href="https://goo.gl/maps/your-actual-map-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                                        >
                                            <Navigation className="w-4 h-4"/>
                                            <span>Route planen</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Bar - Horizontal Layout */}
                <div
                    className={`grid lg:grid-cols-4 gap-6 mb-12 transition-all duration-800 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

                    {/* Contact Info */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                            <Phone className="w-5 h-5 text-green-600 mr-2"/>
                            Kontakt & Terminbuchung
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <div className="text-sm font-medium text-gray-500 mb-1">Telefon</div>
                                <a href={`tel:${contactInfo.phone}`}
                                   className="text-green-600 hover:text-green-700 transition-colors font-medium">
                                    {contactInfo.phone}
                                </a>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500 mb-1">E-Mail</div>
                                <a href={`mailto:${contactInfo.email}`}
                                   className="text-green-600 hover:text-green-700 transition-colors font-medium">
                                    {contactInfo.email}
                                </a>
                            </div>
                        </div>

                        <a
                            href={`tel:${contactInfo.phone}`}
                            className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                        >
                            <Calendar className="w-5 h-5"/>
                            <span>Jetzt Termin vereinbaren</span>
                        </a>
                    </div>

                    {/* Social Media */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold text-green-800 mb-4">
                            Folgen Sie uns
                        </h3>

                        <div className="space-y-3 mb-4">
                            <a
                                href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                                <div className="bg-pink-500 p-2 rounded-lg group-hover:bg-pink-600 transition-colors">
                                    <Instagram className="w-4 h-4 text-white"/>
                                </div>
                                <span className="text-gray-700 font-medium">Instagram</span>
                            </a>

                            <a
                                href={`https://facebook.com/${contactInfo.facebook}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                                <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                                    <Facebook className="w-4 h-4 text-white"/>
                                </div>
                                <span className="text-gray-700 font-medium">Facebook</span>
                            </a>
                        </div>

                        <a
                            href={`https://wa.me/${contactInfo.phone.replace(/\s+/g, '').replace('+', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-green-500 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                        >
                            <MessageCircle className="w-5 h-5"/>
                            <span>WhatsApp</span>
                        </a>
                    </div>

                    {/* Quick Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold text-green-800 mb-4">
                            Schnellinfos
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-700">Termine nach Vereinbarung</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-700">Kostenlose Beratung</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-700">Premium Produkte</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-700">Parkplätze vorhanden</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modern Opening Hours */}

            </div>
        </section>
    );
};

export default ContactSection;