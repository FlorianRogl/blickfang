import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowLeft,
    Clock,
    Users,
    Award,
    CheckCircle,
    X
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

interface CartItem {
    courseTitle: string;
    variant: string;
    price: string;
    addedAt: number;
}

const CourseDetailPage: React.FC = () => {
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const snackbarTimerRef = useRef<NodeJS.Timeout | null>(null);
    const courseSlug = "gel-nails-grundkurs";

    const handleNavigation = () => {
        window.history.back();
    };

    const courses: Course[] = [
        {
            id: 1,
            title: "Nageldesign Basiskurs",
            subtitle: "Für Einsteiger",
            slug: "gel-nails-grundkurs",
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600&q=80",
            duration: "45 Stunden",
            participants: "Max. 3 Personen",
            level: "Anfänger und Fortgeschrittene",
            price: "ab 1.269€",
            description: "Im Nageldesign Basiskurs erhältst du alle wichtigen Grundlagen, um von Anfang an saubere und professionelle Ergebnisse zu erzielen – ideal für Anfänger sowie für alle, die schon bisherige Erfahrung haben und ihr Wissen auf professionelles Niveau bringen möchten.",
            short_description: "In meinen Kursen begleite ich dich Schritt für Schritt und gehe individuell auf deine Fragen ein. Mir ist wichtig, dass du dich gut aufgehoben fühlst und mit Freude lernst. Mit meiner Erfahrung unterstütze ich dich dabei, deine Fähigkeiten auszubauen und dein Ziel sicher zu erreichen.",
            detailed_content: [
                {
                    title: "Grundlagen, Anatomie & Hygiene",
                    items: [
                        "Aufbau und Funktionen des Naturnagels",
                        "Typische Veränderungen und häufige Nagelprobleme",
                        "Verschiedene Nagelhaut-Typen und ihre Besonderheiten",
                        "Hygienestandards: Desinfektion und Sterilisation",
                        "Fachgerechter Umgang mit LED-/UV-Lampe",
                        "Handhabung und Einsatz von Fräser-Bits"
                    ]
                },
                {
                    title: "Materialien & Feiltechniken",
                    items: [
                        "Überblick über verschiedene Gele (selbstglättend, Mousse-, Gelee- und Acrylgel, Rubber Base, Builder in Bottle)",
                        "Produkte für die Nagelvorbereitung: Nail Prep, Primer und Base",
                        "Bedeutung von Apex, Kurven und Achsen im Nageldesign",
                        "Feiltechniken mit der Handfeile",
                        "Feiltechniken mit dem Fräser",
                        "Schablonen richtig auswählen und anpassen",
                        "Korrektes Zuschneiden und Anlegen der Schablone",
                        "Wichtige Grundlagen zu Haftung und Liftings"
                    ]
                },
                {
                    title: "Maniküre, Refill & Nagelgestaltung",
                    items: [
                        "Russische Maniküre und sauberes Arbeiten am Nagelrand",
                        "UV-Lack- und Rubber-Base-Maniküre",
                        "Refill mit Korrektur der Nagelarchitektur",
                        "Refill mit aktuellen Techniken (z. B. Dual Tips, Hybrid-Technik inkl. No-File)",
                        "Verschiedene Nagelformen: eckig, oval, klassisch, mandelförmig",
                        "Farbauftrag unter die Nagelhaut",
                        "French- und Babyboomer-Techniken",
                        "Basis-Designs und kreative Varianten"
                    ]
                },
                {
                    title: "Social Media & Marketing",
                    items: [
                        "Tipps für professionelle Fotos und geeignete Bearbeitungs-Apps",
                        "Strategien für erfolgreiche Posts (wo, wann und wie)",
                        "Auswahl eines passenden und einprägsamen Namens"
                    ]
                }
            ]
        }
    ];

    const course = courses.find(c => c.slug === courseSlug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        return () => {
            // Cleanup timer on unmount
            if (snackbarTimerRef.current) {
                clearTimeout(snackbarTimerRef.current);
            }
        };
    }, []);

    const addToCart = (variant: string, price: string) => {
        if (!course) return;

        const cartItem: CartItem = {
            courseTitle: course.title,
            variant: variant,
            price: price,
            addedAt: Date.now()
        };

        // Dispatch custom event to notify navbar
        const event = new CustomEvent('addToCart', { detail: cartItem });
        window.dispatchEvent(event);

        // Clear any existing timer
        if (snackbarTimerRef.current) {
            clearTimeout(snackbarTimerRef.current);
        }

        // Show snackbar
        setSnackbarMessage(`${variant} wurde zum Warenkorb hinzugefügt!`);
        setShowSnackbar(true);

        // Hide snackbar after exactly 3 seconds
        snackbarTimerRef.current = setTimeout(() => {
            setShowSnackbar(false);
            snackbarTimerRef.current = null;
        }, 1500);
    };

    const handleBookingClick = (variant: string, price: string) => {
        addToCart(variant, price);
    };

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F2F1ED', paddingTop: '6rem' }}>
                <div className="text-center bg-white p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Kurs nicht gefunden</h1>
                    <button
                        onClick={handleNavigation}
                        className="w-full px-6 py-3 text-gray-900 font-semibold"
                        style={{ backgroundColor: '#D5DD48' }}
                    >
                        Zurück zur Homepage
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F2F1ED' }}>
            {/* Snackbar */}
            <div
                className={`fixed top-24 right-4 z-50 transition-all duration-300 transform ${
                    showSnackbar ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}
            >
                <div className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3 min-w-[320px]"
                     style={{ border: '2px solid #D5DD48' }}>
                    <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#D5DD48' }} />
                    <p className="text-sm font-light text-gray-900 flex-1">{snackbarMessage}</p>
                    <button
                        onClick={() => {
                            if (snackbarTimerRef.current) {
                                clearTimeout(snackbarTimerRef.current);
                                snackbarTimerRef.current = null;
                            }
                            setShowSnackbar(false);
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-all"
                    >
                        <X className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>

            <div className="relative h-[58vh] lg:h-[62vh]" style={{ marginTop: '0' }}>
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute" style={{ top: '8.5rem', left: '2rem' }}>
                    <button
                        onClick={handleNavigation}
                        className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                        style={{
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                        }}
                    >
                        <ArrowLeft className="w-5 h-5" style={{ color: '#ffffff' }} />
                        <span className="font-medium text-sm" style={{ color: '#ffffff' }}>Zurück</span>
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                        <div className="max-w-3xl">
                            <div className="inline-block px-4 py-1 mb-4" style={{ backgroundColor: '#D5DD48' }}>
                                <span className="text-sm font-light" style={{ color: 'rgba(0, 0, 0, 1)' }}>{course.subtitle}</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-lg text-white/90 font-light leading-relaxed">
                                {course.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="relative mb-16 overflow-hidden rounded-2xl bg-white shadow-sm">
                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
                        <div className="text-center">
                            <Clock className="w-12 h-12 mx-auto mb-3" style={{ color: '#A8B536' }} />
                            <div className="text-sm uppercase tracking-wider text-gray-500 mb-1 font-light">Dauer</div>
                            <div className="text-2xl font-light text-gray-900">{course.duration}</div>
                        </div>
                        <div className="text-center">
                            <Users className="w-12 h-12 mx-auto mb-3" style={{ color: '#A8B536' }} />
                            <div className="text-sm uppercase tracking-wider text-gray-500 mb-1 font-light">Teilnehmer</div>
                            <div className="text-2xl font-light text-gray-900">{course.participants}</div>
                        </div>
                        <div className="text-center">
                            <Award className="w-12 h-12 mx-auto mb-3" style={{ color: '#A8B536' }} />
                            <div className="text-sm uppercase tracking-wider text-gray-500 mb-1 font-light">Level</div>
                            <div className="text-2xl font-light text-gray-900">{course.level}</div>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className="absolute -left-4 top-0 w-1 h-full" style={{ backgroundColor: '#D5DD48' }}></div>
                            <blockquote className="pl-12 py-6">
                                <p className="text-2xl sm:text-3xl font-light text-gray-900 leading-relaxed italic">
                                    "{course.short_description}"
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-4xl font-light text-gray-900 mb-12">
                        Kursmodule
                        <div className="w-24 h-1 mt-3" style={{ backgroundColor: '#D5DD48' }}></div>
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {course.detailed_content.map((module, moduleIdx) => {
                            const color = moduleIdx % 2 === 0 ? '#D5DD48' : '#A8B536';
                            return (
                                <div key={moduleIdx} className="bg-white p-8 border-t-4 rounded-lg shadow-sm" style={{ borderColor: color }}>
                                    <div className="flex items-baseline space-x-4 mb-6">
                                        <span className="text-5xl font-light" style={{ color }}>
                                            {String(moduleIdx + 1).padStart(2, '0')}
                                        </span>
                                        <h3 className="text-xl font-light text-gray-900 flex-1">
                                            Einheit {moduleIdx + 1} – {module.title}
                                        </h3>
                                    </div>
                                    <div className="space-y-2">
                                        {module.items.map((item, idx) => (
                                            <div key={idx} className="flex items-start space-x-3">
                                                <div className="w-1.5 h-1.5 mt-2 flex-shrink-0 rounded-full" style={{ backgroundColor: color }}></div>
                                                <span className="text-sm text-gray-700 font-light leading-relaxed">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mb-16 bg-white p-12 rounded-2xl shadow-sm">
                    <h2 className="text-4xl font-light text-gray-900 mb-12">
                        Abschluss & Zertifizierung
                        <div className="w-24 h-1 mt-3" style={{ backgroundColor: '#D5DD48' }}></div>
                    </h2>

                    <div className="relative">
                        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200"></div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#D5DD48' }}>
                                    <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-sm text-gray-700 font-light">Nach dem vierten Kurstag erhält jede Teilnehmerin ein Teilnahmezertifikat</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#A8B536' }}>
                                    <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-sm text-gray-700 font-light">Ein individueller Prüfungstag wird anschließend vereinbart</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#D5DD48' }}>
                                    <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-sm text-gray-700 font-light">Schriftliche und praktische Prüfung am Modell</p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#A8B536' }}>
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-sm text-gray-700 font-medium">Offizielles Zertifikat als Nageldesignerin</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-4xl font-light text-gray-900 mb-12">
                        Preisvarianten
                        <div className="w-24 h-1 mt-3" style={{ backgroundColor: '#D5DD48' }}></div>
                    </h2>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white p-12 rounded-2xl shadow-sm flex flex-col">
                            <div className="mb-8">
                                <div className="text-sm uppercase tracking-wider text-gray-500 mb-2 font-light">Basic</div>
                                <div className="text-5xl font-light text-gray-900 mb-1">1.269 €</div>
                            </div>

                            <div className="space-y-4 mb-12 flex-grow">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D5DD48' }} />
                                    <p className="text-sm text-gray-700 font-light">Enthält alle Kursunterlagen: Theorieheft und Arbeitsmaterialien werden in der Academy zur Verfügung gestellt</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D5DD48' }} />
                                    <p className="text-sm text-gray-700 font-light">Du brauchst nur deine Motivation mitzubringen</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleBookingClick('Basic', '1.269 €')}
                                className="w-full py-4 text-gray-700 font-light rounded-lg border-2 transition-all duration-500 hover:text-gray-900 hover:shadow-2xl hover:scale-[1.02]"
                                style={{ borderColor: '#D5DD48' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#D5DD48';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                Basic wählen
                            </button>
                        </div>

                        <div className="p-12 relative rounded-2xl flex flex-col bg-white border-2" style={{ borderColor: '#D5DD48' }}>
                            <div className="mb-8">
                                <div className="text-sm uppercase tracking-wider mb-2 font-light text-gray-500">
                                    Premium
                                    <span className="ml-2 text-xs px-2 py-1 rounded-full font-light"
                                          style={{ backgroundColor: '#D5DD48', color: '#374151' }}>
                                        Beliebte Wahl
                                    </span>
                                </div>
                                <div className="text-5xl font-light mb-1 text-gray-900">1.569 €</div>
                                <div className="text-sm font-light" style={{ color: '#A8B536' }}>Mit Starter-Set</div>
                            </div>

                            <div className="space-y-4 mb-12 flex-grow">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D5DD48' }} />
                                    <p className="text-sm font-light leading-relaxed text-gray-700">Zusätzlich zum Kurs erhältst du ein Starter-Set im Wert von ca. 300 €, inklusive UV-Lampe</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D5DD48' }} />
                                    <p className="text-sm font-light leading-relaxed text-gray-700">Perfekt für alle, die direkt durchstarten möchten</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleBookingClick('Premium', '1.569 €')}
                                className="w-full py-4 font-light rounded-lg border-2 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
                                style={{ borderColor: '#D5DD48', color: '#374151', backgroundColor: 'transparent' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#D5DD48';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                Premium wählen
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CourseDetailPage;