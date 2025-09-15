import { useState, useEffect, useRef } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Star,
    Award,
    Shield
} from 'lucide-react';

const StudioSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const studioImages = [
        {
            url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
            title: "Unser Studio Ambiente",
            description: "Moderne und saubere Arbeitsumgebung"
        },
        {
            url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
            title: "Professioneller Arbeitsplatz",
            description: "Neueste Technik und sterile Umgebung"
        },
        {
            url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
            title: "Nageldesign Kunst",
            description: "Präzise Designs nach Ihren Wünschen"
        },
        {
            url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
            title: "Premium Produkte",
            description: "Nur die besten Marken für Sie"
        },
        {
            url: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80",
            title: "Entspannung Pur",
            description: "Professionelle Behandlung in ruhiger Atmosphäre"
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

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % studioImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + studioImages.length) % studioImages.length);
    };

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

    const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        target.style.borderColor = 'rgba(213, 221, 72, 0.3)';
    };

    const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
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
            className="relative py-20"
            style={{
                backgroundColor: '#F5F4F0' // Same as AboutSection
            }}
        >
            {/* Subtle Decorative Line - same as AboutSection */}
            <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(213, 221, 72, 0.3) 50%, transparent 100%)'
                }}
            ></div>

            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="space-y-6">
                        <h2 className="text-5xl md:text-6xl font-thin text-gray-800 leading-tight">
                            blickfang Nagelstudio
                        </h2>
                        <p className="text-xl font-light text-gray-600 max-w-2xl mx-auto">
                            Professionelle Nagelpflege in moderner Atmosphäre
                        </p>

                        <div
                            className="w-24 h-1.5 rounded-full mx-auto"
                            style={{ backgroundColor: '#D5DD48' }}
                        ></div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side - Text Content */}
                    <div className={`transition-all duration-800 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>

                        {/* Header */}
                        <div className="mb-8">
                            <h3 className="text-4xl font-thin mb-6 text-gray-800">
                                Willkommen bei blickfang
                            </h3>
                        </div>

                        {/* Main Text */}
                        <div className="space-y-6 text-lg font-light text-gray-600 leading-relaxed mb-10">
                            <p className="hover:text-gray-800 transition-colors duration-300">
                                In unserem modernen Nagelstudio in Mureck verbinden wir professionelle Nagelpflege mit einer entspannten und luxuriösen Atmosphäre.
                            </p>

                            <p className="hover:text-gray-800 transition-colors duration-300">
                                Unser erfahrenes Team verwendet ausschließlich hochwertige Markenprodukte und modernste Techniken. Mit über 8 Jahren Erfahrung verwandeln wir Ihre Nägel in kleine Kunstwerke.
                            </p>

                            <p className="hover:text-gray-800 transition-colors duration-300">
                                Bei blickfang steht nicht nur die Schönheit im Vordergrund, sondern auch Ihr Wohlbefinden. Hygiene, Qualität und eine entspannte Atmosphäre sind unsere obersten Prioritäten.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div
                                    className="bg-white/80 rounded-xl p-6 border transition-all duration-300 hover:bg-white"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <Shield className="w-8 h-8 mx-auto mb-3" style={{ color: '#D5DD48' }} />
                                    <div className="text-sm font-light mb-1 text-gray-800">Hygiene</div>
                                    <div className="text-xs font-light text-gray-500">Höchste Standards</div>
                                </div>
                            </div>

                            <div className="text-center">
                                <div
                                    className="bg-white/80 rounded-xl p-6 border transition-all duration-300 hover:bg-white"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <Award className="w-8 h-8 mx-auto mb-3" style={{ color: '#D5DD48' }} />
                                    <div className="text-sm font-light mb-1 text-gray-800">Qualität</div>
                                    <div className="text-xs font-light text-gray-500">Premium Produkte</div>
                                </div>
                            </div>

                            <div className="text-center">
                                <div
                                    className="bg-white/80 rounded-xl p-6 border transition-all duration-300 hover:bg-white"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <Star className="w-8 h-8 mx-auto mb-3" style={{ color: '#D5DD48' }} />
                                    <div className="text-sm font-light mb-1 text-gray-800">Erfahrung</div>
                                    <div className="text-xs font-light text-gray-500">Seit 2016</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image Slideshow */}
                    <div className={`transition-all duration-800 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                        <div className="relative group">
                            {/* Main Slideshow Container */}
                            <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500">

                                {/* Image Container */}
                                <div className="relative h-96 md:h-[500px] overflow-hidden">
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
                                            <div className="absolute bottom-6 left-6 text-white">
                                                <h4 className="text-xl font-light mb-1">{image.title}</h4>
                                                <p className="text-sm font-light opacity-90">{image.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border text-gray-600"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleButtonMouseEnter}
                                    onMouseLeave={handleButtonMouseLeave}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border text-gray-600"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleButtonMouseEnter}
                                    onMouseLeave={handleButtonMouseLeave}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                {/* Slide Indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                    {studioImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                                index === currentSlide
                                                    ? 'w-6 shadow-sm'
                                                    : 'w-2.5'
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

                            {/* Studio Stats */}
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div
                                    className="bg-white/80 rounded-lg p-4 border transition-all duration-300 text-center hover:bg-white"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <div className="text-2xl font-light text-gray-800">8+</div>
                                    <div className="text-sm font-light text-gray-500">Jahre Erfahrung</div>
                                </div>
                                <div
                                    className="bg-white/80 rounded-lg p-4 border transition-all duration-300 text-center hover:bg-white"
                                    style={{ borderColor: 'rgba(213, 221, 72, 0.2)' }}
                                    onMouseEnter={handleCardMouseEnter}
                                    onMouseLeave={handleCardMouseLeave}
                                >
                                    <div className="text-2xl font-light text-gray-800">100%</div>
                                    <div className="text-sm font-light text-gray-500">Zufriedenheit</div>
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