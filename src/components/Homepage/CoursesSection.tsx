import React, { useState, useEffect, useRef } from 'react';
import { Clock, Users, Star, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

interface Course {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    duration: string;
    participants: string;
    level: string;
    description: string;
    features: string[];
    color: string;
    slug: string;
}

const CoursesSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

    const courses: Course[] = [
        {
            id: 1,
            title: "Gel-Nails Grundkurs",
            subtitle: "Für Einsteiger",
            image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
            duration: "6 Stunden",
            participants: "Max. 8 Personen",
            level: "Anfänger",
            description: "Lernen Sie die Grundlagen der Gel-Nail Technik von Grund auf. Perfekt für Einsteiger, die professionelle Gel-Nägel erstellen möchten.",
            features: ["Gel-Auftrag Techniken", "Feilen & Formen", "UV-Lamp Härtung", "Basis & Top Coat", "Nagel Vorbereitung", "Pflege & Nachbehandlung"],
            color: "#FF6B6B",
            slug: "gel-nails-grundkurs"
        },
        {
            id: 2,
            title: "Nail Art Masterclass",
            subtitle: "Kreative Designs",
            image: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
            duration: "8 Stunden",
            participants: "Max. 6 Personen",
            level: "Fortgeschritten",
            description: "Erweitern Sie Ihre Fähigkeiten mit fortgeschrittenen Nail Art Techniken. Von geometrischen Mustern bis zu floralen Designs.",
            features: ["Komplexe Muster", "Farbverläufe", "3D Nail Art", "Stamping Techniken", "French Variationen", "Glitter & Effekte"],
            color: "#4ECDC4",
            slug: "nail-art-masterclass"
        },
        {
            id: 3,
            title: "Salon Business Kurs",
            subtitle: "Selbstständigkeit",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80",
            duration: "4 Stunden",
            participants: "Max. 10 Personen",
            level: "Alle Level",
            description: "Alles was Sie wissen müssen, um Ihr eigenes Nagelstudio zu eröffnen. Von der Businessplanung bis zur erfolgreichen Umsetzung.",
            features: ["Business Planung", "Marketing Strategien", "Preisgestaltung", "Kundengewinnung", "Rechtliche Grundlagen", "Salon Einrichtung"],
            color: "#45B7D1",
            slug: "salon-business-kurs"
        }
    ];

    const navigateToCourse = (courseSlug: string) => {
        window.location.href = `/course/${courseSlug}`;
    };

    return (
        <section
            id="courses"
            ref={sectionRef}
            className="relative py-16 overflow-hidden"
            style={{ backgroundColor: '#F2F1ED' }}
        >
            {/* Clean background without decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Background now clean and minimal */}
            </div>

            <div className="relative w-full px-4">
                {/* Modern Header */}
                <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>


                    {/* Title with Modern Typography and centered green line */}
                    <h2 className="text-6xl font-thin text-gray-800 mb-8 leading-tight relative">
                        Unsere Kurse
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1.5 opacity-70 rounded-full" style={{ backgroundColor: '#D5DD48' }}></div>
                    </h2>

                    <p className="text-lg font-light text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        Entwickeln Sie Ihre Fähigkeiten mit unseren professionellen Kursen.
                        <br />
                        Von den Grundlagen bis zur Selbstständigkeit - wir begleiten Sie auf Ihrem Weg zum Erfolg.
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D5DD48' }}></div>
                            <span>3 Kurse verfügbar</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="w-3 h-3" />
                            <span>Max. 24 Teilnehmer gesamt</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3" />
                            <span>18 Stunden Weiterbildung</span>
                        </div>
                    </div>
                </div>

                {/* Modern Cards Grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course, index) => (
                            <div
                                key={course.id}
                                className={`group cursor-pointer transition-all duration-700 ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                                onClick={() => navigateToCourse(course.slug)}
                                onMouseEnter={() => setHoveredCard(course.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Modern Card */}
                                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 backdrop-blur-sm group-hover:-translate-y-2">

                                    {/* Image Container with Gradient Overlay */}
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                        />

                                        {/* Gradient Overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>

                                        {/* Floating Elements */}
                                        <div className="absolute top-3 left-3">
                                            <div
                                                className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border border-white/20"
                                                style={{ backgroundColor: 'rgba(213, 221, 72, 0.95)', color: '#2C3E16' }}
                                            >
                                                {course.level}
                                            </div>
                                        </div>

                                        {/* Bottom Info */}
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <div className="flex items-center justify-between text-white/90 text-xs">
                                                <div className="flex items-center space-x-1 backdrop-blur-sm bg-black/20 rounded-full px-2 py-1">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="font-light">{course.duration}</span>
                                                </div>
                                                <div className="flex items-center space-x-1 backdrop-blur-sm bg-black/20 rounded-full px-2 py-1">
                                                    <Users className="w-3 h-3" />
                                                    <span className="font-light">{course.participants}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-5">

                                        {/* Header */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-light px-2 py-1 rounded-full" style={{ backgroundColor: 'rgba(213, 221, 72, 0.1)', color: '#A8B536' }}>
                                                    {course.subtitle}
                                                </span>
                                                <div className="flex space-x-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                                    ))}
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-medium text-gray-800 mb-3 leading-tight">
                                                {course.title}
                                            </h3>

                                            <p className="text-sm text-gray-600 font-light leading-relaxed">
                                                {course.description}
                                            </p>
                                        </div>

                                        {/* Features Preview */}
                                        <div className="mb-5">
                                            <div className="flex items-center mb-3">
                                                <Sparkles className="w-4 h-4 mr-2" style={{ color: '#D5DD48' }} />
                                                <span className="text-xs font-medium text-gray-700">Kurs-Highlights</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                {course.features.slice(0, 4).map((feature, idx) => (
                                                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                                                        <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: '#D5DD48' }} />
                                                        <span className="font-light truncate text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {course.features.length > 4 && (
                                                <div className="mt-2 text-xs text-gray-500 text-center">
                                                    +{course.features.length - 4} weitere Module
                                                </div>
                                            )}
                                        </div>

                                        {/* CTA Button */}
                                        <div className="relative">
                                            <button className="w-full group/btn relative overflow-hidden rounded-xl p-3 transition-all duration-300 hover:shadow-lg">
                                                {/* Button Background */}
                                                <div
                                                    className="absolute inset-0 transition-all duration-300 group-hover/btn:scale-105"
                                                    style={{ backgroundColor: hoveredCard === course.id ? '#D5DD48' : 'rgba(213, 221, 72, 0.1)' }}
                                                ></div>

                                                {/* Button Content */}
                                                <div className="relative flex items-center justify-center space-x-2">
                                                    <span
                                                        className="text-sm font-medium transition-colors duration-300"
                                                        style={{ color: hoveredCard === course.id ? '#2C3E16' : '#A8B536' }}
                                                    >
                                                        Kurs entdecken
                                                    </span>
                                                    <ArrowRight
                                                        className={`w-4 h-4 transition-all duration-300 ${hoveredCard === course.id ? 'translate-x-1' : ''}`}
                                                        style={{ color: hoveredCard === course.id ? '#2C3E16' : '#A8B536' }}
                                                    />
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA Section */}

            </div>
        </section>
    );
};

export default CoursesSection;