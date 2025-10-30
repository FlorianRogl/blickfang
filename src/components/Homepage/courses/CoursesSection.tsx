import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, Star, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { getCourses, type Course } from '../../../lib/sanity';


const CoursesSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    // Kurse aus Sanity laden
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (error) {
                console.error('❌ Fehler beim Laden der Kurse:', error);
                setError('Fehler beim Laden der Kurse.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.0 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const regularCourses = !loading ? courses.filter(c => !c.featured) : [];
    const featuredCourse = !loading ? courses.find(c => c.featured) : undefined;

    const navigateToCourse = (courseSlug: string) => {
        navigate(`/course/${courseSlug}`);
    };

    if (loading) {
        return (
            <section className="py-20" style={{ backgroundColor: '#F2F1ED' }}>
                <div className="text-center">
                    <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"
                         style={{ borderTopColor: '#D5DD48' }}></div>
                    <p className="mt-4 text-gray-600">Kurse werden geladen...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20" style={{ backgroundColor: '#F2F1ED' }}>
                <div className="text-center max-w-2xl mx-auto px-4">
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-red-800 mb-2">Fehler beim Laden</h3>
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Neu laden
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (courses.length === 0) {
        return (
            <section className="py-20" style={{ backgroundColor: '#F2F1ED' }}>
                <div className="text-center max-w-2xl mx-auto px-4">
                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Keine Kurse vorhanden</h3>
                        <p className="text-gray-600 mb-4">
                            Es wurden noch keine Kurse in Sanity angelegt.
                        </p>
                        <p className="text-sm text-gray-500">
                            Bitte füge Kurse über das Sanity Studio hinzu.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            id="courses"
            ref={sectionRef}
            className="relative py-12 sm:py-16 lg:py-20 xl:py-14 2xl:py-20 overflow-hidden"
            style={{ backgroundColor: '#F2F1ED' }}
        >
            <div className="relative w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl xl:max-w-5xl 2xl:max-w-7xl mx-auto">
                    {/* Header */}
                    <div className={`text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-10 2xl:mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-4xl 2xl:text-6xl font-thin text-gray-800 mb-6 sm:mb-8 xl:mb-5 2xl:mb-8 leading-tight relative">
                            Unsere Kurse
                            <div className="absolute -bottom-3 sm:-bottom-4 xl:-bottom-2.5 2xl:-bottom-4 left-1/2 transform -translate-x-1/2 w-20 sm:w-32 xl:w-20 2xl:w-32 h-1 sm:h-1.5 xl:h-1 2xl:h-1.5 opacity-70 rounded-full" style={{ backgroundColor: '#D5DD48' }}></div>
                        </h2>

                        <p className="text-base sm:text-lg xl:text-base 2xl:text-lg font-light text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 xl:mb-5 2xl:mb-8 px-4 sm:px-0">
                            Entwickeln Sie Ihre Fähigkeiten mit unseren professionellen Kursen.
                            <br className="hidden sm:block" />
                            Von den Grundlagen bis zur individuellen Perfektion - wir begleiten Sie auf Ihrem Weg zum Erfolg.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 xl:space-x-5 2xl:space-x-8 text-xs sm:text-sm xl:text-xs 2xl:text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 xl:w-1.5 xl:h-1.5 2xl:w-2 2xl:h-2 rounded-full" style={{ backgroundColor: '#D5DD48' }}></div>
                                <span>{courses.length} Kurse verfügbar</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="w-3 h-3 xl:w-2.5 xl:h-2.5 2xl:w-3 2xl:h-3" />
                                <span className="hidden sm:inline">Von Einzelcoaching bis Kleingruppe</span>
                                <span className="sm:hidden">Kleine Gruppen</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-3 h-3 xl:w-2.5 xl:h-2.5 2xl:w-3 2xl:h-3" />
                                <span>Von 1 Tag bis 45 Stunden</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile & iPad: Horizontal Scroll für reguläre Kurse */}
                    {regularCourses.length > 0 && (
                        <div className="lg:hidden mb-8">
                            <div
                                className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {regularCourses.map((course, index) => (
                                    <div
                                        key={course.slug.current}
                                        className="flex-shrink-0 w-[280px] snap-center"
                                        onClick={() => navigateToCourse(course.slug.current)}
                                    >
                                        <CourseCard course={course} isVisible={isVisible} index={index} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />
                                    </div>
                                ))}
                            </div>

                            {/* Dezenter Swipe-Hinweis unter den Kursen */}
                            <div className="flex items-center justify-center space-x-2 mt-2 opacity-40">
                                <div className="flex items-center space-x-1">
                                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                </div>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                                    <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Mobile: Featured Course DARUNTER - gleiche Größe mit grüner Border */}
                    {featuredCourse && (
                        <div className="lg:hidden px-4 mb-8">
                            <div onClick={() => navigateToCourse(featuredCourse.slug.current)}>
                                <div className="border-2 rounded-2xl overflow-hidden" style={{ borderColor: '#D5DD48' }}>
                                    <CourseCard
                                        course={featuredCourse}
                                        isVisible={isVisible}
                                        index={regularCourses.length}
                                        hoveredCard={hoveredCard}
                                        setHoveredCard={setHoveredCard}
                                    />
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Desktop: Grid für reguläre Kurse */}
                    {regularCourses.length > 0 && (
                        <div className="hidden lg:block mb-12 xl:mb-10 2xl:mb-12">
                            <div className="grid grid-cols-3 gap-6 xl:gap-5 2xl:gap-6">
                                {regularCourses.map((course, index) => (
                                    <div
                                        key={course.slug.current}
                                        onClick={() => navigateToCourse(course.slug.current)}
                                    >
                                        <CourseCard course={course} isVisible={isVisible} index={index} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Featured Course */}
                    {featuredCourse && (
                        <div className="hidden lg:block max-w-4xl mx-auto">
                            <div
                                className={`transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}
                                onClick={() => navigateToCourse(featuredCourse.slug.current)}
                            >
                                <div className="relative group cursor-pointer">
                                    <div className="relative bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 border-2 backdrop-blur-sm group-hover:-translate-y-3 mt-8" style={{ borderColor: '#D5DD48' }}>
                                        <div className="grid md:grid-cols-2 gap-0">
                                            {/* Linke Seite - Bild */}
                                            <div className="relative h-64 md:h-auto overflow-hidden">
                                                <img
                                                    src={featuredCourse.image}
                                                    alt={featuredCourse.title}
                                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                                                <div className="absolute top-3 left-3">
                                                    <div className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border border-white/20" style={{ backgroundColor: 'rgba(213, 221, 72, 0.95)', color: '#2C3E16' }}>
                                                        {featuredCourse.level}
                                                    </div>
                                                </div>

                                                <div className="absolute bottom-3 left-3 right-3">
                                                    <div className="flex items-center gap-2 text-white/90 text-xs">
                                                        <div className="flex items-center space-x-1 backdrop-blur-sm bg-black/20 rounded-full px-2 py-1">
                                                            <Clock className="w-3 h-3" />
                                                            <span className="font-light">{featuredCourse.duration}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-1 backdrop-blur-sm bg-black/20 rounded-full px-2 py-1">
                                                            <Users className="w-3 h-3" />
                                                            <span className="font-light">{featuredCourse.participants}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Rechte Seite - Content */}
                                            <div className="p-6 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center justify-between mb-3">
                                                    <span className="text-xs font-light px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(213, 221, 72, 0.2)', color: '#A8B536' }}>
                                                        {featuredCourse.subtitle}
                                                    </span>
                                                        <div className="flex space-x-0.5">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <h3 className="text-2xl font-medium text-gray-800 mb-2 leading-tight">
                                                        {featuredCourse.title}
                                                    </h3>

                                                    <p className="text-sm font-light leading-relaxed text-gray-600 mb-4">
                                                        {featuredCourse.description}
                                                    </p>

                                                    <div className="mb-4">
                                                        <div className="flex items-center mb-2">
                                                            <Sparkles className="w-4 h-4 mr-2" style={{ color: '#D5DD48' }} />
                                                            <span className="text-xs font-medium text-gray-700">Exklusive Vorteile</span>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                                                            {featuredCourse.features.map((feature, idx) => (
                                                                <div key={idx} className="flex items-center space-x-2 text-gray-600">
                                                                    <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: '#D5DD48' }} />
                                                                    <span className="font-light text-xs">{feature}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    className="w-full py-3 rounded-xl font-medium text-base transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                                                    style={{ backgroundColor: '#D5DD48', color: '#2C3E16' }}
                                                >
                                                    Jetzt anfragen
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const CourseCard: React.FC<{
    course: Course;
    isVisible: boolean;
    index: number;
    hoveredCard: number | null;
    setHoveredCard: (id: number | null) => void;
}> = ({ course, isVisible, index, hoveredCard, setHoveredCard }) => {
    const stringToHash = (str: string): number => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    };

    const cardId = stringToHash(course.slug.current);

    return (
        <div
            className={`group cursor-pointer transition-all duration-700 h-full ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
            onMouseEnter={() => setHoveredCard(cardId)}
            onMouseLeave={() => setHoveredCard(null)}
        >
            <div className="relative bg-white rounded-2xl xl:rounded-xl 2xl:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 backdrop-blur-sm group-hover:-translate-y-2 h-full flex flex-col">
                <div className="relative h-48 sm:h-56 2xl:h-64 overflow-hidden flex-shrink-0">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>

                    <div className="absolute top-2 left-2">
                        <div className="px-2 py-0.5 rounded-full text-xs xl:text-[10px] 2xl:text-xs font-medium backdrop-blur-md border border-white/20" style={{ backgroundColor: 'rgba(213, 221, 72, 0.95)', color: '#2C3E16' }}>
                            {course.level}
                        </div>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center justify-between text-white/90 text-xs xl:text-[10px] 2xl:text-xs">
                            <div className="flex items-center space-x-1 backdrop-blur-sm bg-black/20 rounded-full px-1.5 py-0.5">
                                <Clock className="w-2.5 h-2.5" />
                                <span className="font-light">{course.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1 backdrop-blur-sm bg-black/20 rounded-full px-1.5 py-0.5">
                                <Users className="w-2.5 h-2.5" />
                                <span className="font-light">{course.participants}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3 sm:p-4 xl:p-3 2xl:p-4 flex-1 flex flex-col">
                    <div className="mb-2 sm:mb-3 xl:mb-2 2xl:mb-3 flex-1">
                        <h3 className="text-base sm:text-lg xl:text-base 2xl:text-lg font-medium text-gray-800 mb-1.5 sm:mb-2 xl:mb-1.5 2xl:mb-2 leading-tight">
                            {course.title}
                        </h3>
                    </div>

                    <div className="mb-3 sm:mb-4 xl:mb-2.5 2xl:mb-3">
                        <div className="flex items-center mb-1.5">
                            <Sparkles className="w-3 h-3 mr-1.5" style={{ color: '#D5DD48' }} />
                            <span className="text-xs xl:text-[10px] 2xl:text-xs font-medium text-gray-700">Kurs-Highlights</span>
                        </div>

                        <div className="space-y-1">
                            {course.features && course.features.length > 0 ? (
                                course.features.slice(0, 4).map((feature, idx) => (
                                    <div key={idx} className="flex items-center space-x-1.5 text-gray-600">
                                        <CheckCircle className="w-2.5 xl:w-2 2xl:w-2.5 h-2.5 xl:h-2 2xl:h-2.5 flex-shrink-0" style={{ color: '#D5DD48' }} />
                                        <span className="font-light text-xs xl:text-[10px] 2xl:text-xs">{feature}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400">Keine Features vorhanden</p>
                            )}
                        </div>
                    </div>

                    <button className="w-full group/btn relative overflow-hidden rounded-lg p-2 sm:p-2.5 xl:p-2 2xl:p-2.5 transition-all duration-300 hover:shadow-lg">
                        <div
                            className="absolute inset-0 transition-all duration-300 group-hover/btn:scale-105"
                            style={{ backgroundColor: hoveredCard === cardId ? '#D5DD48' : 'rgba(213, 221, 72, 0.1)' }}
                        ></div>
                        <div className="relative flex items-center justify-center space-x-1.5">
                            <span
                                className="text-sm xl:text-xs 2xl:text-sm font-medium transition-colors duration-300"
                                style={{ color: hoveredCard === cardId ? '#2C3E16' : '#A8B536' }}
                            >
                                Kurs entdecken
                            </span>
                            <ArrowRight
                                className={`w-3.5 h-3.5 transition-all duration-300 ${hoveredCard === cardId ? 'translate-x-1' : ''}`}
                                style={{ color: hoveredCard === cardId ? '#2C3E16' : '#A8B536' }}
                            />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoursesSection;