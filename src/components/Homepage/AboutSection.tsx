import React, { useState, useEffect } from 'react';
import {Users, Clock, Sparkles } from 'lucide-react';

import picture17 from '../../assets/Picture17.jpg'

const AboutSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counters, setCounters] = useState({ years: 0, clients: 0, designs: 0 });
    const [animationStarted, setAnimationStarted] = useState(false);
    const [elementsVisible, setElementsVisible] = useState({
        image: false,
        header: false,
        text: false,
        stats: false
    });

    useEffect(() => {
        // Start animations immediately on load
        setIsVisible(true);
        // Staggered animations for different elements
        setTimeout(() => setElementsVisible(prev => ({ ...prev, image: true })), 100);
        setTimeout(() => setElementsVisible(prev => ({ ...prev, header: true })), 300);
        setTimeout(() => setElementsVisible(prev => ({ ...prev, text: true })), 600);
        setTimeout(() => setElementsVisible(prev => ({ ...prev, stats: true })), 900);

        if (!animationStarted) {
            setTimeout(() => {
                startCountAnimation();
                setAnimationStarted(true);
            }, 1200);
        }
    }, [animationStarted]);

    const startCountAnimation = () => {
        const targets = { years: 8, clients: 1000, designs: 500 };
        const duration = 2500;
        const steps = 80;
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
        target.style.borderColor = 'rgba(213, 221, 72, 0.5)';
        target.style.transform = 'translateY(-8px) scale(1.03)';
        target.style.boxShadow = '0 20px 40px rgba(213, 221, 72, 0.2)';
    };

    const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.borderColor = 'rgba(213, 221, 72, 0.2)';
        target.style.transform = 'translateY(0) scale(1)';
        target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    };

    return (
        <section
            className="relative py-20 overflow-hidden"
            style={{
                backgroundColor: '#F5F4F0'
            }}
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className={`absolute -top-40 -right-40 w-80 h-80 rounded-full transition-all duration-[2000ms] ease-out ${
                        isVisible ? 'opacity-20 scale-100' : 'opacity-0 scale-50'
                    }`}
                    style={{
                        background: 'linear-gradient(135deg, rgba(213, 221, 72, 0.1) 0%, rgba(213, 221, 72, 0.05) 100%)'
                    }}
                ></div>
                <div
                    className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full transition-all duration-[2500ms] ease-out delay-500 ${
                        isVisible ? 'opacity-15 scale-100' : 'opacity-0 scale-50'
                    }`}
                    style={{
                        background: 'linear-gradient(45deg, rgba(213, 221, 72, 0.08) 0%, rgba(213, 221, 72, 0.03) 100%)'
                    }}
                ></div>
            </div>

            {/* Subtle Decorative Line */}
            <div
                className={`absolute top-0 left-0 h-px transition-all duration-1000 ease-out ${
                    isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'
                }`}
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(213, 221, 72, 0.3) 50%, transparent 100%)'
                }}
            ></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Image Side */}
                    <div className={`relative transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
                        elementsVisible.image ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-20 opacity-0 scale-95'
                    }`}>
                        {/* Main Image Container */}
                        <div className="relative overflow-hidden rounded-2xl group">
                            <img
                                src={picture17}
                                alt="Adriana - Nageldesignerin bei blickfang"
                                className="w-full h-[500px] md:h-[600px] object-cover transition-all duration-700 group-hover:scale-105"
                                onError={handleImageError}
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Floating decoration */}
                        <div
                            className={`absolute -top-6 -right-6 w-24 h-24 rounded-full transition-all duration-1500 delay-300 ${
                                elementsVisible.image ? 'opacity-30 scale-100 rotate-0' : 'opacity-0 scale-50 rotate-45'
                            }`}
                            style={{
                                background: 'linear-gradient(135deg, rgba(213, 221, 72, 0.3) 0%, rgba(213, 221, 72, 0.1) 100%)',
                                backdropFilter: 'blur(10px)'
                            }}
                        ></div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-8">

                        {/* Header */}
                        <div className={`space-y-6 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
                            elementsVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                            <h2 className="text-5xl md:text-6xl font-thin text-gray-800 leading-tight">
                                Über Mich
                            </h2>

                            <div
                                className={`h-1.5 rounded-full transition-all duration-1000 ease-out delay-200 ${
                                    elementsVisible.header ? 'w-24 opacity-100' : 'w-0 opacity-0'
                                }`}
                                style={{
                                    backgroundColor: '#D5DD48'
                                }}
                            ></div>
                        </div>

                        {/* Text Content */}
                        <div className="space-y-6 text-lg font-light text-gray-600 leading-relaxed">
                            {[
                                "Hallo! Ich bin Adriana, Ihre leidenschaftliche Nageldesignerin mit über 8 Jahren Erfahrung in der Kunst der Nagelpflege und des kreativen Designs.",
                                "Meine Mission ist es, jedem Kunden ein einzigartiges und unvergessliches Erlebnis zu bieten. Mit modernsten Techniken und hochwertigen Produkten verwandle ich Ihre Nägel in kleine Kunstwerke.",
                                "Bei blickfang steht nicht nur die Schönheit im Vordergrund, sondern auch Ihr Wohlbefinden. Hygiene, Qualität und eine entspannte Atmosphäre sind meine obersten Prioritäten."
                            ].map((text, index) => (
                                <p
                                    key={index}
                                    className={`transition-all duration-800 cubic-bezier(0.4, 0, 0.2, 1) hover:text-gray-800 hover:transform hover:translate-x-2 ${
                                        elementsVisible.text ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    {text}
                                </p>
                            ))}
                        </div>

                        {/* Stats Counter */}
                        <div className={`grid grid-cols-3 gap-6 pt-8 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
                            elementsVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                        }`}>
                            {[
                                { icon: Clock, value: counters.years, label: 'Jahre Erfahrung', suffix: '+' },
                                { icon: Users, value: counters.clients, label: 'Zufriedene Kunden', suffix: '+' },
                                { icon: Sparkles, value: counters.designs, label: 'Designs erstellt', suffix: '+' }
                            ].map((stat, index) => {
                                const IconComponent = stat.icon;
                                return (
                                    <div
                                        key={index}
                                        className={`text-center transition-all duration-700 ${
                                            elementsVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                        style={{ transitionDelay: `${index * 150}ms` }}
                                    >
                                        <div
                                            className="bg-white/80 rounded-xl p-6 border transition-all duration-300 hover:bg-white cursor-pointer"
                                            style={{
                                                borderColor: 'rgba(213, 221, 72, 0.2)',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                            }}
                                            onMouseEnter={handleCardMouseEnter}
                                            onMouseLeave={handleCardMouseLeave}
                                        >
                                            <div className="flex items-center justify-center mb-2">
                                                <IconComponent
                                                    className="w-8 h-8 transition-transform duration-300 hover:scale-110"
                                                    style={{ color: '#D5DD48' }}
                                                />
                                            </div>
                                            <div className="text-3xl md:text-4xl font-light mb-1 text-gray-800">
                                                {stat.value.toLocaleString()}{stat.suffix}
                                            </div>
                                            <div className="text-sm text-gray-500 font-light">{stat.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;