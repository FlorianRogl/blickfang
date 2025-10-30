import { useState, useEffect } from 'react';

import picture13 from '../../assets/Picture10.jpg'
import Kursraum from '../../assets/Kursraum.jpg'
import picture20 from '../../assets/Slide1.jpg'


interface CarouselImage {
    image: string;
    description: string;
    mainText: string;
    subText: string;
}

const HeroCarousel: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [touchStart, setTouchStart] = useState<number>(0);
    const [touchEnd, setTouchEnd] = useState<number>(0);
    const [, setIsSwiping] = useState<boolean>(false);

    const carouselImages: CarouselImage[] = [
        {
            image: picture20,
            description: "Hier beginnt dein Weg zu schönen Nägeln & deinem eigenen Business.",
            mainText: "Willkommen in der Welt des Nageldesigns",
            subText: ""
        },
        {
            image: picture13,
            description: "ich begleite dich Schritt für Schritt bis ans Ziel.",
            mainText: "Hi, ich bin Adriana",
            subText: "Nageldesignerin & Trainerin aus Leidenschaft"
        },
        {
            image: Kursraum,
            description: "Individuell | Praxisnah | Sofort anwendbar",
            mainText: "Mein Kursraum",
            subText: "Praxisnah lernen, individuell betreut - bei mir zählt dein Erfolg"
        },
        {
            image: picture20,
            description: "Stell dir vor, du machst aus deiner Leidenschaft dein Business.\nAlles ist möglich – du musst nur starten",
            mainText: "Deine Zukunft beginnt jetzt",
            subText: ""
        },
        {
            image: picture13,
            description: "Dein Start ins Nageldesign beginnt hier\nSichere dir jetzt deinen Platz!",
            mainText: "Fast am Ziel",
            subText: ""
        }
    ];

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [carouselImages.length]);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
        const target = e.currentTarget;
        target.style.display = 'none';
    };

    const handleIndicatorClick = (index: number): void => {
        setCurrentSlide(index);
    };

    // Swipe Handlers
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(0); // Reset touchEnd
        setTouchStart(e.targetTouches[0].clientX);
        setIsSwiping(true);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) {
            setIsSwiping(false);
            return;
        }

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            // Swipe left - next slide
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        } else if (isRightSwipe) {
            // Swipe right - previous slide
            setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
        }

        setIsSwiping(false);
        setTouchStart(0);
        setTouchEnd(0);
    };

    return (
        // Standard: Original, xl: Angepasst für Laptops, 2xl: Zurück zu Original
        // Standard: Original, xl: Angepasst für Laptops, 2xl: Zurück zu Original
        <section id="home" className="relative w-full overflow-hidden mt-[2.75rem] sm:mt-[2.875rem] md:mt-[3.375rem] lg:mt-[3.625rem] xl:mt-[3.5rem] 2xl:mt-[3.625rem]">
            {/* Mobile: Volle Viewport-Höhe minus Navbar, Desktop: Feste Höhen */}
            <div
                className="relative w-full h-[calc(100vh-2.75rem)] sm:h-[calc(100vh-2.875rem)] md:h-[600px] lg:h-[540px] xl:h-[500px] 2xl:h-[600px]"
                style={{ backgroundColor: '#EAE9E5' }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {carouselImages.map((item, index) => {
                    const isActive = index === currentSlide;

                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-1000 ease-out ${
                                isActive ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="w-full h-full relative" style={{ backgroundColor: '#EAE9E5' }}>

                                {/* Mobile Layout - ORIGINAL bleibt */}
                                <div className="block md:hidden w-full h-full relative">
                                    <div className="absolute inset-0 w-full h-full">
                                        <img
                                            src={item.image}
                                            alt="Nageldesign"
                                            className={`w-full h-full object-cover transition-all duration-1200 ease-out ${
                                                isActive ? 'scale-100 opacity-100' : 'scale-110 opacity-90'
                                            } ${item.image === picture13 ? '' : 'object-center'}`}
                                            style={item.image === picture13 ? { objectPosition: 'center 25%' } : {}}
                                            onError={handleImageError}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <div className="text-center px-6 max-w-md">
                                            <h1 className={`text-3xl sm:text-4xl font-thin text-white mb-4 leading-tight transition-all duration-1000 ease-out ${
                                                isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            } drop-shadow-2xl`}
                                                style={{ transitionDelay: isActive ? '200ms' : '0ms', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                                                {item.mainText}
                                            </h1>

                                            {item.subText && (
                                                <p className={`text-lg sm:text-xl font-light text-white mb-5 leading-relaxed transition-all duration-1000 ease-out ${
                                                    isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                                }`}
                                                   style={{ transitionDelay: isActive ? '400ms' : '0ms', textShadow: '1px 1px 6px rgba(0, 0, 0, 0.8)' }}>
                                                    {item.subText}
                                                </p>
                                            )}

                                            <div
                                                className={`mx-auto mb-5 rounded-full transition-all duration-1000 ease-out ${
                                                    isActive && isLoaded ? 'w-16 sm:w-20 opacity-100' : 'w-0 opacity-0'
                                                } h-1.5`}
                                                style={{
                                                    backgroundColor: '#D5DD48',
                                                    transitionDelay: isActive ? '600ms' : '0ms',
                                                    boxShadow: '0 2px 8px rgba(213, 221, 72, 0.4)'
                                                }}
                                            ></div>

                                            <p className={`text-base sm:text-lg font-light text-white italic transition-all duration-1000 ease-out ${
                                                isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                               style={{ transitionDelay: isActive ? '800ms' : '0ms', textShadow: '1px 1px 6px rgba(0, 0, 0, 0.8)' }}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Layout - xl: Angepasst, 2xl: Zurück zu Original */}
                                <div className="hidden md:block w-full h-full relative">
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-black opacity-10 z-20"></div>

                                    <div className={`absolute top-0 w-1/2 h-full ${index % 2 === 0 ? 'right-0' : 'left-0'}`}>
                                        <img
                                            src={item.image}
                                            alt="Nageldesign"
                                            className={`w-full h-full object-cover transition-all duration-1200 ease-out ${
                                                isActive ? 'scale-100 opacity-100' : 'scale-110 opacity-90'
                                            } ${item.image === picture13 ? '' : 'object-center'}`}
                                            style={item.image === picture13 ? { objectPosition: 'center 25%' } : {}}
                                            onError={handleImageError}
                                        />
                                    </div>

                                    {/* Text-Content: xl kleiner, 2xl zurück zu Original */}
                                    <div className={`absolute top-0 w-1/2 h-full flex items-center justify-center ${index % 2 === 0 ? 'left-0' : 'right-0'}`}>
                                        <div className="text-center px-6 lg:px-8 xl:px-6 2xl:px-12 max-w-md lg:max-w-lg xl:max-w-md 2xl:max-w-lg">
                                            {/* H1: xl kleiner, 2xl zurück */}
                                            <h1 className={`text-3xl lg:text-4xl xl:text-3xl 2xl:text-5xl font-thin text-gray-800 mb-4 xl:mb-3 2xl:mb-6 leading-tight transition-all duration-1000 ease-out ${
                                                isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                                style={{ transitionDelay: isActive ? '200ms' : '0ms' }}>
                                                {item.mainText}
                                            </h1>

                                            {/* Subtext: xl kleiner, 2xl zurück */}
                                            <p className={`text-lg lg:text-xl xl:text-lg 2xl:text-2xl font-light text-gray-600 mb-6 xl:mb-4 2xl:mb-8 leading-relaxed transition-all duration-1000 ease-out ${
                                                isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                               style={{ transitionDelay: isActive ? '400ms' : '0ms' }}>
                                                {item.subText}
                                            </p>

                                            {/* Line: xl kleiner, 2xl zurück */}
                                            <div
                                                className={`mx-auto mb-6 xl:mb-4 2xl:mb-8 rounded-full transition-all duration-1000 ease-out ${
                                                    isActive && isLoaded ? 'w-16 lg:w-20 xl:w-16 2xl:w-20 opacity-100' : 'w-0 opacity-0'
                                                } h-1`}
                                                style={{
                                                    backgroundColor: '#D5DD48',
                                                    transitionDelay: isActive ? '600ms' : '0ms'
                                                }}
                                            ></div>

                                            {/* Description: xl kleiner, 2xl zurück */}
                                            <p className={`text-base lg:text-lg xl:text-base 2xl:text-xl font-light text-gray-500 italic transition-all duration-1000 ease-out ${
                                                isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                               style={{ transitionDelay: isActive ? '800ms' : '0ms' }}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Carousel Indicators: xl angepasst, 2xl zurück */}
                <div className="absolute bottom-4 sm:bottom-6 xl:bottom-4 2xl:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 sm:space-x-4 xl:space-x-3 2xl:space-x-4 z-20">
                    {carouselImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className={`h-1.5 sm:h-1.5 xl:h-1.5 2xl:h-1.5 rounded-full transition-all duration-700 ease-out hover:scale-125 transform ${
                                index === currentSlide
                                    ? 'w-8 sm:w-8 xl:w-7 2xl:w-8 shadow-lg scale-110'
                                    : 'w-1.5 sm:w-1.5 xl:w-1.5 2xl:w-1.5 hover:w-6 sm:hover:w-6 xl:hover:w-5 2xl:hover:w-6 hover:scale-110'
                            }`}
                            style={{
                                backgroundColor: index === currentSlide ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)',
                                border: '0.5px solid rgba(255, 255, 255, 0.8)',
                                boxShadow: index === currentSlide ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none',
                            }}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

                {/* Swipe Indicator - nur auf Mobile sichtbar */}
                <div className="md:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="flex items-center space-x-2 text-white text-xs opacity-60">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <span>Swipe</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HeroCarousel;