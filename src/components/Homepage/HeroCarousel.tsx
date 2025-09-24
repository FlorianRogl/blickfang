import { useState, useEffect } from 'react';

import picture8 from '../../assets/Picture8.jpg'
import picture13 from '../../assets/Picture13.jpg'
import picture16 from '../../assets/Picture16.jpg'
import picture20 from '../../assets/Picture20.jpg'

// Define typ
interface CarouselImage {
    image: string;
    title: string;
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
            title: "Kunstvolle Nageldesigns",
            description: "Einzigartige Kreationen, die Ihre Persönlichkeit widerspiegeln",
            mainText: "Wo Kunst auf Nägel trifft",
            subText: "Verwandeln Sie Ihre Nägel in kleine Kunstwerke"
        },
        {
            image: picture16,
            title: "Professionelle Maniküre",
            description: "Perfekte Pflege mit hochwertigen Produkten",
            mainText: "Perfektion liegt im Detail",
            subText: "Erleben Sie professionelle Nagelpflege auf höchstem Niveau"
        },
        {
            image: picture8,
            title: "Gel & Shellac Behandlung",
            description: "Langanhaltende Farbe und perfekter Glanz",
            mainText: "Langanhaltende Schönheit",
            subText: "Bis zu 4 Wochen perfekter Glanz und Farbe"
        },
        {
            image: picture20,
            title: "Nail Art Designs",
            description: "Individuelle Kunstwerke nach Ihren Wünschen",
            mainText: "Ihre Vision, unsere Kunst",
            subText: "Jeder Nagel ein individuelles Meisterwerk"
        },
        {
            image: picture13,
            title: "French Manicure",
            description: "Klassisch elegant und zeitlos schön",
            mainText: "Zeitlose Eleganz",
            subText: "Der Klassiker, der nie aus der Mode kommt"
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
                className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px] xl:h-[580px]"
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

                                {/* Subtile Trennlinie in der Mitte */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-black opacity-10 z-20"></div>

                                {/* Hintergrundbild - abwechselnd links/rechts */}
                                <div className={`absolute top-0 w-1/2 h-full ${index % 2 === 0 ? 'right-0' : 'left-0'}`}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className={`w-full h-full object-cover object-center transition-all duration-1200 ease-out ${
                                            isActive ? 'scale-100 opacity-100' : 'scale-110 opacity-90'
                                        }`}
                                        onError={handleImageError}
                                    />
                                </div>

                                {/* Text-Content - abwechselnd rechts/links - Responsive für alle Größen */}
                                <div className={`absolute top-0 w-1/2 h-full flex items-center justify-center ${index % 2 === 0 ? 'left-0' : 'right-0'}`}>
                                    <div className="text-center px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                                        <h1 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-thin text-gray-800 mb-2 sm:mb-3 md:mb-4 xl:mb-6 leading-tight transition-all duration-1000 ease-out ${
                                            isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                            style={{ transitionDelay: isActive ? '200ms' : '0ms' }}>
                                            {item.mainText}
                                        </h1>

                                        <p className={`text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-light text-gray-600 mb-3 sm:mb-4 md:mb-6 xl:mb-8 leading-relaxed transition-all duration-1000 ease-out ${
                                            isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                           style={{ transitionDelay: isActive ? '400ms' : '0ms' }}>
                                            {item.subText}
                                        </p>

                                        <div
                                            className={`mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full transition-all duration-1000 ease-out ${
                                                isActive && isLoaded ? 'w-8 sm:w-12 md:w-16 lg:w-20 opacity-100' : 'w-0 opacity-0'
                                            } h-0.5 sm:h-0.5 md:h-1`}
                                            style={{
                                                backgroundColor: '#D5DD48',
                                                transitionDelay: isActive ? '600ms' : '0ms'
                                            }}
                                        ></div>

                                        <p className={`text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-light text-gray-500 italic transition-all duration-1000 ease-out ${
                                            isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                           style={{ transitionDelay: isActive ? '800ms' : '0ms' }}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Carousel Indicators - Responsive Position */}
                <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4 z-10">
                    {carouselImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className={`h-1 sm:h-1.5 rounded-full transition-all duration-700 ease-out hover:scale-125 transform ${
                                index === currentSlide
                                    ? 'w-6 sm:w-8 shadow-lg scale-110'
                                    : 'w-1 sm:w-1.5 hover:w-4 sm:hover:w-6 hover:scale-110'
                            }`}
                            style={{
                                backgroundColor: index === currentSlide ? '#EAE9E5' : 'rgba(234, 233, 229, 0.7)',
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                boxShadow: index === currentSlide ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
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