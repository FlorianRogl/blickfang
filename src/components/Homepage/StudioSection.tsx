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
            className="relative py-12 sm:py-16 lg:py-20 xl:py-16 2xl:py-20 w-full"
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
                {/* Section Header - xl: Kompakter */}
                <div className={`text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-10 2xl:mb-16 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="space-y-4 sm:space-y-6 xl:space-y-4 2xl:space-y-6">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-4xl 2xl:text-5xl font-thin text-gray-800 leading-tight">
                            Blickfang
                        </h2>
                        <p className="text-base sm:text-lg xl:text-base 2xl:text-lg font-light text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
                            Professionelle Nagelpflege in moderner Atmosphäre
                        </p>

                        <div
                            className="w-16 sm:w-24 xl:w-16 2xl:w-24 h-1 sm:h-1.5 xl:h-1 2xl:h-1.5 rounded-full mx-auto"
                            style={{ backgroundColor: '#D5DD48' }}
                        ></div>
                    </div>
                </div>

                {/* Main Content Grid - xl: Reduzierter Gap */}
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-10 2xl:gap-16 items-start w-full">

                    {/* Left Side - Text Content */}
                    <div className={`transition-all duration-800 delay-200 order-2 lg:order-1 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>

                        {/* Header - xl: Kleinere Schrift */}
                        <div className="mb-6 sm:mb-8 xl:mb-5 2xl:mb-8">
                            <h3 className="text-2xl sm:text-3xl xl:text-2xl 2xl:text-3xl font-thin mb-4 sm:mb-6 xl:mb-4 2xl:mb-6 text-gray-800 text-center lg:text-left">
                                Mein Studio – dein Platz zum Lernen & Wachsen
                            </h3>
                        </div>

                        {/* Main Text - xl: Kleinere Schrift und Abstände */}
                        <div className="space-y-4 sm:space-y-6 xl:space-y-4 2xl:space-y-6 text-sm sm:text-base xl:text-sm 2xl:text-base font-light text-gray-600 leading-relaxed mb-8 sm:mb-10 xl:mb-6 2xl:mb-10">
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

                        {/* Features - xl: Kleinere Cards - FIXED: Alle Badges gleich groß */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-6 xl:gap-4 2xl:gap-6 items-stretch">
                            {/* Badge 1: Hygiene */}
                            <div className="flex flex-col">
                                <div
                                    className="bg-white/80 rounded-lg xl:rounded-lg 2xl:rounded-xl p-3 sm:p-6 xl:p-4 2xl:p-6 border transition-all duration-300 hover:bg-white flex flex-col justify-between h-full min-h-[90px] sm:min-h-[140px] xl:min-h-[110px] 2xl:min-h-[140px]"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <div className="flex flex-col items-center justify-center flex-1">
                                        <Shield className="w-5 sm:w-8 xl:w-6 2xl:w-8 h-5 sm:h-8 xl:h-6 2xl:h-8 mx-auto mb-2 sm:mb-3 xl:mb-2 2xl:mb-3" style={{ color: '#D5DD48' }} />
                                        <div className="text-xs xl:text-xs 2xl:text-sm font-light mb-1 text-gray-800 text-center">Hygiene</div>
                                        <div className="text-[10px] xl:text-[10px] 2xl:text-xs font-light text-gray-500 text-center">Höchste Standards</div>
                                    </div>
                                </div>
                            </div>

                            {/* Badge 2: Qualität */}
                            <div className="flex flex-col">
                                <div
                                    className="bg-white/80 rounded-lg xl:rounded-lg 2xl:rounded-xl p-3 sm:p-6 xl:p-4 2xl:p-6 border transition-all duration-300 hover:bg-white flex flex-col justify-between h-full min-h-[90px] sm:min-h-[140px] xl:min-h-[110px] 2xl:min-h-[140px]"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <div className="flex flex-col items-center justify-center flex-1">
                                        <Award className="w-5 sm:w-8 xl:w-6 2xl:w-8 h-5 sm:h-8 xl:h-6 2xl:h-8 mx-auto mb-2 sm:mb-3 xl:mb-2 2xl:mb-3" style={{ color: '#D5DD48' }} />
                                        <div className="text-xs xl:text-xs 2xl:text-sm font-light mb-1 text-gray-800 text-center">Qualität</div>
                                        <div className="text-[10px] xl:text-[10px] 2xl:text-xs font-light text-gray-500 text-center">Premium Produkte</div>
                                    </div>
                                </div>
                            </div>

                            {/* Badge 3: Erfahrung */}
                            <div className="flex flex-col">
                                <div
                                    className="bg-white/80 rounded-lg xl:rounded-lg 2xl:rounded-xl p-3 sm:p-6 xl:p-4 2xl:p-6 border transition-all duration-300 hover:bg-white flex flex-col justify-between h-full min-h-[90px] sm:min-h-[140px] xl:min-h-[110px] 2xl:min-h-[140px]"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <div className="flex flex-col items-center justify-center flex-1">
                                        <Star className="w-5 sm:w-8 xl:w-6 2xl:w-8 h-5 sm:h-8 xl:h-6 2xl:h-8 mx-auto mb-2 sm:mb-3 xl:mb-2 2xl:mb-3" style={{ color: '#D5DD48' }} />
                                        <div className="text-xs xl:text-xs 2xl:text-sm font-light mb-1 text-gray-800 text-center">Erfahrung</div>
                                        <div className="text-[10px] xl:text-[10px] 2xl:text-xs font-light text-gray-500 text-center">Seit 2016</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image Slideshow */}
                    <div className={`transition-all duration-800 delay-400 order-1 lg:order-2 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                        <div className="relative group">
                            {/* Main Slideshow Container - xl: Kleinere Border Radius */}
                            <div className="relative overflow-hidden rounded-2xl xl:rounded-xl 2xl:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500">

                                {/* Image Container - xl: Kleinere Höhe */}
                                <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[400px] 2xl:h-[500px] overflow-hidden">
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

                                            {/* Image Info - xl: Kleinere Schrift */}
                                            <div className="absolute bottom-4 sm:bottom-6 xl:bottom-4 2xl:bottom-6 left-4 sm:left-6 xl:left-4 2xl:left-6 text-white">
                                                <h4 className="text-base sm:text-lg xl:text-base 2xl:text-lg font-light mb-1">{image.title}</h4>
                                                <p className="text-xs sm:text-sm xl:text-xs 2xl:text-sm font-light opacity-90">{image.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Slide Indicators - xl: Kleinere Indicators */}
                                <div className="absolute -bottom-6 sm:-bottom-8 xl:-bottom-6 2xl:-bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 xl:space-x-1.5 2xl:space-x-2">
                                    {studioImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`h-2 sm:h-2.5 xl:h-2 2xl:h-2.5 rounded-full transition-all duration-300 touch-manipulation ${
                                                index === currentSlide
                                                    ? 'w-5 sm:w-6 xl:w-5 2xl:w-6 shadow-sm'
                                                    : 'w-2 sm:w-2.5 xl:w-2 2xl:w-2.5'
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