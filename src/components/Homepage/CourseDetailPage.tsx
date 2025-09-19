import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Clock,
    Users,
    Star,
    Calendar,
    BookOpen,
    CheckCircle,
    Award,
    Target,
    Zap
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
    features: string[];
    detailed_content: {
        title: string;
        items: string[];
    }[];
    what_you_learn: string[];
    includes: string[];
}

const CourseDetailPage: React.FC = () => {
    const { courseSlug } = useParams<{ courseSlug: string }>();
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const heroRef = useRef<HTMLDivElement>(null);

    // Kursdaten (sollten idealerweise aus einer API oder einem Store kommen)
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
            features: ["Gel-Auftrag Techniken", "Feilen & Formen", "UV-Lamp Härtung", "Basis & Top Coat", "Nagel Vorbereitung", "Pflege & Nachbehandlung"],
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
                }
            ],
            what_you_learn: [
                "Professionelle Gel-Nail Anwendung",
                "Korrekte Nagelvorbereitung",
                "Verschiedene Gel-Techniken",
                "Werkzeug- und Produktkunde",
                "Hygiene-Standards",
                "Troubleshooting bei Problemen"
            ],
            includes: [
                "Komplettes Starter-Kit",
                "Zertifikat nach Abschluss",
                "Nachbetreuung per E-Mail",
                "Übungsmaterialien",
                "Professionelle Anleitung",
                "Kleine Gruppengröße"
            ]
        },
        {
            id: 2,
            title: "Nail Art Masterclass",
            subtitle: "Kreative Designs",
            slug: "nail-art-masterclass",
            image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
            duration: "8 Stunden",
            participants: "Max. 6 Personen",
            level: "Fortgeschritten",
            price: "399€",
            description: "Erweitern Sie Ihre Fähigkeiten mit fortgeschrittenen Nail Art Techniken. Von geometrischen Mustern bis zu floralen Designs - werden Sie zum wahren Nail Art Künstler.",
            features: ["Komplexe Muster", "Farbverläufe", "3D Nail Art", "Stamping Techniken", "French Variationen", "Glitter & Effekte"],
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
                }
            ],
            what_you_learn: [
                "Komplexe Nail Art Designs",
                "Professionelle Stamping Technik",
                "3D Nail Art Elemente",
                "Farbverläufe & Ombre",
                "Kreative Problemlösung",
                "Trend-bewusste Gestaltung"
            ],
            includes: [
                "Premium Art-Kit",
                "Masterclass Zertifikat",
                "Design Vorlagen",
                "Video-Tutorials",
                "1-zu-1 Betreuung",
                "Follow-up Session"
            ]
        },
        {
            id: 3,
            title: "Salon Business Kurs",
            subtitle: "Selbstständigkeit",
            slug: "salon-business-kurs",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
            duration: "4 Stunden",
            participants: "Max. 10 Personen",
            level: "Alle Level",
            price: "199€",
            description: "Alles was Sie wissen müssen, um Ihr eigenes Nagelstudio zu eröffnen. Von der Businessplanung bis zur erfolgreichen Umsetzung und Kundengewinnung.",
            features: ["Business Planung", "Marketing Strategien", "Preisgestaltung", "Kundengewinnung", "Rechtliche Grundlagen", "Salon Einrichtung"],
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
                }
            ],
            what_you_learn: [
                "Erfolgreiche Salon-Gründung",
                "Effektive Marketing-Strategien",
                "Professionelle Preisgestaltung",
                "Rechtliche Sicherheit",
                "Kundenmanagement",
                "Nachhaltiges Wachstum"
            ],
            includes: [
                "Business Plan Template",
                "Marketing Checklisten",
                "Rechtliche Dokumente",
                "1-Jahr E-Mail Support",
                "Netzwerk-Zugang",
                "Bonus: Website Template"
            ]
        }
    ];

    // Kurs basierend auf Slug finden
    const course = courses.find(c => c.slug === courseSlug);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [courseSlug]);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20" style={{ backgroundColor: '#F2F1ED' }}>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Kurs nicht gefunden</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 rounded-xl text-gray-800 font-semibold hover:shadow-lg transition-all duration-200"
                        style={{ backgroundColor: '#D5DD48' }}
                    >
                        Zurück zur Homepage
                    </button>
                </div>
            </div>
        );
    }

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.currentTarget;
        target.src = `data:image/svg+xml;base64,${btoa(`<svg width="1200" height="600" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="600" fill="url(#gradient)"/><defs><linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#D5DD48" stop-opacity="0.8"/><stop offset="1" stop-color="#C5DD38" stop-opacity="0.6"/></linearGradient></defs></svg>`)}`;
    };

    const handleBookingClick = () => {
        // E-Mail-Daten zusammenstellen
        const recipientEmail = "anmeldung@nagelstudio.de"; // Hier Ihre E-Mail-Adresse eintragen
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

        // E-Mail-Programm öffnen
        const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${emailBody}`;
        window.location.href = mailtoUrl;
    };

    const handleConsultationClick = () => {
        // Beratungs-E-Mail
        const recipientEmail = "beratung@nagelstudio.de"; // Hier Ihre E-Mail-Adresse eintragen
        const subject = encodeURIComponent(`Beratungstermin für ${course.title}`);

        const emailBody = encodeURIComponent(`Hallo,

ich interessiere mich für den Kurs "${course.title}" und würde gerne einen unverbindlichen Beratungstermin vereinbaren.

Kurs: ${course.title}
Preis: ${course.price}

Ich hätte folgende Fragen:
- [Ihre Fragen hier eintragen]

Für einen Beratungstermin bin ich verfügbar:
- [Ihre bevorzugten Zeiten hier eintragen]

Meine Kontaktdaten:
Name: [Bitte ausfüllen]
Telefon: [Bitte ausfüllen]
E-Mail: [Bitte ausfüllen]

Vielen Dank und beste Grüße`);

        const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${emailBody}`;
        window.location.href = mailtoUrl;
    };

    return (
        <div className="min-h-screen pt-32" style={{ backgroundColor: '#F2F1ED' }}>
            {/* Back Button - Oben auf der Seite */}
            <div className="pt-6">
                <div className="container mx-auto px-6">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl border transition-all duration-200 hover:shadow-lg"
                        style={{ borderColor: 'rgba(213, 221, 72, 0.3)' }}
                    >
                        <ArrowLeft className="w-4 h-4" style={{ color: '#A8B536' }} />
                        <span className="text-gray-700 font-medium">Zurück zur Homepage</span>
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <section ref={heroRef} className="relative py-12">
                <div className="container mx-auto px-6">
                    <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

                        {/* Content */}
                        <div className="space-y-8">
                            <div>
                                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(213, 221, 72, 0.1)' }}>
                                    <BookOpen className="w-4 h-4" style={{ color: '#D5DD48' }} />
                                    <span className="text-sm font-medium" style={{ color: '#A8B536' }}>{course.subtitle}</span>
                                </div>

                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-thin text-gray-800 mb-4 leading-tight">
                                    {course.title}
                                </h1>

                                <p className="text-base text-gray-600 leading-relaxed mb-6 font-light">
                                    {course.description}
                                </p>

                                {/* Rating */}
                                <div className="flex items-center space-x-2 mb-6">
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-gray-600">4.9 (127 Bewertungen)</span>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-white rounded-xl border hover:shadow-md transition-all duration-200" style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}>
                                    <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: '#D5DD48' }} />
                                    <div className="text-xs font-medium text-gray-800">{course.duration}</div>
                                    <div className="text-xs text-gray-500">Dauer</div>
                                </div>

                                <div className="text-center p-4 bg-white rounded-xl border hover:shadow-md transition-all duration-200" style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}>
                                    <Users className="w-6 h-6 mx-auto mb-2" style={{ color: '#D5DD48' }} />
                                    <div className="text-xs font-medium text-gray-800">{course.participants}</div>
                                    <div className="text-xs text-gray-500">Teilnehmer</div>
                                </div>

                                <div className="text-center p-4 bg-white rounded-xl border hover:shadow-md transition-all duration-200" style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}>
                                    <Award className="w-6 h-6 mx-auto mb-2" style={{ color: '#D5DD48' }} />
                                    <div className="text-xs font-medium text-gray-800">{course.level}</div>
                                    <div className="text-xs text-gray-500">Level</div>
                                </div>

                                <div className="text-center p-4 bg-white rounded-xl border hover:shadow-md transition-all duration-200" style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}>
                                    <Target className="w-6 h-6 mx-auto mb-2" style={{ color: '#D5DD48' }} />
                                    <div className="text-xs font-medium text-gray-800">{course.price}</div>
                                    <div className="text-xs text-gray-500">Preis</div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleBookingClick}
                                    className="flex-1 sm:flex-none px-8 py-4 text-gray-800 font-bold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg hover:scale-105"
                                    style={{ backgroundColor: '#D5DD48' }}
                                >
                                    <Calendar className="w-5 h-5" />
                                    <span>Jetzt anmelden</span>
                                </button>

                                <button
                                    onClick={handleConsultationClick}
                                    className="px-8 py-4 border-2 text-gray-800 font-semibold rounded-xl transition-all duration-200 hover:bg-white hover:shadow-md"
                                    style={{ borderColor: '#D5DD48' }}
                                >
                                    Beratungstermin
                                </button>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-96 lg:h-[500px] object-cover"
                                    onError={handleImageError}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You'll Learn */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Learning Outcomes */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-lg sm:text-xl font-thin text-gray-800 mb-6">
                                    Was Sie lernen werden
                                </h2>
                                <div className="space-y-4">
                                    {course.what_you_learn.map((item, index) => (
                                        <div key={index} className="flex items-start space-x-3 group">
                                            <CheckCircle className="w-6 h-6 mt-0.5 flex-shrink-0 transition-all duration-200 group-hover:scale-110" style={{ color: '#D5DD48' }} />
                                            <span className="text-base text-gray-700 leading-relaxed font-light">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Course Includes */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-lg sm:text-xl font-thin text-gray-800 mb-6">
                                    Im Kurs enthalten
                                </h2>
                                <div className="space-y-4">
                                    {course.includes.map((item, index) => (
                                        <div key={index} className="flex items-start space-x-3 group">
                                            <Zap className="w-6 h-6 mt-0.5 flex-shrink-0 transition-all duration-200 group-hover:scale-110" style={{ color: '#D5DD48' }} />
                                            <span className="text-sm text-gray-700 leading-relaxed font-light">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CourseDetailPage;