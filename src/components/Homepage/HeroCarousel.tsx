import React, { useState, useEffect } from 'react';
import '../../index.css';
import picture5 from '../../assets/picture23.jpg'
import picture15 from '../../assets/Picture15.jpg'
import picture8 from '../../assets/picture22.jpg'
import picture16 from '../../assets/Picture16.jpg'
import picture20 from '../../assets/picture20.jpg'

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

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
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
        }, 5000);

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
        <section id="home" className="relative" style={{ paddingTop: '128px' }}>
            <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
                {carouselImages.map((item, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div className={`flex h-full ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                            {/* Text-Bereich - Beiger Hintergrund */}
                            <div className="w-1/2 flex items-center justify-center relative"
                                 style={{ backgroundColor: '#EAE9E5' }}>
                                {/* Sanfter Übergang zum Bild */}
                                <div className={`absolute ${index % 2 === 1 ? 'left' : 'right'}-0 top-0 h-full w-12 bg-gradient-to-${index % 2 === 1 ? 'l' : 'r'} from-transparent to-black/5`}></div>

                                <div className="text-center px-8 md:px-12 max-w-lg">
                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
                                        {item.mainText}
                                    </h1>
                                    <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                                        {item.subText}
                                    </p>
                                    <div className="w-20 h-1 mx-auto mb-4 rounded-full" style={{ backgroundColor: '#D5DD48' }}></div>
                                    <p className="text-base md:text-lg text-gray-500 italic">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Bild-Bereich */}
                            <div className="w-1/2 relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                    onError={handleImageError}
                                />
                                {/* Sanfter Gradient-Übergang */}
                                <div className={`absolute inset-0 bg-gradient-to-${index % 2 === 1 ? 'r' : 'l'} from-transparent via-transparent to-black/10`}></div>
                                {/* Zusätzlicher sanfter Übergang */}
                                <div className={`absolute ${index % 2 === 1 ? 'right' : 'left'}-0 top-0 h-full w-16 bg-gradient-to-${index % 2 === 1 ? 'l' : 'r'} from-black/10 to-transparent`}></div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Carousel Indicators in Beige */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
                    {carouselImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className={`h-1.5 rounded-full transition-all duration-700 ease-out hover:scale-125 ${
                                index === currentSlide
                                    ? 'w-8 shadow-lg transform scale-110'
                                    : 'w-1.5 hover:w-6'
                            }`}
                            style={{
                                backgroundColor: index === currentSlide ? '#EAE9E5' : 'rgba(234, 233, 229, 0.5)',
                                boxShadow: index === currentSlide ? '0 4px 20px rgba(234, 233, 229, 0.4)' : 'none',
                                border: '1px solid rgba(0, 0, 0, 0.3)'
                            }}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroCarousel;