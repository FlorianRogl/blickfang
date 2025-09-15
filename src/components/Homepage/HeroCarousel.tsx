import React, { useState, useEffect } from 'react';
import '../../index.css';
import picture5 from '../../assets/picture23.jpg'
import picture15 from '../../assets/Picture15.jpg'
import picture8 from '../../assets/picture22.jpg'
import picture16 from '../../assets/Picture16.jpg'
import picture20 from '../../assets/picture20.jpg'

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const carouselImages = [
        {
            image: picture20,
            title: "Kunstvolle Nageldesigns",
            description: "Einzigartige Kreationen, die Ihre Persönlichkeit widerspiegeln",
            mainText: "Wo Kunst auf Nägel trifft",
            subText: "Verwandeln Sie Ihre Nägel in kleine Kunstwerke"
        },
        {
            image: picture8,
            title: "Professionelle Maniküre",
            description: "Perfekte Pflege mit hochwertigen Produkten",
            mainText: "Perfektion liegt im Detail",
            subText: "Erleben Sie professionelle Nagelpflege auf höchstem Niveau"
        },
        {
            image: picture15,
            title: "Gel & Shellac Behandlung",
            description: "Langanhaltende Farbe und perfekter Glanz",
            mainText: "Langanhaltende Schönheit",
            subText: "Bis zu 4 Wochen perfekter Glanz und Farbe"
        },
        {
            image: picture5,
            title: "Nail Art Designs",
            description: "Individuelle Kunstwerke nach Ihren Wünschen",
            mainText: "Ihre Vision, unsere Kunst",
            subText: "Jeder Nagel ein individuelles Meisterwerk"
        },
        {
            image: picture16,
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

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.currentTarget;
        target.style.display = 'none';
    };

    const handleIndicatorClick = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <section id="home" className="relative overflow-hidden" style={{ paddingTop: '128px' }}>
            <div className="relative w-full h-[500px] md:h-[600px]" style={{ backgroundColor: '#EAE9E5' }}>
                {carouselImages.map((item, index) => {
                    const isActive = index === currentSlide;

                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-1000 ease-out ${
                                isActive ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            {/* Vollbreiter Container mit einheitlichem Hintergrund */}
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

                                {/* Text-Content - abwechselnd rechts/links */}
                                <div className={`absolute top-0 w-1/2 h-full flex items-center justify-center ${index % 2 === 0 ? 'left-0' : 'right-0'}`}>
                                    <div className="text-center px-8 md:px-12 max-w-lg">
                                        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight transition-all duration-1000 ease-out ${
                                            isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                            style={{ transitionDelay: isActive ? '200ms' : '0ms' }}>
                                            {item.mainText}
                                        </h1>

                                        <p className={`text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed transition-all duration-1000 ease-out ${
                                            isActive && isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                           style={{ transitionDelay: isActive ? '400ms' : '0ms' }}>
                                            {item.subText}
                                        </p>

                                        <div
                                            className={`mx-auto mb-4 rounded-full transition-all duration-1000 ease-out ${
                                                isActive && isLoaded ? 'w-20 opacity-100' : 'w-0 opacity-0'
                                            } h-1`}
                                            style={{
                                                backgroundColor: '#D5DD48',
                                                transitionDelay: isActive ? '600ms' : '0ms'
                                            }}
                                        ></div>

                                        <p className={`text-base md:text-lg text-gray-500 italic transition-all duration-1000 ease-out ${
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

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
                    {carouselImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className={`h-1.5 rounded-full transition-all duration-700 ease-out hover:scale-125 transform ${
                                index === currentSlide
                                    ? 'w-8 shadow-lg scale-110'
                                    : 'w-1.5 hover:w-6 hover:scale-110'
                            }`}
                            style={{
                                backgroundColor: index === currentSlide ? '#EAE9E5' : 'rgba(234, 233, 229, 0.7)',
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                boxShadow: index === currentSlide ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
                            }}
                        ></button>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default HeroCarousel;