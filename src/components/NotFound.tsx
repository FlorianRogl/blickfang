import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <>
            <SEO
                title="Seite nicht gefunden - 404"
                description="Die gesuchte Seite konnte nicht gefunden werden."
                noindex={true}
            />

            <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    {/* 404 Grafik */}
                    <div className="mb-8">
                        <h1 className="text-9xl font-thin text-gray-300">404</h1>
                    </div>

                    {/* Nachricht */}
                    <div className="space-y-4 mb-8">
                        <h2 className="text-3xl font-light text-gray-800">
                            Seite nicht gefunden
                        </h2>
                        <p className="text-gray-600 text-lg font-light">
                            Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
                        </p>
                    </div>

                    {/* Aktionen */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-gray-900 transition-all duration-300 hover:scale-105"
                            style={{ backgroundColor: '#D5DD48' }}
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Zur Startseite
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-300 transition-all duration-300 hover:border-gray-400"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Zurück
                        </button>
                    </div>

                    {/* Hilfreiche Links */}
                    <div className="mt-12 pt-8 border-t border-gray-300">
                        <p className="text-sm text-gray-600 mb-4">Vielleicht interessiert Sie:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link to="/#services" className="text-sm text-gray-700 hover:text-gray-900 underline">
                                Unsere Kurse
                            </Link>
                            <Link to="/#about" className="text-sm text-gray-700 hover:text-gray-900 underline">
                                Über uns
                            </Link>
                            <Link to="/#contact" className="text-sm text-gray-700 hover:text-gray-900 underline">
                                Kontakt
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;