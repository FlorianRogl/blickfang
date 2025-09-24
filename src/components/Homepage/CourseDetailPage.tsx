import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Clock,
    Users,
    Award,
    CheckCircle,
    Star
} from 'lucide-react';

interface Course {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
    image: string;
    duration: string;
    participants: string;
    level: string;
    price: string;
    description: string;
    short_description: string;
    detailed_content: {
        title: string;
        items: string[];
    }[];
}

const CourseDetailPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleNavigation = () => {
        console.log('Navigation zurück zur Homepage');
        navigate('/'); // Navigiert zur Homepage
    };

    // Kursdaten
    const courses: Course[] = [
        {
            id: 1,
            title: "Gel-Nails Grundkurs",
            subtitle: "Für Einsteiger",
            slug: "gel-nails-grundkurs",
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
            duration: "6 Stunden",
            participants: "Max. 8 Personen",
            level: "Anfänger",
            price: "299€",
            description: "Lernen Sie die Grundlagen der Gel-Nail Technik von Grund auf. Perfekt für Einsteiger, die professionelle Gel-Nägel erstellen möchten. In diesem umfassenden Kurs werden Sie alle wichtigen Techniken erlernen und praktische Erfahrungen sammeln.",
            short_description: "Lernen Sie die Grundlagen der professionellen Gel-Nail Technik. Von der Nagelvorbereitung bis zur perfekten Versiegelung - alles was Sie für den erfolgreichen Einstieg brauchen.",
            detailed_content: [
                {
                    title: "Theorie & Grundlagen",
                    items: ["Nagelaufbau verstehen", "Produktkunde", "Hygiene & Sicherheit", "Werkzeugkunde"]
                },
                {
                    title: "Praktische Techniken",
                    items: ["Nagelvorbereitung", "Gel-Auftrag", "Formgebung", "Versiegelung"]
                },
                {
                    title: "Finishing & Pflege",
                    items: ["Nachbehandlung", "Pflegetipps", "Reparaturen", "Entfernung"]
                },
                {
                    title: "Design & Farblehre",
                    items: ["Farbkombinationen", "French Manicure", "Einfache Muster", "Glitzer-Techniken"]
                },
                {
                    title: "Problemlösungen",
                    items: ["Häufige Fehler", "Reparatur-Methoden", "Haltbarkeit optimieren", "Kundenberatung"]
                },
                {
                    title: "Business Tipps",
                    items: ["Preisgestaltung", "Zeitmanagement", "Kundengespräche", "Weiterbildung"]
                }
            ]
        },
        {
            id: 2,
            title: "Nail Art Masterclass",
            subtitle: "Kreative Designs",
            slug: "nail-art-masterclass",
            image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
            duration: "8 Stunden",
            participants: "Max. 6 Personen",
            level: "Fortgeschritten",
            price: "399€",
            description: "Erweitern Sie Ihre Fähigkeiten mit fortgeschrittenen Nail Art Techniken. Von geometrischen Mustern bis zu floralen Designs - werden Sie zum wahren Nail Art Künstler.",
            short_description: "Erweitern Sie Ihre Fähigkeiten mit fortgeschrittenen Nail Art Techniken. Von komplexen Mustern bis zu 3D-Effekten - perfekt für kreative Köpfe.",
            detailed_content: [
                {
                    title: "Design Grundlagen",
                    items: ["Farbtheorie", "Komposition", "Trends & Styles", "Inspiration finden"]
                },
                {
                    title: "Fortgeschrittene Techniken",
                    items: ["3D Effekte", "Stamping", "Airbrush", "Hand-Painting"]
                },
                {
                    title: "Spezial Effekte",
                    items: ["Glitter & Folie", "Ombre Techniken", "Marble Effects", "Texturierung"]
                },
                {
                    title: "Kreative Muster",
                    items: ["Geometrische Designs", "Florale Motive", "Abstract Art", "Seasonal Trends"]
                },
                {
                    title: "Profi-Techniken",
                    items: ["Encapsulated Nails", "Chrome Effects", "Watercolor Art", "Negative Space"]
                },
                {
                    title: "Portfolio & Präsentation",
                    items: ["Fotografie Tipps", "Social Media", "Kundenakquise", "Preis-Premium"]
                }
            ]
        },
        {
            id: 3,
            title: "Salon Business Kurs",
            subtitle: "Selbstständigkeit",
            slug: "salon-business-kurs",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
            duration: "4 Stunden",
            participants: "Max. 10 Personen",
            level: "Alle Level",
            price: "199€",
            description: "Alles was Sie wissen müssen, um Ihr eigenes Nagelstudio zu eröffnen. Von der Businessplanung bis zur erfolgreichen Umsetzung und Kundengewinnung.",
            short_description: "Der komplette Leitfaden zur Salon-Gründung. Von der Businessplanung über Marketing bis zur rechtlichen Absicherung - alles für Ihren erfolgreichen Start.",
            detailed_content: [
                {
                    title: "Business Grundlagen",
                    items: ["Businessplan erstellen", "Finanzplanung", "Standortanalyse", "Zielgruppenbestimmung"]
                },
                {
                    title: "Marketing & Vertrieb",
                    items: ["Social Media Marketing", "Kundengewinnung", "Preisstrategien", "Branding"]
                },
                {
                    title: "Rechtliches & Organisation",
                    items: ["Gewerbeanmeldung", "Versicherungen", "Hygieneverordnungen", "Terminmanagement"]
                },
                {
                    title: "Finanzmanagement",
                    items: ["Buchhaltung Basics", "Steuern & Abgaben", "Kostenplanung", "Gewinnoptimierung"]
                },
                {
                    title: "Kundenservice",
                    items: ["Beratungsgespräche", "Beschwerdemanagement", "Kundenbindung", "Servicequalität"]
                },
                {
                    title: "Wachstumsstrategien",
                    items: ["Expansion planen", "Personal einstellen", "Franchising", "Online-Geschäft"]
                }
            ]
        }
    ];

    // Aktuell ausgewählten Kurs verwenden
    const course = courses[0]; // Zeige immer den ersten Kurs

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4" style={{ paddingTop: '6rem' }}>
                <div className="text-center bg-white rounded-2xl p-6 sm:p-8 shadow-xl w-full max-w-md">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Kurs nicht gefunden</h1>
                    <button
                        onClick={handleNavigation}
                        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                    >
                        Zurück zur Homepage
                    </button>
                </div>
            </div>
        );
    }

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.currentTarget;
        target.src = `data:image/svg+xml;base64,${btoa(`<svg width="1200" height="600" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="600" fill="url(#gradient)"/><defs><linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#D5DD48" stop-opacity="0.8"/><stop offset="1" stop-color="#A8B536" stop-opacity="0.6"/></linearGradient></defs></svg>`)}`;
    };

    const handleBookingClick = () => {
        const recipientEmail = "anmeldung@nagelstudio.de";
        const subject = encodeURIComponent(`Anmeldung für ${course.title}`);
        const emailBody = encodeURIComponent(`Hallo,

hiermit möchte ich mich für den folgenden Kurs anmelden:

Kurs: ${course.title}
Untertitel: ${course.subtitle}
Dauer: ${course.duration}
Preis: ${course.price}
Level: ${course.level}
Max. Teilnehmer: ${course.participants}

Bitte senden Sie mir weitere Informationen zu:
- Verfügbaren Terminen
- Zahlungsmodalitäten
- Kursort und Anfahrt

Meine Kontaktdaten:
Name: [Bitte ausfüllen]
Telefon: [Bitte ausfüllen]
Erfahrungslevel: [Bitte ausfüllen]

Vielen Dank und beste Grüße`);

        const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${emailBody}`;
        window.location.href = mailtoUrl;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
            {/* Main Content */}
            <div style={{ paddingTop: '6rem' }} className="sm:pt-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

                        {/* Zurück Button */}
                        <button
                            onClick={handleNavigation}
                            className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 text-gray-700 hover:text-gray-900 transition-all duration-300 mb-6 sm:mb-8 group hover:scale-105 touch-manipulation"
                            style={{ color: '#A8B536' }}
                        >
                            <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                            <span className="font-medium text-sm sm:text-base">Zurück zu den Kursen</span>
                        </button>

                        {/* Main Content Grid */}
                        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">

                            {/* Linke Spalte: Content */}
                            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">

                                {/* Kursname */}
                                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-900 mb-4 sm:mb-6 leading-tight hover:text-gray-700 transition-colors duration-300">
                                        {course.title}
                                    </h1>

                                    {/* Rating */}
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4 sm:mb-6">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400 fill-current hover:scale-110 transition-transform duration-200"
                                                    style={{ animationDelay: `${i * 0.1}s` }}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm sm:text-base text-gray-600 font-light">4.9 (127 Bewertungen)</span>
                                    </div>
                                </div>

                                {/* Kurze Beschreibung */}
                                <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
                                        {course.short_description}
                                    </p>
                                </div>

                                {/* Kurs Details */}
                                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                                    <div className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-200">
                                        <Clock className="w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-12 transition-transform duration-300" style={{ color: '#D5DD48' }} />
                                        <span className="text-sm sm:text-base text-gray-700 font-light">{course.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-200">
                                        <Users className="w-4 sm:w-5 h-4 sm:h-5 group-hover:scale-110 transition-transform duration-300" style={{ color: '#D5DD48' }} />
                                        <span className="text-sm sm:text-base text-gray-700 font-light">{course.participants}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-200">
                                        <Award className="w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-12 transition-transform duration-300" style={{ color: '#D5DD48' }} />
                                        <span className="text-sm sm:text-base text-gray-700 font-light">{course.level}</span>
                                    </div>
                                </div>

                                {/* Anmelde Button */}
                                <div className="pt-2 sm:pt-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                                    <button
                                        onClick={handleBookingClick}
                                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-gray-800 font-semibold text-base sm:text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 group touch-manipulation"
                                        style={{ backgroundColor: '#D5DD48' }}
                                    >
                                        <span className="group-hover:mr-2 transition-all duration-300">Jetzt anmelden - {course.price}</span>
                                        <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 ml-2 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" />
                                    </button>
                                </div>
                            </div>

                            {/* Rechte Spalte: Bild */}
                            <div className="animate-fade-in-up order-1 lg:order-2" style={{ animationDelay: '0.3s' }}>
                                {/* Großes Bild */}
                                <div className="relative group">
                                    <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-xl group-hover:shadow-2xl transition-all duration-500 hover:scale-105">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl transition-all duration-500 group-hover:brightness-110"
                                            onError={handleImageError}
                                        />
                                        <div className="absolute inset-2 sm:inset-3 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kursmodule - Vollbreite Sektion */}
                        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                            <div className="text-center mb-6 sm:mb-8">
                                <h3 className="text-2xl sm:text-3xl font-thin text-gray-900 mb-3 sm:mb-4 hover:text-gray-700 transition-colors duration-300">Kursmodule</h3>
                                <div className="w-16 sm:w-20 h-1 mx-auto rounded-full transition-all duration-500 hover:w-24 sm:hover:w-32" style={{ backgroundColor: '#D5DD48' }}></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {course.detailed_content.map((section, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 group animate-fade-in-up touch-manipulation"
                                        style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                                    >
                                        <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                                            <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center text-white font-medium text-xs group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" style={{ backgroundColor: '#D5DD48' }}>
                                                {index + 1}
                                            </div>
                                            <h4 className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300">{section.title}</h4>
                                        </div>
                                        <div className="space-y-1">
                                            {section.items.map((item, itemIndex) => (
                                                <div key={itemIndex} className="flex items-center space-x-2 group/item hover:translate-x-1 transition-transform duration-200">
                                                    <CheckCircle className="w-3 sm:w-3.5 h-3 sm:h-3.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200" style={{ color: '#D5DD48' }} />
                                                    <span className="text-gray-700 font-light text-xs sm:text-sm group-hover/item:text-gray-900 transition-colors duration-200">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;