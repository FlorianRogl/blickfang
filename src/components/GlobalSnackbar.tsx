import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, X } from 'lucide-react';

const GlobalSnackbar = () => {
    const location = useLocation();
    const [showSnackbar, setShowSnackbar] = useState(false);

    useEffect(() => {
        // Prüfe ob Buchung erfolgreich war
        if (location.state?.bookingSuccess) {
            setShowSnackbar(true);

            // Event zum Leeren des Warenkorbs
            window.dispatchEvent(new CustomEvent('clearCart'));

            // Auto-Hide nach 5 Sekunden
            const timer = setTimeout(() => {
                setShowSnackbar(false);
            }, 5000);

            // Cleanup: State zurücksetzen
            window.history.replaceState({}, document.title);

            return () => clearTimeout(timer);
        }
    }, [location]);

    if (!showSnackbar) return null;

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[60] animate-slide-up">
            <div
                className="bg-white rounded-xl shadow-xl px-6 py-4 flex items-center space-x-4"
                style={{
                    minWidth: '380px',
                    border: '2px solid #D5DD48'
                }}
            >
                {/* Icon */}
                <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#D5DD48' }}
                >
                    <CheckCircle className="w-6 h-6 text-gray-900" strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h3 className="text-base font-normal text-gray-900 mb-0.5">
                        Kurs erfolgreich gebucht!
                    </h3>
                    <p className="text-sm font-light text-gray-600">
                        Wir melden uns in Kürze bei dir
                    </p>
                </div>

                {/* Close Button */}
                <button
                    onClick={() => setShowSnackbar(false)}
                    className="flex-shrink-0 p-1.5 hover:bg-gray-100 rounded-lg transition-all"
                    aria-label="Schließen"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        </div>
    );
};

export default GlobalSnackbar;