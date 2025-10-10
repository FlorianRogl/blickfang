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

    const carouselImages: CarouselImage[] = [
        {
            image: picture20,
            description: "Hier beginnt dein Weg zu schönen Nägeln & deinem eigenen Business.",
            mainText: "Willkommen in der Welt des Nageldesigns ✨",
            subText: ""
        },
        {
            image: picture13,
            description: "ich begleite dich Schritt für Schritt bis ans Ziel.",
            mainText: "Hi, ich bin Adriana 👋",
            subText: "Nageldesignerin & Trainerin aus Leidenschaft"
        },
        {
            image: Kursraum,
            description: "💅 Individuell | 📚 Praxisnah | 🚀 Sofort anwendbar",
            mainText: "Mein Kusraum",
            subText: "Praxisnah lernen, individuell betreut - bei mir zählt dein Erfolg"
        },
        {
            image: picture20,
            description: "Stell dir vor, du machst aus deiner Leidenschaft dein Business.\n" +
                "Alles ist möglich – du musst nur starten",
            mainText: "Deine Zukunft beginnt jetzt",
            subText: ""
        },
        {
            image: picture13,
            description: "Dein Start ins Nageldesign beginnt hier 💖\n" +
                "Sichere dir jetzt deinen Platz!",
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

    return (
        <section id="home" className="relative overflow-hidden mt-[2.75rem] sm:mt-[2.875rem] md:mt-[3.375rem] lg:mt-[3.625rem]">
            <div
                className="relative w-full h-[550px] sm:h-[600px] md:h-[580px] lg:h-[650px] xl:h-[720px]"
                style={{ backgroundColor: '#EAE9E5' }}
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
                            {/* Container mit einheitlichem Hintergrund */}
                            <div className="w-full h-full relative" style={{ backgroundColor: '#EAE9E5' }}>

                                {/* Mobile Layout: Vollbild mit Overlay Text */}
                                <div className="block md:hidden w-full h-full relative">
                                    {/* Vollbild Hintergrundbild für Mobile */}
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
                                        {/* Dunkler Overlay für bessere Textlesbarkeit */}
                                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                                    </div>

                                    {/* Overlay Text für Mobile */}
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <div className="text-center px-6 max-w-md">
                                            <h1 className={`text-3xl sm:text-4xl font-thin text-white mb-4 leading-tight transition-all duration-1000 ease-out ${
                                                isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            } drop-shadow-2xl`}
                                                style={{ transitionDelay: isActive ? '200ms' : '0ms', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                                                {item.mainText}
                                            </h1>

                                            {item.subText && (
                                                <p className={`text-base sm:text-lg font-light text-white mb-5 leading-relaxed transition-all duration-1000 ease-out ${
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

                                {/* Desktop Layout: Split View (ab md) */}
                                <div className="hidden md:block w-full h-full relative">
                                    {/* Subtile Trennlinie in der Mitte */}
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-black opacity-10 z-20"></div>

                                    {/* Hintergrundbild - abwechselnd links/rechts */}
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

                                    {/* Text-Content - abwechselnd rechts/links */}
                                    <div className={`absolute top-0 w-1/2 h-full flex items-center justify-center ${index % 2 === 0 ? 'left-0' : 'right-0'}`}>
                                        <div className="text-center px-6 lg:px-8 xl:px-12 max-w-md lg:max-w-lg">
                                            <h1 className={`text-2xl lg:text-3xl xl:text-4xl font-thin text-gray-800 mb-4 xl:mb-6 leading-tight transition-all duration-1000 ease-out ${
                                                isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                                style={{ transitionDelay: isActive ? '200ms' : '0ms' }}>
                                                {item.mainText}
                                            </h1>

                                            <p className={`text-base lg:text-lg xl:text-xl font-light text-gray-600 mb-6 xl:mb-8 leading-relaxed transition-all duration-1000 ease-out ${
                                                isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                            }`}
                                               style={{ transitionDelay: isActive ? '400ms' : '0ms' }}>
                                                {item.subText}
                                            </p>

                                            <div
                                                className={`mx-auto mb-6 xl:mb-8 rounded-full transition-all duration-1000 ease-out ${
                                                    isActive && isLoaded ? 'w-16 lg:w-20 opacity-100' : 'w-0 opacity-0'
                                                } h-1`}
                                                style={{
                                                    backgroundColor: '#D5DD48',
                                                    transitionDelay: isActive ? '600ms' : '0ms'
                                                }}
                                            ></div>

                                            <p className={`text-sm lg:text-base xl:text-lg font-light text-gray-500 italic transition-all duration-1000 ease-out ${
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

                {/* Carousel Indicators - Responsive Position */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 sm:space-x-4 z-20">
                    {carouselImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className={`h-1.5 sm:h-1.5 rounded-full transition-all duration-700 ease-out hover:scale-125 transform ${
                                index === currentSlide
                                    ? 'w-8 sm:w-8 shadow-lg scale-110'
                                    : 'w-1.5 sm:w-1.5 hover:w-6 sm:hover:w-6 hover:scale-110'
                            }`}
                            style={{
                                backgroundColor: index === currentSlide ? '#EAE9E5' : 'rgba(234, 233, 229, 0.8)',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                boxShadow: index === currentSlide ? '0 4px 20px rgba(0, 0, 0, 0.2)' : 'none',
                            }}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HeroCarousel;