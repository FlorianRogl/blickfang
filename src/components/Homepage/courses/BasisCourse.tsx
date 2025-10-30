import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowLeft,
    Clock,
    Users,
    Award,
    CheckCircle,
    X
} from 'lucide-react';
import { getCourseBySlug, type Course, type CourseModule, type PricingVariant } from '../../../lib/sanity';

// ✅ NUR DIESE 3 ZEILEN HINZUFÜGEN - REST BLEIBT GLEICH
import { courseSchema, breadcrumbSchema } from '../../utils/schemas';
import SEO from "../../../components/SEO.tsx";

interface CartItem {
    courseTitle: string;
    variant: string;
    price: string;
    addedAt: number;
}

const BasisCourse: React.FC = () => {
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const snackbarTimerRef = useRef<NodeJS.Timeout | null>(null);
    const courseSlug = "gel-nails-grundkurs";

    const handleNavigation = () => {
        window.history.back();
    };

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await getCourseBySlug(courseSlug);
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

    // ✅ NUR DIESE PAAR ZEILEN HINZUFÜGEN - Erstelle SEO-Schema aus Sanity-Daten
    const seoSchema = course ? courseSchema({
        name: course.title,
        description: course.description || course.short_description,
        price: course.price || 450, // Fallback-Preis
        duration: course.duration,
        slug: course.slug.current
    }) : null;

    const breadcrumbs = breadcrumbSchema([
        { name: 'Home', url: 'https://blickfang-nagelstudio.at/' },
        { name: 'Kurse', url: 'https://blickfang-nagelstudio.at/#services' },
        { name: 'Gel-Nägel Grundkurs', url: 'https://blickfang-nagelstudio.at/course/gel-nails-grundkurs' }
    ]);

    const combinedSchema = seoSchema ? {
        "@context": "https://schema.org",
        "@graph": [seoSchema, breadcrumbs]
    } : breadcrumbs;

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
                    <p className="text-gray-600 mb-6">Der Basiskurs konnte nicht geladen werden.</p>
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

    return (
        <>
            {/* ✅ NUR DAS HIER HINZUFÜGEN - SEO Komponente */}
            <SEO
                title={`${course.title} - Professionelle Nageldesign Ausbildung`}
                description={course.short_description || course.description}
                canonicalUrl="https://blickfang-nagelstudio.at/course/gel-nails-grundkurs"
                keywords="Gel-Nägel Kurs, Gel-Nägel lernen, Nageldesign Grundkurs, Gel-Nägel Ausbildung, Nagelmodellage Kurs, Gel-Nägel Schulung Steiermark"
                ogType="product"
                ogImage={course.image}
                structuredData={combinedSchema}
            />

            {/* ✅ AB HIER: DEIN BESTEHENDER CODE - KEINE ÄNDERUNGEN! */}
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
                            <X className="w-4 h-4 sm:w-5 sm:h-5 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Hero Image */}
                <div className="relative h-[50vh] min-h-[400px] max-h-[600px] sm:h-[55vh] sm:min-h-[450px] md:h-[55vh] lg:h-[60vh] xl:h-[45vh] 2xl:h-[50vh] mt-[5rem] sm:mt-[4.25rem] md:mt-[4.75rem] lg:mt-[6rem] xl:mt-[5.5rem] 2xl:mt-[6rem]" style={{ backgroundColor: '#EAE9E5' }}>
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Back Button */}
                    <div className="absolute top-6 sm:top-6 md:top-6 lg:top-8 left-4 sm:left-6 lg:left-8">
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

                    {/* Hero Content */}
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

                    {/* Stats Box */}
                    <div className="relative mb-12 sm:mb-16 xl:mb-10 2xl:mb-16 overflow-hidden rounded-2xl xl:rounded-xl 2xl:rounded-2xl bg-white shadow-sm">
                        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 xl:gap-6 2xl:gap-8 p-6 sm:p-8 xl:p-6 2xl:p-10">
                            <div className="text-center">
                                <Clock className="w-10 h-10 sm:w-12 sm:h-12 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 mx-auto mb-2 sm:mb-3 xl:mb-2 2xl:mb-3" style={{ color: '#A8B536' }} />
                                <div className="text-sm sm:text-base xl:text-sm 2xl:text-base uppercase tracking-wider text-gray-500 mb-1 font-light">Dauer</div>
                                <div className="text-xl sm:text-2xl xl:text-lg 2xl:text-2xl font-light text-gray-900">{course.duration}</div>
                            </div>
                            <div className="text-center">
                                <Users className="w-10 h-10 sm:w-12 sm:h-12 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 mx-auto mb-2 sm:mb-3 xl:mb-2 2xl:mb-3" style={{ color: '#A8B536' }} />
                                <div className="text-sm sm:text-base xl:text-sm 2xl:text-base uppercase tracking-wider text-gray-500 mb-1 font-light">Teilnehmer</div>
                                <div className="text-xl sm:text-2xl xl:text-lg 2xl:text-2xl font-light text-gray-900">{course.participants}</div>
                            </div>
                            <div className="text-center">
                                <Award className="w-10 h-10 sm:w-12 sm:h-12 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 mx-auto mb-2 sm:mb-3 xl:mb-2 2xl:mb-3" style={{ color: '#A8B536' }} />
                                <div className="text-sm sm:text-base xl:text-sm 2xl:text-base uppercase tracking-wider text-gray-500 mb-1 font-light">Level</div>
                                <div className="text-xl sm:text-2xl xl:text-lg 2xl:text-2xl font-light text-gray-900">{course.level}</div>
                            </div>
                            <div className="text-center">
                                <Clock className="w-10 h-10 sm:w-12 sm:h-12 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 mx-auto mb-2 sm:mb-3 xl:mb-2 2xl:mb-3" style={{ color: '#A8B536' }} />
                                <div className="text-sm sm:text-base xl:text-sm 2xl:text-base uppercase tracking-wider text-gray-500 mb-1 font-light">Nächster Termin</div>
                                <div className="text-base sm:text-xl xl:text-base 2xl:text-xl font-light text-gray-900">{course.nextDate || 'Auf Anfrage'}</div>
                            </div>
                        </div>
                    </div>

                    {/* Quote */}
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

                    {/* Course Content Modules */}
                    {course.modules && course.modules.length > 0 && (
                        <div className="mb-12 sm:mb-16 xl:mb-10 2xl:mb-16">
                            <h2 className="text-3xl sm:text-4xl xl:text-2xl 2xl:text-4xl font-light text-gray-900 mb-8 sm:mb-12 xl:mb-6 2xl:mb-12">
                                Kursmodule
                                <div className="w-16 sm:w-24 xl:w-16 2xl:w-24 h-0.5 sm:h-1 xl:h-0.5 2xl:h-1 mt-2 sm:mt-3 xl:mt-2 2xl:mt-3" style={{ backgroundColor: '#D5DD48' }}></div>
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 xl:gap-5 2xl:gap-8">
                                {course.modules.map((module: CourseModule, moduleIdx: number) => {
                                    const color = moduleIdx % 2 === 0 ? '#D5DD48' : '#A8B536';
                                    return (
                                        <div key={moduleIdx} className="bg-white p-6 sm:p-8 xl:p-5 2xl:p-8 border-t-4 xl:border-t-3 2xl:border-t-4 rounded-lg xl:rounded-md 2xl:rounded-lg shadow-sm" style={{ borderColor: color }}>
                                            <div className="flex items-baseline space-x-3 sm:space-x-4 xl:space-x-3 2xl:space-x-4 mb-4 sm:mb-6 xl:mb-4 2xl:mb-6">
                                                <span className="text-4xl sm:text-5xl xl:text-3xl 2xl:text-5xl font-light" style={{ color }}>
                                                    {String(moduleIdx + 1).padStart(2, '0')}
                                                </span>
                                                <h3 className="text-lg sm:text-xl xl:text-base 2xl:text-xl font-light text-gray-900 flex-1">
                                                    Einheit {moduleIdx + 1} – {module.title}
                                                </h3>
                                            </div>
                                            <div className="space-y-2 xl:space-y-1.5 2xl:space-y-2">
                                                {module.items.map((item: string, idx: number) => (
                                                    <div key={idx} className="flex items-start space-x-2 sm:space-x-3 xl:space-x-2 2xl:space-x-3">
                                                        <div className="w-1.5 h-1.5 xl:w-1 xl:h-1 2xl:w-1.5 2xl:h-1.5 mt-2 xl:mt-1.5 2xl:mt-2 flex-shrink-0 rounded-full" style={{ backgroundColor: color }}></div>
                                                        <span className="text-sm sm:text-base xl:text-sm 2xl:text-base text-gray-700 font-light leading-relaxed">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Certification Section */}
                    <div className="mb-12 sm:mb-16 xl:mb-10 2xl:mb-16 bg-white p-8 sm:p-12 xl:p-6 2xl:p-12 rounded-2xl xl:rounded-xl 2xl:rounded-2xl shadow-sm">
                        <h2 className="text-3xl sm:text-4xl xl:text-2xl 2xl:text-4xl font-light text-gray-900 mb-8 sm:mb-12 xl:mb-6 2xl:mb-12">
                            Abschluss & Zertifizierung
                            <div className="w-16 sm:w-24 xl:w-16 2xl:w-24 h-0.5 sm:h-1 xl:h-0.5 2xl:h-1 mt-2 sm:mt-3 xl:mt-2 2xl:mt-3" style={{ backgroundColor: '#D5DD48' }}></div>
                        </h2>

                        <div className="relative">
                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:hidden"></div>
                            <div className="absolute top-6 sm:top-8 xl:top-6 2xl:top-8 left-0 right-0 h-0.5 bg-gray-200 hidden md:block"></div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 xl:gap-5 2xl:gap-8 relative">
                                <div className="text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 rounded-full mx-auto mb-3 sm:mb-4 xl:mb-3 2xl:mb-4 flex items-center justify-center" style={{ backgroundColor: '#D5DD48' }}>
                                        <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 text-white" />
                                    </div>
                                    <p className="text-sm sm:text-base xl:text-sm 2xl:text-base text-gray-700 font-light">Nach dem vierten Kurstag erhält jede Teilnehmerin ein Teilnahmezertifikat</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 rounded-full mx-auto mb-3 sm:mb-4 xl:mb-3 2xl:mb-4 flex items-center justify-center" style={{ backgroundColor: '#A8B536' }}>
                                        <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 text-white" />
                                    </div>
                                    <p className="text-sm sm:text-base xl:text-sm 2xl:text-base text-gray-700 font-light">Ein individueller Prüfungstag wird anschließend vereinbart</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 rounded-full mx-auto mb-3 sm:mb-4 xl:mb-3 2xl:mb-4 flex items-center justify-center" style={{ backgroundColor: '#D5DD48' }}>
                                        <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 text-white" />
                                    </div>
                                    <p className="text-sm sm:text-base xl:text-sm 2xl:text-base text-gray-700 font-light">Schriftliche und praktische Prüfung am Modell</p>
                                </div>

                                <div className="text-center">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 rounded-full mx-auto mb-3 sm:mb-4 xl:mb-3 2xl:mb-4 flex items-center justify-center" style={{ backgroundColor: '#A8B536' }}>
                                        <Award className="w-6 h-6 sm:w-8 sm:h-8 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 text-white" />
                                    </div>
                                    <p className="text-sm sm:text-base xl:text-sm 2xl:text-base text-gray-700 font-medium">Offizielles Zertifikat als Nageldesignerin</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
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
        </>
    );
};

export default BasisCourse;