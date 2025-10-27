import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowLeft,
    Clock,
    Users,
    Award,
    CheckCircle,
    X,
    Sparkles
} from 'lucide-react';
import { getCourseBySlug, type Course, type CourseModule, type PricingVariant } from '../../../lib/sanity';

interface CartItem {
    courseTitle: string;
    variant: string;
    price: string;
    addedAt: number;
}

const FastTipsCourse: React.FC = () => {
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const snackbarTimerRef = useRef<NodeJS.Timeout | null>(null);
    const courseSlug = "fast-tips-dual-tips";

    const handleNavigation = () => {
        window.history.back();
    };

    // Kurs von Sanity laden
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourseBySlug(courseSlug);
                console.log('🔍 Geladene Kursdaten:', data);
                console.log('📦 Modules:', data?.modules);
                console.log('📋 ContentList:', data?.contentList);
                if (data) {
                    setCourse(data);
                } else {
                    setError('Kurs nicht gefunden');
                }
            } catch (error) {
                console.error('Fehler beim Laden des Kurses:', error);
                setError('Fehler beim Laden des Kurses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        return () => {
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

        const event = new CustomEvent('addToCart', { detail: cartItem });
        window.dispatchEvent(event);

        if (snackbarTimerRef.current) {
            clearTimeout(snackbarTimerRef.current);
        }

        setSnackbarMessage(`${variant} wurde zum Warenkorb hinzugefügt!`);
        setShowSnackbar(true);

        snackbarTimerRef.current = setTimeout(() => {
            setShowSnackbar(false);
            snackbarTimerRef.current = null;
        }, 1500);
    };

    const handleBookingClick = (variant: string, price: string) => {
        addToCart(variant, price);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F2F1ED', paddingTop: '6rem' }}>
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"
                         style={{ borderTopColor: '#D5DD48' }}></div>
                    <p className="mt-4 text-gray-600">Kurs wird geladen...</p>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F2F1ED', paddingTop: '6rem' }}>
                <div className="text-center bg-white p-8 w-full max-w-md rounded-xl shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Kurs nicht gefunden</h1>
                    <p className="text-gray-600 mb-6">Der Fast Tips Kurs konnte nicht geladen werden.</p>
                    <button
                        onClick={handleNavigation}
                        className="w-full px-6 py-3 text-gray-900 font-semibold rounded-lg transition-all hover:shadow-lg"
                        style={{ backgroundColor: '#D5DD48' }}
                    >
                        Zurück zur Homepage
                    </button>
                </div>
            </div>
        );
    }

    // ✅ NEUE LOGIK: Unterstützt beide Datenstrukturen
    const hasModules = course.modules && course.modules.length > 0;
    const hasContentList = course.contentList && course.contentList.length > 0;

    // Erstelle ein flaches Array von Items für die Anzeige
    const contentItems: string[] = hasModules
        ? course.modules!.flatMap((module: CourseModule) => module.items || [])
        : (hasContentList ? course.contentList! : []);

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F2F1ED' }}>
            {/* Snackbar */}
            <div
                className={`fixed top-20 sm:top-24 xl:top-20 2xl:top-24 right-4 z-50 transition-all duration-300 transform ${
                    showSnackbar ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}
            >
                <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 xl:p-3 2xl:p-4 flex items-center space-x-2 sm:space-x-3 xl:space-x-2 2xl:space-x-3 min-w-[280px] sm:min-w-[320px] xl:min-w-[280px] 2xl:min-w-[320px]"
                     style={{ border: '2px solid #D5DD48' }}>
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 flex-shrink-0" style={{ color: '#D5DD48' }} />
                    <p className="text-sm sm:text-base xl:text-sm 2xl:text-base font-light text-gray-900 flex-1">{snackbarMessage}</p>
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
                        <X className="w-4 h-4 sm:w-5 sm:h-5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5" />
                    </button>
                </div>
            </div>

            {/* Hero Image - KOMPAKTER: Kleinere Höhe für bessere Proportionen */}
            <div className="relative h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-[65vh] 2xl:h-[60vh] mt-24 sm:mt-20 md:mt-24 lg:mt-32 xl:mt-28 2xl:mt-32">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Back Button - VERBESSERT: Responsive Positionierung */}
                <div className="absolute top-4 sm:top-5 md:top-6 lg:top-8 left-4 sm:left-6 lg:left-8">
                    <button
                        onClick={handleNavigation}
                        className="inline-flex items-center space-x-1.5 sm:space-x-2 xl:space-x-1.5 2xl:space-x-2 px-3 sm:px-5 xl:px-4 2xl:px-5 py-2 sm:py-3 xl:py-2 2xl:py-3 rounded-lg transition-all duration-300 hover:scale-105"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5" style={{ color: '#ffffff' }} />
                        <span className="font-medium text-sm sm:text-base xl:text-sm 2xl:text-base" style={{ color: '#ffffff' }}>Zurück</span>
                    </button>
                </div>

                {/* Hero Content - VERBESSERT: Besseres Spacing */}
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="max-w-5xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 xl:pb-8 2xl:pb-12">
                        <div className="max-w-3xl">
                            <div className="inline-block px-3 sm:px-4 xl:px-3 2xl:px-4 py-1 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4" style={{ backgroundColor: '#D5DD48' }}>
                                <span className="text-sm sm:text-base xl:text-sm 2xl:text-base font-light" style={{ color: 'rgba(0, 0, 0, 1)' }}>{course.subtitle}</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-4xl 2xl:text-6xl font-light text-white mb-3 sm:mb-4 xl:mb-3 2xl:mb-4 leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-white/90 font-light leading-relaxed">
                                {course.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 xl:py-10 2xl:py-16">

                {/* Stats Box - VERBESSERT: 2x2 Grid auf Mobile */}
                <div className="relative mb-12 sm:mb-16 xl:mb-10 2xl:mb-16 overflow-hidden rounded-2xl xl:rounded-xl 2xl:rounded-2xl bg-white shadow-sm">
                    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 xl:gap-4 2xl:gap-6 p-6 sm:p-10 xl:p-6 2xl:p-10">
                        <div className="text-center">
                            <Clock className="w-10 h-10 sm:w-12 sm:h-12 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 mx-auto mb-2 sm:mb-3 xl:mb-2 2xl:mb-3" style={{ color: '#A8B536' }} />
                            <div className="text-sm sm:text-base xl:text-sm 2xl:text-base uppercase tracking-wider text-gray-500 mb-1 font-light">Dauer</div>
                            <div className="text-xl sm:text-2xl xl:text-lg 2xl:text-2xl font-light text-gray-900">{course.duration}</div>
                        </div>
                        <div className="text-center">
                            <Clock className="w-10 h-10 sm:w-12 sm:h-12 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 mx-auto mb-2 sm:mb-3 xl:mb-2 2xl:mb-3" style={{ color: '#A8B536' }} />
                            <div className="text-sm sm:text-base xl:text-sm 2xl:text-base uppercase tracking-wider text-gray-500 mb-1 font-light">Nächster Termin</div>
                            <div className="text-base sm:text-xl xl:text-base 2xl:text-xl font-light text-gray-900">{course.nextDate || 'Auf Anfrage'}</div>
                        </div>
                        <div className="text-center">
                            <Users className="w-10 h-10 sm:w-12 sm:h-12 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 mx-auto mb-2 sm:mb-3 xl:mb-2 2xl:mb-3" style={{ color: '#A8B536' }} />
                            <div className="text-sm sm:text-base xl:text-sm 2xl:text-base uppercase tracking-wider text-gray-500 mb-1 font-light">Teilnehmer</div>
                            <div className="text-xl sm:text-2xl xl:text-lg 2xl:text-2xl font-light text-gray-900">{course.participants}</div>
                        </div>
                        <div className="text-center">
                            <Award className="w-10 h-10 sm:w-12 sm:h-12 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 mx-auto mb-2 sm:mb-3 xl:mb-2 2xl:mb-3" style={{ color: '#A8B536' }} />
                            <div className="text-sm sm:text-base xl:text-sm 2xl:text-base uppercase tracking-wider text-gray-500 mb-1 font-light">Level</div>
                            <div className="text-base sm:text-xl xl:text-base 2xl:text-xl font-light text-gray-900">{course.level}</div>
                        </div>
                    </div>
                </div>

                {/* Quote - VERBESSERT: Bessere Mobile-Größen */}
                <div className="mb-12 sm:mb-16 xl:mb-10 2xl:mb-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className="absolute -left-2 sm:-left-4 top-0 w-0.5 sm:w-1 xl:w-0.5 2xl:w-1 h-full" style={{ backgroundColor: '#D5DD48' }}></div>
                            <blockquote className="pl-8 sm:pl-12 xl:pl-8 2xl:pl-12 py-4 sm:py-6 xl:py-4 2xl:py-6">
                                <p className="text-xl sm:text-2xl md:text-3xl xl:text-xl 2xl:text-3xl font-light text-gray-900 leading-relaxed italic">
                                    "{course.short_description}"
                                </p>
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Content Section - VERBESSERT: 2 Spalten auf Mobile */}
                {contentItems.length > 0 && (
                    <div className="mb-12 sm:mb-16 xl:mb-10 2xl:mb-16">
                        <h2 className="text-3xl sm:text-4xl xl:text-2xl 2xl:text-4xl font-light text-gray-900 mb-8 sm:mb-12 xl:mb-6 2xl:mb-12">
                            Kursinhalte
                            <div className="w-16 sm:w-24 xl:w-16 2xl:w-24 h-0.5 sm:h-1 xl:h-0.5 2xl:h-1 mt-2 sm:mt-3 xl:mt-2 2xl:mt-3" style={{ backgroundColor: '#D5DD48' }}></div>
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 xl:gap-3 2xl:gap-5">
                            {contentItems.map((item, idx) => {
                                const colorIndex = idx % 2;
                                const accentColor = colorIndex === 0 ? '#D5DD48' : '#A8B536';

                                return (
                                    <div
                                        key={idx}
                                        className="relative bg-white rounded-lg sm:rounded-xl xl:rounded-lg 2xl:rounded-xl overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl group"
                                        onMouseEnter={() => setHoveredCard(idx)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <div
                                            className="h-1 sm:h-1.5 xl:h-1 2xl:h-1.5 w-full transition-all duration-500"
                                            style={{
                                                backgroundColor: accentColor,
                                                transform: hoveredCard === idx ? 'scaleX(1)' : 'scaleX(0.4)',
                                                transformOrigin: 'left'
                                            }}
                                        ></div>

                                        <div className="p-4 sm:p-6 xl:p-4 2xl:p-6">
                                            <div className="flex items-start justify-between mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                                                <div
                                                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 rounded-full transition-all duration-500"
                                                    style={{
                                                        backgroundColor: hoveredCard === idx ? accentColor : `${accentColor}20`,
                                                        transform: hoveredCard === idx ? 'scale(1.1)' : 'scale(1)'
                                                    }}
                                                >
                                                    <span
                                                        className="text-sm sm:text-base xl:text-sm 2xl:text-base font-light transition-colors duration-500"
                                                        style={{ color: hoveredCard === idx ? '#FFFFFF' : accentColor }}
                                                    >
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-sm sm:text-base xl:text-sm 2xl:text-base text-gray-800 font-light leading-relaxed">
                                                {item}
                                            </p>
                                        </div>

                                        <div
                                            className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-lg sm:rounded-xl xl:rounded-lg 2xl:rounded-xl"
                                            style={{
                                                background: `linear-gradient(135deg, ${accentColor}05 0%, transparent 100%)`,
                                                opacity: hoveredCard === idx ? 1 : 0
                                            }}
                                        ></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Benefits Section - VERBESSERT: Bessere Mobile-Größen */}
                <div className="mb-12 sm:mb-16 xl:mb-10 2xl:mb-16 bg-gradient-to-br from-yellow-50 to-lime-50 p-8 sm:p-12 xl:p-6 2xl:p-12 rounded-xl sm:rounded-2xl xl:rounded-xl 2xl:rounded-2xl">
                    <div className="max-w-3xl mx-auto text-center">
                        <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 mx-auto mb-3 sm:mb-4 xl:mb-3 2xl:mb-4" style={{ color: '#A8B536' }} />
                        <h2 className="text-2xl sm:text-3xl xl:text-2xl 2xl:text-3xl font-light text-gray-900 mb-3 sm:mb-4 xl:mb-3 2xl:mb-4">
                            Für wen ist dieser Kurs?
                        </h2>
                        <p className="text-base sm:text-lg xl:text-base 2xl:text-lg text-gray-700 font-light leading-relaxed">
                            Dieser Kurs ist ideal für Naildesignerinnen, die ihre Arbeit schneller, präziser und professioneller gestalten möchten.
                            Perfekt geeignet, egal ob du bereits Erfahrung hast oder die Fast Tips Technik neu kennenlernen willst.
                        </p>
                    </div>
                </div>

                {/* Pricing - VERBESSERT: Bessere Mobile-Darstellung */}
                {course.pricingVariants && course.pricingVariants.length > 0 && (
                    <div>
                        <h2 className="text-3xl sm:text-4xl xl:text-2xl 2xl:text-4xl font-light text-gray-900 mb-8 sm:mb-12 xl:mb-6 2xl:mb-12">
                            Preisvarianten
                            <div className="w-16 sm:w-24 xl:w-16 2xl:w-24 h-0.5 sm:h-1 xl:h-0.5 2xl:h-1 mt-2 sm:mt-3 xl:mt-2 2xl:mt-3" style={{ backgroundColor: '#D5DD48' }}></div>
                        </h2>

                        <div className={`grid gap-5 sm:gap-6 xl:gap-5 2xl:gap-8 ${
                            course.pricingVariants.length === 1
                                ? 'grid-cols-1 max-w-2xl mx-auto'
                                : 'grid-cols-1 sm:grid-cols-2'
                        }`}>
                            {course.pricingVariants.map((variant: PricingVariant, idx: number) => (
                                <div
                                    key={idx}
                                    className={`p-8 sm:p-12 xl:p-6 2xl:p-12 rounded-xl sm:rounded-2xl xl:rounded-xl 2xl:rounded-2xl shadow-sm flex flex-col bg-white ${variant.isPopular ? 'border-2' : 'border border-gray-100'}`}
                                    style={variant.isPopular ? { borderColor: '#D5DD48' } : {}}
                                >
                                    <div className="mb-6 sm:mb-8 xl:mb-5 2xl:mb-8">
                                        <div className="text-sm sm:text-base xl:text-sm 2xl:text-base uppercase tracking-wider mb-1 sm:mb-2 xl:mb-1 2xl:mb-2 font-light text-gray-500">
                                            {variant.name}
                                            {variant.isPopular && (
                                                <span className="ml-2 text-xs sm:text-sm xl:text-xs 2xl:text-sm px-1.5 sm:px-2 xl:px-1.5 2xl:px-2 py-1 rounded-full font-light"
                                                      style={{ backgroundColor: '#D5DD48', color: '#374151' }}>
                                                    Beliebte Wahl
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-4xl sm:text-5xl xl:text-3xl 2xl:text-5xl font-light text-gray-900 mb-1">{variant.price}</div>
                                        {variant.description && (
                                            <div className="text-sm sm:text-base xl:text-sm 2xl:text-base font-light" style={{ color: '#A8B536' }}>{variant.description}</div>
                                        )}
                                    </div>

                                    <div className="space-y-3 sm:space-y-4 xl:space-y-2 2xl:space-y-4 mb-8 sm:mb-12 xl:mb-6 2xl:mb-12 flex-grow">
                                        {variant.features.map((feature: string, featureIdx: number) => (
                                            <div key={featureIdx} className="flex items-start space-x-2 sm:space-x-3 xl:space-x-2 2xl:space-x-3">
                                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 flex-shrink-0 mt-0.5" style={{ color: '#D5DD48' }} />
                                                <p className="text-sm sm:text-base xl:text-sm 2xl:text-base text-gray-700 font-light leading-relaxed">{feature}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handleBookingClick(variant.name, variant.price)}
                                        className="w-full py-3 sm:py-4 xl:py-3 2xl:py-4 text-base sm:text-lg xl:text-base 2xl:text-lg font-light rounded-lg border-2 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
                                        style={{
                                            borderColor: '#D5DD48',
                                            color: '#374151',
                                            backgroundColor: 'transparent'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#D5DD48';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }}
                                    >
                                        {variant.name} wählen
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FastTipsCourse;