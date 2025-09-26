import React, { useState, useEffect } from 'react';

import picture17 from '../../assets/Picture21.jpg';

interface ElementsVisibility {
    image: boolean;
    header: boolean;
    text: boolean;
}

const AboutSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [elementsVisible, setElementsVisible] = useState<ElementsVisibility>({
        image: false,
        header: false,
        text: false
    });

    useEffect(() => {
        // Start animations immediately
        setIsVisible(true);
        // Staggered animations for different elements
        setTimeout(() => setElementsVisible(prev => ({ ...prev, image: true })), 100);
        setTimeout(() => setElementsVisible(prev => ({ ...prev, header: true })), 300);
        setTimeout(() => setElementsVisible(prev => ({ ...prev, text: true })), 600);
    }, []);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.currentTarget;
        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjcwMCIgdmlld0JveD0iMCAwIDYwMCA3MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGJ1aWxkZXIgdHlwZT0ibGluZWFyIiBpZD0iZ3JhZGllbnQiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0Q1REQ0OCIgc3RvcC1vcGFjaXR5PSIwLjgiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQzVERDM4IiBzdG9wLW9wYWNpdHk9IjAuNiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==';
    };

    return (
        <section
            id="about"
            className="relative py-12 sm:py-16 md:py-20 overflow-hidden"
            style={{
                backgroundColor: '#F5F4F0'
            }}
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className={`absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 rounded-full transition-all duration-[2000ms] ease-out ${
                        isVisible ? 'opacity-20 scale-100' : 'opacity-0 scale-50'
                    }`}
                    style={{
                        background: 'linear-gradient(135deg, rgba(213, 221, 72, 0.1) 0%, rgba(213, 221, 72, 0.05) 100%)'
                    }}
                ></div>
                <div
                    className={`absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-48 sm:w-96 h-48 sm:h-96 rounded-full transition-all duration-[2500ms] ease-out delay-500 ${
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

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Mobile Layout */}
                <div className="lg:hidden">
                    <div className="space-y-8">
                        {/* Content First on Mobile */}
                        <div className="space-y-6 text-center">
                            {/* Header */}
                            <div className={`space-y-4 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
                                elementsVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                            }`}>
                                <h2 className="text-3xl sm:text-4xl font-thin text-gray-800 leading-tight">
                                    Über Mich
                                </h2>

                                <div
                                    className={`mx-auto h-1.5 rounded-full transition-all duration-1000 ease-out delay-200 ${
                                        elementsVisible.header ? 'w-24 opacity-100' : 'w-0 opacity-0'
                                    }`}
                                    style={{
                                        backgroundColor: '#D5DD48'
                                    }}
                                ></div>
                            </div>

                            {/* Text Content */}
                            <div className="space-y-5 text-base sm:text-lg font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
                                {[
                                    "Hi, ich bin Adriana. Schön, dass du hier bist! Meine Reise im Nageldesign hat 2010 begonnen – damals mit einer Grundausbildung und einem kleinen Homestudio. Aus dieser Leidenschaft ist Schritt für Schritt mein Traumjob geworden: Heute habe ich mein eigenes Studio mit einer Nail Academy.",
                                    "Mittlerweile durfte ich bereits viele Schülerinnen erfolgreich ausbilden, die nun selbst im Nageldesign arbeiten. Das macht mich unglaublich stolz – und ich freue mich darauf, auch dich auf deinem Weg zu begleiten.",
                                    "In meinen Kursen zeige ich dir nicht nur die Techniken, sondern gebe dir auch jede Menge Tipps, Motivation und Selbstvertrauen mit.",
                                    "Du wirst sehen: Lernen darf Spaß machen – und du wirst schnell merken, wie viel in dir steckt."
                                ].map((text, index) => (
                                    <p
                                        key={index}
                                        className={`transition-all duration-800 cubic-bezier(0.4, 0, 0.2, 1) ${
                                            elementsVisible.text ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                        style={{ transitionDelay: `${index * 200}ms` }}
                                    >
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Image Below Content on Mobile */}
                        <div className={`relative transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
                            elementsVisible.image ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
                        }`}>
                            {/* Mobile Image Container */}
                            <div className="relative overflow-hidden rounded-2xl mx-auto max-w-md group">
                                <img
                                    src={picture17}
                                    alt="Adriana - Nageldesignerin bei blickfang"
                                    className="w-full h-80 sm:h-96 object-cover transition-all duration-700 group-hover:scale-105"
                                    style={{ objectPosition: 'center 20%' }}
                                    onError={handleImageError}
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-start">
                    {/* Image Side */}
                    <div className={`relative transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
                        elementsVisible.image ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-20 opacity-0 scale-95'
                    }`}>
                        {/* Main Image Container */}
                        <div className="relative overflow-hidden rounded-2xl group">
                            <img
                                src={picture17}
                                alt="Adriana - Nageldesignerin bei blickfang"
                                className="w-full h-[550px] object-cover transition-all duration-700 group-hover:scale-105"
                                style={{ objectPosition: 'center 20%' }}
                                onError={handleImageError}
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="space-y-8 pt-0">
                        {/* Header */}
                        <div className={`space-y-6 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${
                            elementsVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                            <h2 className="text-5xl font-thin text-gray-800 leading-tight">
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
                                "Hi, ich bin Adriana. Schön, dass du hier bist! Meine Reise im Nageldesign hat 2010 begonnen – damals mit einer Grundausbildung und einem kleinen Homestudio. Aus dieser Leidenschaft ist Schritt für Schritt mein Traumjob geworden: Heute habe ich mein eigenes Studio mit einer Nail Academy.",
                                "Mittlerweile durfte ich bereits viele Schülerinnen erfolgreich ausbilden, die nun selbst im Nageldesign arbeiten. Das macht mich unglaublich stolz – und ich freue mich darauf, auch dich auf deinem Weg zu begleiten.",
                                "In meinen Kursen zeige ich dir nicht nur die Techniken, sondern gebe dir auch jede Menge Tipps, Motivation und Selbstvertrauen mit.",
                                "Du wirst sehen: Lernen darf Spaß machen – und du wirst schnell merken, wie viel in dir steckt."
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;