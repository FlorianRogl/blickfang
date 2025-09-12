import React, { useState, useEffect, useRef } from 'react';
import {Users, Clock, Sparkles } from 'lucide-react';

import picture17 from '../../assets/picture17.jpg'

const AboutSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counters, setCounters] = useState({ years: 0, clients: 0, designs: 0 });
    const sectionRef = useRef<HTMLElement>(null);
    // const
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    startCountAnimation();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const startCountAnimation = () => {
        const targets = { years: 8, clients: 1000, designs: 500 };
        const duration = 2000;
        const steps = 60;
        const stepTime = duration / steps;

        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setCounters({
                years: Math.round(targets.years * easeOutQuart),
                clients: Math.round(targets.clients * easeOutQuart),
                designs: Math.round(targets.designs * easeOutQuart)
            });

            if (currentStep >= steps) {
                clearInterval(timer);
                setCounters(targets);
            }
        }, stepTime);
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.currentTarget;
        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjcwMCIgdmlld0JveD0iMCAwIDYwMCA3MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGJ1aWxkZXIgdHlwZT0ibGluZWFyIiBpZD0iZ3JhZGllbnQiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0Q1REQ0OCIgc3RvcC1vcGFjaXR5PSIwLjgiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQzVERDM4IiBzdG9wLW9wYWNpdHk9IjAuNiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==';
    };

    const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.borderColor = 'rgba(213, 221, 72, 0.3)';
    };

    const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.borderColor = 'rgba(213, 221, 72, 0.2)';
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-20"
            style={{
                backgroundColor: '#F5F4F0' // Harmoniert perfekt mit der Navbar-Farbe #EAE9E5
            }}
        >
            {/* Subtle Decorative Line */}
            <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(213, 221, 72, 0.3) 50%, transparent 100%)'
                }}
            ></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Image Side */}
                    <div className={`relative transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                        {/* Main Image Container */}
                        <div className="relative overflow-hidden rounded-2xl">
                            <img
                                src={picture17}
                                alt="Adriana - Nageldesignerin bei blickfang"
                                className="w-full h-[500px] md:h-[600px] object-cover transition-all duration-500"
                                onError={handleImageError}
                            />
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className={`space-y-8 transition-all duration-700 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>

                        {/* Header */}
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                                Über Mich
                            </h2>

                            <div
                                className="w-24 h-1.5 rounded-full"
                                style={{
                                    backgroundColor: '#D5DD48'
                                }}
                            ></div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p className="transition-colors duration-200 hover:text-gray-800">
                                Hallo! Ich bin Adriana, Ihre leidenschaftliche Nageldesignerin mit über 8 Jahren Erfahrung in der Kunst der Nagelpflege und des kreativen Designs.
                            </p>

                            <p className="transition-colors duration-200 hover:text-gray-800">
                                Meine Mission ist es, jedem Kunden ein einzigartiges und unvergessliches Erlebnis zu bieten.
                                Mit modernsten Techniken und hochwertigen Produkten verwandle ich Ihre Nägel in kleine Kunstwerke.
                            </p>

                            <p className="transition-colors duration-200 hover:text-gray-800">
                                Bei blickfang steht nicht nur die Schönheit im Vordergrund,
                                sondern auch Ihr Wohlbefinden. Hygiene, Qualität und eine entspannte Atmosphäre sind meine obersten Prioritäten.
                            </p>
                        </div>

                        {/* Stats Counter */}
                        <div className="grid grid-cols-3 gap-6 pt-8">
                            <div className="text-center">
                                <div
                                    className="bg-white/80 rounded-xl p-6 border transition-all duration-200 hover:bg-white"
                                    style={{
                                        borderColor: 'rgba(213, 221, 72, 0.2)',
                                    }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <div className="flex items-center justify-center mb-2">
                                        <Clock className="w-8 h-8" style={{ color: '#D5DD48' }} />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold mb-1 text-gray-800">
                                        {counters.years}+
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium">Jahre Erfahrung</div>
                                </div>
                            </div>

                            <div className="text-center">
                                <div
                                    className="bg-white/80 rounded-xl p-6 border transition-all duration-200 hover:bg-white"
                                    style={{
                                        borderColor: 'rgba(213, 221, 72, 0.2)',
                                    }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <div className="flex items-center justify-center mb-2">
                                        <Users className="w-8 h-8" style={{ color: '#D5DD48' }} />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold mb-1 text-gray-800">
                                        {counters.clients.toLocaleString()}+
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium">Zufriedene Kunden</div>
                                </div>
                            </div>

                            <div className="text-center">
                                <div
                                    className="bg-white/80 rounded-xl p-6 border transition-all duration-200 hover:bg-white"
                                    style={{
                                        borderColor: 'rgba(213, 221, 72, 0.2)',
                                    }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <div className="flex items-center justify-center mb-2">
                                        <Sparkles className="w-8 h-8" style={{ color: '#D5DD48' }} />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold mb-1 text-gray-800">
                                        {counters.designs}+
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium">Designs erstellt</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;