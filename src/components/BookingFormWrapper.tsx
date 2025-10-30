// BookingFormWrapper.tsx - SEO-optimierte Version
import { useLocation } from 'react-router-dom';
import SEO from './SEO';
import {breadcrumbSchema} from "@components/utils/schemas.ts";


// Import der originalen BookingForm (anpassen an deine Struktur)
// import BookingForm from './Homepage/BookingForm';

// Für die Implementierung: Entweder die BookingForm-Logik hier einfügen
// oder als Wrapper nutzen

const BookingFormWrapper = () => {
    const location = useLocation();
    const cartItems = (location.state?.cartItems || []) as Array<{courseTitle: string}>;
    
    const breadcrumbs = breadcrumbSchema([
        { name: 'Home', url: 'https://blickfang-nagelstudio.at/' },
        { name: 'Kursbuchung', url: 'https://blickfang-nagelstudio.at/booking' }
    ]);

    // SEO Description basierend auf Warenkorb
    const getDescription = () => {
        if (cartItems.length > 0) {
            const courseNames = cartItems.map(item => item.courseTitle).join(', ');
            return `Buche jetzt deinen Nageldesign-Kurs: ${courseNames}. Einfache Online-Buchung bei blickfang Nagelstudio.`;
        }
        return "Buche jetzt deinen Nageldesign-Kurs bei blickfang. Einfache Online-Buchung für Gel-Nägel Grundkurs, Russian Manicure und weitere professionelle Kurse.";
    };

    return (
        <>
            <SEO
                title="Kursbuchung - Nageldesign Kurse buchen"
                description={getDescription()}
                canonicalUrl="https://blickfang-nagelstudio.at/booking"
                keywords="Kurs buchen, Nageldesign Kurs buchen, Online Buchung Nagelstudio, blickfang buchen"
                structuredData={breadcrumbs}
                noindex={false}
            />
            
            {/* Hier deine originale BookingForm-Komponente einbinden */}
            {/* <BookingForm /> */}
        </>
    );
};

export default BookingFormWrapper;
