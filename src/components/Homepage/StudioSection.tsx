import { useState, useEffect, useRef } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Building,
    Heart,
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
        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjlmYWZiIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNlNWU3ZWIiLz4KPC9zdmc+';
    };

    const handleMouseEnterDiv = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        target.style.borderColor = 'rgba(58, 182, 78, 0.3)';
    };

    const handleMouseLeaveDiv = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
        target.style.borderColor = 'rgba(58, 182, 78, 0.2)';
    };

    const handleMouseEnterIcon = (e: React.MouseEvent<SVGSVGElement>) => {
        const target = e.currentTarget;
        target.style.color = '#2a903d';
    };

    const handleMouseLeaveIcon = (e: React.MouseEvent<SVGSVGElement>, defaultColor: string) => {
        const target = e.currentTarget;
        target.style.color = defaultColor;
    };

    const handleMouseEnterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = 'rgba(58, 182, 78, 0.05)';
        target.style.color = '#1f2937';
    };

    const handleMouseLeaveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        target.style.color = '#2a903d';
    };

    const handleMouseEnterIndicator = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const target = e.currentTarget;
        if (index !== currentSlide) {
            target.style.backgroundColor = 'rgba(75, 201, 91, 0.7)';
        }
    };

    const handleMouseLeaveIndicator = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        const target = e.currentTarget;
        if (index !== currentSlide) {
            target.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-20 bg-gray-50"
        >
            {/* Top border */}
            <div
                className="absolute top-0 left-0 w-full h-px"
                style={{ backgroundColor: '#3ab64e' }}
            ></div>

            <div className="container mx-auto px-6 max-w-7xl">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div
                        className="inline-flex items-center space-x-3 bg-white px-6 py-3 rounded-lg shadow-sm border mb-6 hover:shadow-md transition-shadow duration-300"
                        style={{ borderColor: 'rgba(58, 182, 78, 0.2)' }}
                    >
                        <Building className="w-5 h-5" style={{ color: '#3ab64e' }} />
                        <span className="font-medium" style={{ color: '#3ab64e' }}>Unser Studio</span>
                    </div>

                    <h2
                        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-4 leading-relaxed py-2"
                        style={{
                            background: 'linear-gradient(135deg, #3ab64e 0%, #4bc95b 50%, #3ab64e 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        blickfang Nagelstudio
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Professionelle Nagelpflege in moderner Atmosphäre
                    </p>

                    <div
                        className="w-20 h-0.5 mx-auto mt-6"
                        style={{ backgroundColor: '#3ab64e' }}
                    ></div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side - Text Content */}
                    <div className={`transition-all duration-800 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>

                        {/* Header */}
                        <div className="mb-8">
                            <h3 className="text-3xl font-bold mb-4 flex items-center space-x-4" style={{ color: '#3ab64e' }}>
                                <div
                                    className="rounded-lg p-3 shadow-sm"
                                    style={{ backgroundColor: '#3ab64e' }}
                                >
                                    <Heart className="w-7 h-7 text-white" />
                                </div>
                                <span>Willkommen bei blickfang</span>
                            </h3>
                        </div>

                        {/* Main Text */}
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                            <p className="hover:text-gray-800 transition-colors duration-300">
                                In unserem modernen <span
                                className="font-semibold"
                                style={{ color: '#3ab64e' }}
                            >Nagelstudio in Mureck</span>
                                verbinden wir professionelle Nagelpflege mit einer entspannten und luxuriösen Atmosphäre.
                            </p>

                            <p className="hover:text-gray-800 transition-colors duration-300">
                                Unser erfahrenes Team verwendet ausschließlich <span
                                className="font-semibold"
                                style={{ color: '#3ab64e' }}
                            >hochwertige Markenprodukte</span>
                                und modernste Techniken. Mit über 8 Jahren Erfahrung verwandeln wir Ihre Nägel in kleine Kunstwerke.
                            </p>

                            <p className="hover:text-gray-800 transition-colors duration-300">
                                Bei <span
                                className="font-semibold"
                                style={{ color: '#3ab64e' }}
                            >blickfang</span> steht nicht nur die Schönheit im Vordergrund,
                                sondern auch Ihr Wohlbefinden. Hygiene, Qualität und eine entspannte Atmosphäre sind unsere obersten Prioritäten.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center group">
                                <div
                                    className="bg-white rounded-xl p-6 shadow-sm border transition-all duration-300"
                                    style={{ borderColor: 'rgba(58, 182, 78, 0.2)' }}
                                    onMouseEnter={handleMouseEnterDiv}
                                    onMouseLeave={handleMouseLeaveDiv}
                                >
                                    <Shield
                                        className="w-10 h-10 mx-auto mb-3 transition-colors duration-300"
                                        style={{ color: '#3ab64e' }}
                                        onMouseEnter={handleMouseEnterIcon}
                                        onMouseLeave={(e) => handleMouseLeaveIcon(e, '#3ab64e')}
                                    />
                                    <div className="text-sm font-semibold mb-1" style={{ color: '#3ab64e' }}>Hygiene</div>
                                    <div className="text-xs text-gray-600">Höchste Standards</div>
                                </div>
                            </div>

                            <div className="text-center group">
                                <div
                                    className="bg-white rounded-xl p-6 shadow-sm border transition-all duration-300"
                                    style={{ borderColor: 'rgba(58, 182, 78, 0.2)' }}
                                    onMouseEnter={handleMouseEnterDiv}
                                    onMouseLeave={handleMouseLeaveDiv}
                                >
                                    <Award
                                        className="w-10 h-10 mx-auto mb-3 transition-colors duration-300"
                                        style={{ color: '#3ab64e' }}
                                        onMouseEnter={handleMouseEnterIcon}
                                        onMouseLeave={(e) => handleMouseLeaveIcon(e, '#3ab64e')}
                                    />
                                    <div className="text-sm font-semibold mb-1" style={{ color: '#3ab64e' }}>Qualität</div>
                                    <div className="text-xs text-gray-600">Premium Produkte</div>
                                </div>
                            </div>

                            <div className="text-center group">
                                <div
                                    className="bg-white rounded-xl p-6 shadow-sm border transition-all duration-300"
                                    style={{ borderColor: 'rgba(58, 182, 78, 0.2)' }}
                                    onMouseEnter={handleMouseEnterDiv}
                                    onMouseLeave={handleMouseLeaveDiv}
                                >
                                    <Star
                                        className="w-10 h-10 mx-auto mb-3 transition-colors duration-300"
                                        style={{ color: '#3ab64e' }}
                                        onMouseEnter={handleMouseEnterIcon}
                                        onMouseLeave={(e) => handleMouseLeaveIcon(e, '#3ab64e')}
                                    />
                                    <div className="text-sm font-semibold mb-1" style={{ color: '#3ab64e' }}>Erfahrung</div>
                                    <div className="text-xs text-gray-600">Seit 2016</div>
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
                                                <h4 className="text-xl font-semibold mb-1">{image.title}</h4>
                                                <p className="text-sm opacity-90">{image.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Arrows */}
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border"
                                    style={{
                                        color: '#2a903d',
                                        borderColor: 'rgba(58, 182, 78, 0.2)',
                                    }}
                                    onMouseEnter={handleMouseEnterButton}
                                    onMouseLeave={handleMouseLeaveButton}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border"
                                    style={{
                                        color: '#2a903d',
                                        borderColor: 'rgba(58, 182, 78, 0.2)',
                                    }}
                                    onMouseEnter={handleMouseEnterButton}
                                    onMouseLeave={handleMouseLeaveButton}
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
                                                backgroundColor: index === currentSlide ? '#4bc95b' : 'rgba(255, 255, 255, 0.6)'
                                            }}
                                            onMouseEnter={(e) => handleMouseEnterIndicator(e, index)}
                                            onMouseLeave={(e) => handleMouseLeaveIndicator(e, index)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Studio Stats */}
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div
                                    className="bg-white rounded-lg p-4 shadow-sm border transition-all duration-300 text-center group"
                                    style={{ borderColor: 'rgba(58, 182, 78, 0.2)' }}
                                    onMouseEnter={handleMouseEnterDiv}
                                    onMouseLeave={handleMouseLeaveDiv}
                                >
                                    <div
                                        className="text-2xl font-bold transition-colors duration-300"
                                        style={{ color: '#3ab64e' }}
                                        onMouseEnter={(e) => {
                                            const target = e.currentTarget;
                                            target.style.color = '#2a903d';
                                        }}
                                        onMouseLeave={(e) => {
                                            const target = e.currentTarget;
                                            target.style.color = '#3ab64e';
                                        }}
                                    >8+</div>
                                    <div className="text-sm text-gray-600">Jahre Erfahrung</div>
                                </div>
                                <div
                                    className="bg-white rounded-lg p-4 shadow-sm border transition-all duration-300 text-center group"
                                    style={{ borderColor: 'rgba(58, 182, 78, 0.2)' }}
                                    onMouseEnter={handleMouseEnterDiv}
                                    onMouseLeave={handleMouseLeaveDiv}
                                >
                                    <div
                                        className="text-2xl font-bold transition-colors duration-300"
                                        style={{ color: '#4bc95b' }}
                                        onMouseEnter={(e) => {
                                            const target = e.currentTarget;
                                            target.style.color = '#3ab64e';
                                        }}
                                        onMouseLeave={(e) => {
                                            const target = e.currentTarget;
                                            target.style.color = '#4bc95b';
                                        }}
                                    >100%</div>
                                    <div className="text-sm text-gray-600">Zufriedenheit</div>
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