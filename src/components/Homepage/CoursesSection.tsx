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
        target.src = `data:image/svg+xml;base64,${btoa(`<svg width="500" height="300" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="500" height="300" fill="url(#gradient)"/><defs><linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#3ab64e" stop-opacity="0.8"/><stop offset="1" stop-color="#2a903d" stop-opacity="0.6"/></linearGradient></defs></svg>`)}`;
    };

    const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.borderColor = 'rgba(58, 182, 78, 0.3)';
    };

    const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.borderColor = '#e5e7eb';
    };

    const handleTitleMouseEnter = (e: React.MouseEvent<HTMLHeadingElement>) => {
        const target = e.currentTarget;
        target.style.color = '#2a903d';
    };

    const handleTitleMouseLeave = (e: React.MouseEvent<HTMLHeadingElement>) => {
        const target = e.currentTarget;
        target.style.color = '#1f2937';
    };

    const handleInfoGridMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = 'rgba(58, 182, 78, 0.05)';
    };

    const handleInfoGridMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = '#f9fafb';
    };

    const handleFeatureMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = 'rgba(58, 182, 78, 0.05)';
    };

    const handleFeatureMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = '#f9fafb';
    };

    const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        target.style.background = 'linear-gradient(90deg, #2a903d 0%, #3ab64e 100%)';
    };

    const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        target.style.background = 'linear-gradient(90deg, #3ab64e 0%, #4bc95b 100%)';
    };

    const courses = [
        {
            id: 1,
            title: "Gel-Nails Grundkurs",
            subtitle: "Für Einsteiger",
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
            duration: "6 Stunden",
            participants: "Max. 8 Personen",
            level: "Anfänger",
            price: "189€",
            description: "Lernen Sie die Grundlagen der Gel-Nail Technik von Grund auf. Perfekt für Einsteiger, die professionelle Gel-Nägel erstellen möchten.",
            features: ["Gel-Auftrag Techniken", "Feilen & Formen", "UV-Lamp Härtung", "Basis & Top Coat", "Nagel Vorbereitung", "Pflege & Nachbehandlung"]
        },
        {
            id: 2,
            title: "Nail Art Masterclass",
            subtitle: "Kreative Designs",
            image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
            duration: "8 Stunden",
            participants: "Max. 6 Personen",
            level: "Fortgeschritten",
            price: "289€",
            description: "Erweitern Sie Ihre Fähigkeiten mit fortgeschrittenen Nail Art Techniken. Von geometrischen Mustern bis zu floralen Designs.",
            features: ["Komplexe Muster", "Farbverläufe", "3D Nail Art", "Stamping Techniken", "French Variationen", "Glitter & Effekte"]
        },
        {
            id: 3,
            title: "Salon Business Kurs",
            subtitle: "Selbstständigkeit",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
            duration: "4 Stunden",
            participants: "Max. 10 Personen",
            level: "Alle Level",
            price: "149€",
            description: "Alles was Sie wissen müssen, um Ihr eigenes Nagelstudio zu eröffnen. Von der Businessplanung bis zur erfolgreichen Umsetzung und Kundengewinnung.",
            features: ["Business Planung", "Marketing Strategien", "Preisgestaltung", "Kundengewinnung", "Rechtliche Grundlagen", "Salon Einrichtung"]
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-20"
            style={{
                background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, rgba(58, 182, 78, 0.03) 100%)'
            }}
        >
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full mb-6"
                        style={{
                            backgroundColor: 'rgba(58, 182, 78, 0.1)',
                        }}
                    >
                        <BookOpen className="w-5 h-5" style={{ color: '#3ab64e' }} />
                        <span className="font-medium" style={{ color: '#2a903d' }}>Professionelle Ausbildung</span>
                    </div>

                    <h2
                        className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent mb-6 leading-tight"
                        style={{
                            background: 'linear-gradient(135deg, #3ab64e 0%, #4bc95b 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Unsere Kurse
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Entwickeln Sie Ihre Fähigkeiten mit unseren professionellen Kursen.
                        Von den Grundlagen bis zur Selbstständigkeit - wir begleiten Sie auf Ihrem Weg zum Erfolg.
                    </p>

                    <div
                        className="w-32 h-1.5 rounded-full mx-auto mt-8"
                        style={{
                            background: 'linear-gradient(90deg, #3ab64e 0%, #4bc95b 100%)'
                        }}
                    ></div>
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {courses.map((course, index) => (
                        <div
                            key={course.id}
                            className={`group relative transition-all duration-500 ${
                                isVisible
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-20 opacity-0'
                            }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Card */}
                            <div
                                className="relative bg-white rounded-2xl border border-gray-200 transition-all duration-300 overflow-hidden hover:shadow-lg h-full flex flex-col"
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
                                        style={{ backgroundColor: '#3ab64e' }}
                                    >
                                        <span className="text-white text-sm font-medium">{course.level}</span>
                                    </div>

                                    {/* Price Badge */}
                                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2">
                                        <span className="text-2xl font-bold text-gray-800">{course.price}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4 flex-1 flex flex-col">
                                    {/* Header */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="text-sm font-medium"
                                                style={{ color: '#3ab64e' }}
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
                                            className="text-2xl font-bold text-gray-800 transition-colors duration-200"
                                            onMouseEnter={handleTitleMouseEnter}
                                            onMouseLeave={handleTitleMouseLeave}
                                        >
                                            {course.title}
                                        </h3>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 leading-relaxed">
                                        {course.description}
                                    </p>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-2 gap-4 py-4">
                                        <div
                                            className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl transition-colors duration-200"
                                            onMouseEnter={handleInfoGridMouseEnter}
                                            onMouseLeave={handleInfoGridMouseLeave}
                                        >
                                            <Clock className="w-5 h-5" style={{ color: '#3ab64e' }} />
                                            <div>
                                                <div className="text-xs text-gray-500">Dauer</div>
                                                <div className="text-sm font-medium text-gray-800">{course.duration}</div>
                                            </div>
                                        </div>

                                        <div
                                            className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl transition-colors duration-200"
                                            onMouseEnter={handleInfoGridMouseEnter}
                                            onMouseLeave={handleInfoGridMouseLeave}
                                        >
                                            <Users className="w-5 h-5" style={{ color: '#3ab64e' }} />
                                            <div>
                                                <div className="text-xs text-gray-500">Teilnehmer</div>
                                                <div className="text-sm font-medium text-gray-800">{course.participants}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2 flex-1">
                                        <h4 className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                                            <Sparkles className="w-4 h-4" style={{ color: '#3ab64e' }} />
                                            <span>Inhalte</span>
                                        </h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {course.features.map((feature, idx) => (
                                                <div
                                                    key={idx}
                                                    className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2 transition-colors duration-200"
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
                                        className="w-full text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 mt-auto"
                                        style={{
                                            background: 'linear-gradient(90deg, #3ab64e 0%, #4bc95b 100%)'
                                        }}
                                        onMouseEnter={handleButtonMouseEnter}
                                        onMouseLeave={handleButtonMouseLeave}
                                    >
                                        <Calendar className="w-5 h-5" />
                                        <span>Jetzt Buchen</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={`text-center mt-16 transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border max-w-2xl mx-auto"
                        style={{ borderColor: 'rgba(58, 182, 78, 0.2)' }}
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Nicht den passenden Kurs gefunden?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Kontaktieren Sie uns für individuelle Schulungen oder Gruppenkurse nach Ihren Wünschen.
                        </p>
                        <button
                            className="text-white font-bold py-3 px-8 rounded-xl transition-all duration-200"
                            style={{
                                background: 'linear-gradient(90deg, #3ab64e 0%, #4bc95b 100%)'
                            }}
                            onMouseEnter={handleButtonMouseEnter}
                            onMouseLeave={handleButtonMouseLeave}
                        >
                            Beratung anfragen
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;