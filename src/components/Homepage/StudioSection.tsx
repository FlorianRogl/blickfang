import { useState, useEffect, useRef } from 'react';
import {
    Star,
    Award,
    Shield
} from 'lucide-react';

import picture8 from '../../assets/TischZerti.jpg'
import picture13 from '../../assets/LogoWand.jpg'
import picture16 from '../../assets/Übersicht.jpg'
import Nagellackregale from '../../assets/NagelLackRegale.jpg'
import Material from '../../assets/Material.jpg'


const StudioSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const studioImages = [
        {
            url: picture8,
            title: "Lernen auf Profi-Niveau",
            description: "Moderne Arbeitsplätze für konzentriertes Training."
        },
        {
            url: picture13,
            title: "Willkommen in deiner Academy",
            description: "Ein Ort, an dem du dich wohlfühlst und wachsen kannst.\n"
        },
        {
            url: Nagellackregale,
            title: "Farbenvielfalt für deine Kreativität",
            description: "Eine große Auswahl für unzählige Designs."
        },
        {
            url: picture16,
            title: "Modern, hell & inspirierend",
            description: "Räume, die Motivation und Freude am Lernen schenken."
        },
        {
            url: Material,
            title: "Alles für deinen Erfolg",
            description: "Top-Ausstattung für deine Ausbildung im Nageldesign."
        }
    ];

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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % studioImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [studioImages.length]);





    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.currentTarget;
        target.src = `data:image/svg+xml;base64,${btoa(`<svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="url(#gradient)"/><defs><linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#D5DD48" stop-opacity="0.8"/><stop offset="1" stop-color="#C5DD38" stop-opacity="0.6"/></linearGradient></defs></svg>`)}`;
    };

    const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.borderColor = 'rgba(213, 221, 72, 0.3)';
    };

    const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.borderColor = 'rgba(213, 221, 72, 0.2)';
    };

    const handleIndicatorMouseEnter = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const target = e.currentTarget;
        if (index !== currentSlide) {
            target.style.backgroundColor = 'rgba(213, 221, 72, 0.7)';
        }
    };

    const handleIndicatorMouseLeave = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const target = e.currentTarget;
        if (index !== currentSlide) {
            target.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-12 sm:py-16 lg:py-20 w-full"
            style={{
                backgroundColor: '#F5F4F0'
            }}
        >
            {/* Subtle Decorative Line */}
            <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(213, 221, 72, 0.3) 50%, transparent 100%)'
                }}
            ></div>

            <div className="w-full px-4 sm:px-6 lg:px-12 max-w-[95%] sm:max-w-[90%] mx-auto">
                {/* Section Header */}
                <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-thin text-gray-800 leading-tight">
                            Blickfang
                        </h2>
                        <p className="text-base sm:text-lg font-light text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                            Professionelle Nagelpflege in moderner Atmosphäre
                        </p>

                        <div
                            className="w-16 sm:w-24 h-1 sm:h-1.5 rounded-full mx-auto"
                            style={{ backgroundColor: '#D5DD48' }}
                        ></div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start w-full">

                    {/* Left Side - Text Content */}
                    <div className={`transition-all duration-800 delay-200 order-2 lg:order-1 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>

                        {/* Header */}
                        <div className="mb-6 sm:mb-8">
                            <h3 className="text-2xl sm:text-3xl font-thin mb-4 sm:mb-6 text-gray-800 text-center lg:text-left">
                                Mein Studio – dein Platz zum Lernen & Wachsen
                            </h3>
                        </div>

                        {/* Main Text */}
                        <div className="space-y-4 sm:space-y-6 text-sm sm:text-base font-light text-gray-600 leading-relaxed mb-8 sm:mb-10">
                            <p className="hover:text-gray-800 transition-colors duration-300">
                                Ich habe mein Studio so gestaltet, dass du dich vom ersten Moment an wohlfühlst. Helle Räume, moderne Ausstattung und eine entspannte Atmosphäre schaffen den perfekten Rahmen für dein Training.
                            </p>

                            <p className="hover:text-gray-800 transition-colors duration-300">
                                Mir war wichtig, einen Ort zu schaffen, an dem du dich nicht nur weiterbildest, sondern auch inspiriert wirst. Jede Ecke ist darauf ausgerichtet, dir das Lernen so angenehm und effektiv wie möglich zu machen.
                            </p>

                            <p className="hover:text-gray-800 transition-colors duration-300">
                                Hier kannst du dich ganz auf das konzentrieren, was zählt: dein Erfolg im Nageldesign.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            <div className="text-center">
                                <div
                                    className="bg-white/80 rounded-xl p-4 sm:p-6 border transition-all duration-300 hover:bg-white"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <Shield className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: '#D5DD48' }} />
                                    <div className="text-sm font-light mb-1 text-gray-800">Hygiene</div>
                                    <div className="text-xs font-light text-gray-500">Höchste Standards</div>
                                </div>
                            </div>

                            <div className="text-center">
                                <div
                                    className="bg-white/80 rounded-xl p-4 sm:p-6 border transition-all duration-300 hover:bg-white"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <Award className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: '#D5DD48' }} />
                                    <div className="text-sm font-light mb-1 text-gray-800">Qualität</div>
                                    <div className="text-xs font-light text-gray-500">Premium Produkte</div>
                                </div>
                            </div>

                            <div className="text-center">
                                <div
                                    className="bg-white/80 rounded-xl p-4 sm:p-6 border transition-all duration-300 hover:bg-white"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <Star className="w-6 sm:w-8 h-6 sm:h-8 mx-auto mb-2 sm:mb-3" style={{ color: '#D5DD48' }} />
                                    <div className="text-sm font-light mb-1 text-gray-800">Erfahrung</div>
                                    <div className="text-xs font-light text-gray-500">Seit 2016</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image Slideshow */}
                    <div className={`transition-all duration-800 delay-400 order-1 lg:order-2 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                        <div className="relative group">
                            {/* Main Slideshow Container */}
                            <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500">

                                {/* Image Container */}
                                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden">
                                    {studioImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`absolute inset-0 transition-all duration-700 ${
                                                index === currentSlide
                                                    ? 'opacity-100 translate-x-0'
                                                    : index < currentSlide
                                                        ? 'opacity-0 -translate-x-full'
                                                        : 'opacity-0 translate-x-full'
                                            }`}
                                        >
                                            <img
                                                src={image.url}
                                                alt={image.title}
                                                className="w-full h-full object-cover"
                                                onError={handleImageError}
                                            />

                                            {/* Image Overlay */}
                                            <div className="absolute inset-0 bg-black/20"></div>

                                            {/* Image Info */}
                                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                                                <h4 className="text-base sm:text-lg font-light mb-1">{image.title}</h4>
                                                <p className="text-xs sm:text-sm font-light opacity-90">{image.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Slide Indicators */}
                                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                                    {studioImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
                                                index === currentSlide
                                                    ? 'w-5 sm:w-6 shadow-sm'
                                                    : 'w-2 sm:w-2.5'
                                            }`}
                                            style={{
                                                backgroundColor: index === currentSlide ? '#D5DD48' : 'rgba(255, 255, 255, 0.6)'
                                            }}
                                            onMouseEnter={(e) => handleIndicatorMouseEnter(e, index)}
                                            onMouseLeave={(e) => handleIndicatorMouseLeave(e, index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudioSection;