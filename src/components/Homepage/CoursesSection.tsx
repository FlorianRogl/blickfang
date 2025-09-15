import React, { useState, useEffect, useRef } from 'react';
import { Clock, Users, Star, Calendar, BookOpen, Sparkles } from 'lucide-react';

const CoursesSection = () => {
    const [isVisible, setIsVisible] = useState(false);
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

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.currentTarget;
        target.src = `data:image/svg+xml;base64,${btoa(`<svg width="500" height="300" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="500" height="300" fill="url(#gradient)"/><defs><linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#D5DD48" stop-opacity="0.8"/><stop offset="1" stop-color="#C5DD38" stop-opacity="0.6"/></linearGradient></defs></svg>`)}`;
    };

    const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.borderColor = 'rgba(213, 221, 72, 0.3)';
    };

    const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.borderColor = 'rgba(213, 221, 72, 0.2)';
    };

    const handleTitleMouseEnter = (e: React.MouseEvent<HTMLHeadingElement>) => {
        const target = e.currentTarget;
        target.style.color = '#A8B536';
    };

    const handleTitleMouseLeave = (e: React.MouseEvent<HTMLHeadingElement>) => {
        const target = e.currentTarget;
        target.style.color = '#1f2937';
    };

    const handleInfoGridMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = 'rgba(213, 221, 72, 0.05)';
    };

    const handleInfoGridMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = '#f9fafb';
    };

    const handleFeatureMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = 'rgba(213, 221, 72, 0.05)';
    };

    const handleFeatureMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = '#f9fafb';
    };

    const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = '#A8B536';
    };

    const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = '#D5DD48';
    };

    // Funktion zum Navigieren zur Kursdetailseite
    const navigateToCourse = (courseTitle: string) => {
        // Erstelle URL-freundlichen Slug
        const slug = courseTitle.toLowerCase()
            .replace(/ä/g, 'ae')
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Navigiere zur neuen Route
        window.location.href = `/course/${slug}`;

        // Oder mit React Router (falls Sie das verwenden):
        // navigate(`/course/${slug}`);

        // Oder öffne in neuem Tab:
        // window.open(`/course/${slug}`, '_blank');
    };

    const courses = [
        {
            title: "Gel-Nails Grundkurs",
            subtitle: "Für Einsteiger",
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
            duration: "6 Stunden",
            participants: "Max. 8 Personen",
            level: "Anfänger",
            description: "Lernen Sie die Grundlagen der Gel-Nail Technik von Grund auf. Perfekt für Einsteiger, die professionelle Gel-Nägel erstellen möchten.",
            features: ["Gel-Auftrag Techniken", "Feilen & Formen", "UV-Lamp Härtung", "Basis & Top Coat", "Nagel Vorbereitung", "Pflege & Nachbehandlung"]
        },
        {
            title: "Nail Art Masterclass",
            subtitle: "Kreative Designs",
            image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
            duration: "8 Stunden",
            participants: "Max. 6 Personen",
            level: "Fortgeschritten",
            description: "Erweitern Sie Ihre Fähigkeiten mit fortgeschrittenen Nail Art Techniken. Von geometrischen Mustern bis zu floralen Designs.",
            features: ["Komplexe Muster", "Farbverläufe", "3D Nail Art", "Stamping Techniken", "French Variationen", "Glitter & Effekte"]
        },
        {
            title: "Salon Business Kurs",
            subtitle: "Selbstständigkeit",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
            duration: "4 Stunden",
            participants: "Max. 10 Personen",
            level: "Alle Level",
            description: "Alles was Sie wissen müssen, um Ihr eigenes Nagelstudio zu eröffnen. Von der Businessplanung bis zur erfolgreichen Umsetzung und Kundengewinnung.",
            features: ["Business Planung", "Marketing Strategien", "Preisgestaltung", "Kundengewinnung", "Rechtliche Grundlagen", "Salon Einrichtung"]
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-20"
            style={{
                backgroundColor: '#F2F1ED' // Harmoniert perfekt mit Navbar und AboutSection
            }}
        >
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full mb-6"
                        style={{
                            backgroundColor: 'rgba(213, 221, 72, 0.1)',
                        }}
                    >
                        <BookOpen className="w-5 h-5" style={{ color: '#D5DD48' }} />
                        <span className="font-light" style={{ color: '#A8B536' }}>Professionelle Ausbildung</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-thin text-gray-800 mb-6 leading-tight">
                        Unsere Kurse
                    </h2>

                    <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Entwickeln Sie Ihre Fähigkeiten mit unseren professionellen Kursen.
                        Von den Grundlagen bis zur Selbstständigkeit - wir begleiten Sie auf Ihrem Weg zum Erfolg.
                    </p>

                    <div
                        className="w-32 h-1.5 rounded-full mx-auto mt-8"
                        style={{
                            backgroundColor: '#D5DD48'
                        }}
                    ></div>
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {courses.map((course, index) => (
                        <div
                            key={`course-${index}`}
                            className={`group relative transition-all duration-500 ${
                                isVisible
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-20 opacity-0'
                            }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Card */}
                            <div
                                className="relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden hover:shadow-lg h-full flex flex-col"
                                style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                onMouseEnter={handleCardMouseEnter}
                                onMouseLeave={handleCardMouseLeave}
                            >

                                {/* Image Container */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-all duration-500"
                                        onError={handleImageError}
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                                    {/* Level Badge */}
                                    <div
                                        className="absolute top-4 right-4 rounded-full px-3 py-1 transition-all duration-200"
                                        style={{ backgroundColor: '#D5DD48' }}
                                    >
                                        <span className="text-gray-800 text-sm font-light">{course.level}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4 flex-1 flex flex-col">
                                    {/* Header */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="text-sm font-light"
                                                style={{ color: '#D5DD48' }}
                                            >
                                                {course.subtitle}
                                            </span>
                                            <div className="flex items-center space-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                                ))}
                                            </div>
                                        </div>

                                        <h3
                                            className="text-2xl font-light text-gray-800 transition-colors duration-200"
                                            onMouseEnter={handleTitleMouseEnter}
                                            onMouseLeave={handleTitleMouseLeave}
                                        >
                                            {course.title}
                                        </h3>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-2 gap-4 py-4">
                                        <div
                                            className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl transition-colors duration-200"
                                            onMouseEnter={handleInfoGridMouseEnter}
                                            onMouseLeave={handleInfoGridMouseLeave}
                                        >
                                            <Clock className="w-5 h-5" style={{ color: '#D5DD48' }} />
                                            <div>
                                                <div className="text-xs text-gray-500 font-light">Dauer</div>
                                                <div className="text-sm font-light text-gray-800">{course.duration}</div>
                                            </div>
                                        </div>

                                        <div
                                            className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl transition-colors duration-200"
                                            onMouseEnter={handleInfoGridMouseEnter}
                                            onMouseLeave={handleInfoGridMouseLeave}
                                        >
                                            <Users className="w-5 h-5" style={{ color: '#D5DD48' }} />
                                            <div>
                                                <div className="text-xs text-gray-500 font-light">Teilnehmer</div>
                                                <div className="text-sm font-light text-gray-800">{course.participants}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2 flex-1">
                                        <h4 className="text-sm font-light text-gray-700 flex items-center space-x-2">
                                            <Sparkles className="w-4 h-4" style={{ color: '#D5DD48' }} />
                                            <span>Inhalte</span>
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {course.features.map((feature, idx) => (
                                                <div
                                                    key={idx}
                                                    className="text-xs text-gray-600 font-light bg-gray-50 rounded-lg px-3 py-2 transition-colors duration-200"
                                                    onMouseEnter={handleFeatureMouseEnter}
                                                    onMouseLeave={handleFeatureMouseLeave}
                                                >
                                                    • {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        className="w-full text-gray-800 font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 mt-auto"
                                        style={{
                                            backgroundColor: '#D5DD48'
                                        }}
                                        onMouseEnter={handleButtonMouseEnter}
                                        onMouseLeave={handleButtonMouseLeave}
                                        onClick={() => navigateToCourse(course.title)}
                                    >
                                        <Calendar className="w-5 h-5" />
                                        <span>Mehr erfahren</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;