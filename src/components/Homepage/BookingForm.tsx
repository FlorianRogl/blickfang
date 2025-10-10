import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Mail, User, MapPin } from 'lucide-react';

interface FormData {
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    street: string;
    postalCode: string;
    city: string;
    country: string;
}

interface FormErrors {
    email?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    street?: string;
    postalCode?: string;
    city?: string;
    country?: string;
}

interface CartItem {
    courseTitle: string;
    variant: string;
    price: string;
}

const BookingForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = (location.state?.cartItems || []) as CartItem[];
    const totalPrice = location.state?.totalPrice || '0,00 €';

    const [formData, setFormData] = useState<FormData>({
        email: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        street: '',
        postalCode: '',
        city: '',
        country: 'Österreich'
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = 'E-Mail ist erforderlich';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Ungültige E-Mail-Adresse';
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'Vorname ist erforderlich';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Nachname ist erforderlich';
        }

        if (!formData.birthDate) {
            newErrors.birthDate = 'Geburtsdatum ist erforderlich';
        }

        if (!formData.street.trim()) {
            newErrors.street = 'Straße und Hausnummer sind erforderlich';
        }

        if (!formData.postalCode.trim()) {
            newErrors.postalCode = 'Postleitzahl ist erforderlich';
        }

        if (!formData.city.trim()) {
            newErrors.city = 'Stadt ist erforderlich';
        }

        if (!formData.country.trim()) {
            newErrors.country = 'Land ist erforderlich';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendEmail = async () => {
        // Debug: Zeige was wir haben
        console.log('CartItems:', cartItems);
        console.log('TotalPrice:', totalPrice);

        // Formatiere Warenkorb-Items
        const cartItemsText = cartItems.length > 0
            ? cartItems.map(item =>
                `- ${item.courseTitle} (${item.variant} Paket): ${item.price}`
            ).join('\n')
            : 'Keine Artikel im Warenkorb';

        // Erstelle die E-Mail-Nachricht
        const messageText = `
╔══════════════════════════════════════╗
   NEUE KURSBUCHUNG
╚══════════════════════════════════════╝

📋 KONTAKTDATEN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:          ${formData.firstName} ${formData.lastName}
E-Mail:        ${formData.email}
Geburtsdatum:  ${formData.birthDate}

📍 ADRESSE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.street}
${formData.postalCode} ${formData.city}
${formData.country}

🛒 BESTELLUNG:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${cartItemsText}

💰 GESAMTSUMME: ${totalPrice}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Buchung eingegangen am: ${new Date().toLocaleString('de-DE')}
        `.trim();

        console.log('E-Mail wird gesendet mit:', messageText);

        const emailData = {
            access_key: "b5cd4378-1ef9-4936-8a6d-14ecdf1c892a",
            subject: `🎨 Neue Kursbuchung von ${formData.firstName} ${formData.lastName}`,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            message: messageText
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(emailData)
            });

            const result = await response.json();

            if (result.success) {
                console.log('E-Mail erfolgreich gesendet');
                return true;
            } else {
                console.error('Fehler beim E-Mail-Versand:', result.message);
                return false;
            }
        } catch (error) {
            console.error('Fehler beim E-Mail-Versand:', error);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        const emailSent = await sendEmail();

        setIsSubmitting(false);

        if (emailSent) {
            console.log('Buchungsdaten:', formData);
            console.log('Warenkorb:', cartItems);

            window.scrollTo(0, 0);
            navigate('/', { state: { bookingSuccess: true } });
        } else {
            alert('Es gab ein Problem beim Versenden. Bitte versuche es erneut.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleCancel = () => {
        window.scrollTo(0, 0);
        navigate('/');
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F2F1ED' }}>
            <div className="relative h-[55vh] overflow-hidden">
                <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, #A8B536 0%, #D5DD48 50%, #A8B536 100%)',
                }}>
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                    }}></div>
                </div>

                <div className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-10 blur-2xl"
                     style={{ backgroundColor: '#ffffff' }}></div>
                <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full opacity-10 blur-3xl"
                     style={{ backgroundColor: '#ffffff' }}></div>

                <div className="absolute inset-0 flex items-end pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-white mb-6 leading-tight tracking-tight">
                                Deine{' '}
                                <span className="font-light relative inline-block">
                                    Reservierung
                                    <div className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                                         style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}></div>
                                </span>
                            </h1>

                            <p className="text-xl sm:text-2xl text-white/95 font-light leading-relaxed max-w-3xl mx-auto">
                                Nur noch ein Schritt bis zu deinem Traum-Kurs
                            </p>

                            <div className="mt-8 flex items-center justify-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-light"
                                         style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', color: '#A8B536' }}>
                                        1
                                    </div>
                                    <span className="text-sm font-light text-white/90 hidden sm:inline">Kurs wählen</span>
                                </div>
                                <div className="w-12 h-0.5 bg-white/40"></div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-light"
                                         style={{ backgroundColor: '#ffffff', color: '#A8B536' }}>
                                        2
                                    </div>
                                    <span className="text-sm font-light text-white hidden sm:inline">Reservieren</span>
                                </div>
                                <div className="w-12 h-0.5 bg-white/40"></div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-light bg-white/30 text-white">
                                        3
                                    </div>
                                    <span className="text-sm font-light text-white/70 hidden sm:inline">Bestätigung</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {cartItems.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                        <h3 className="text-xl font-light text-gray-900 mb-4">Deine Auswahl</h3>
                        <div className="space-y-3">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                    <div>
                                        <p className="font-normal text-gray-900">{item.courseTitle}</p>
                                        <p className="text-sm text-gray-600 font-light">{item.variant} Paket</p>
                                    </div>
                                    <p className="font-normal text-gray-900">{item.price}</p>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
                                <span className="text-lg font-normal text-gray-900">Gesamt</span>
                                <span className="text-2xl font-normal text-gray-900">{totalPrice}</span>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
                    <div className="mb-12">
                        <h2 className="text-3xl font-light text-gray-900 mb-8">
                            Persönliche Daten
                            <div className="w-24 h-1 mt-3" style={{ backgroundColor: '#D5DD48' }}></div>
                        </h2>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="flex items-center space-x-2 text-sm font-light text-gray-700 mb-2">
                                        <User className="w-4 h-4" style={{ color: '#A8B536' }} />
                                        <span>Vorname *</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg font-light text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                                            errors.firstName
                                                ? 'border-red-400 focus:ring-red-200'
                                                : 'border-gray-300 focus:ring-opacity-50'
                                        }`}
                                        placeholder="Max"
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-sm text-red-600 font-light">{errors.firstName}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="flex items-center space-x-2 text-sm font-light text-gray-700 mb-2">
                                        <User className="w-4 h-4" style={{ color: '#A8B536' }} />
                                        <span>Nachname *</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg font-light text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                                            errors.lastName
                                                ? 'border-red-400 focus:ring-red-200'
                                                : 'border-gray-300 focus:ring-opacity-50'
                                        }`}
                                        placeholder="Mustermann"
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-sm text-red-600 font-light">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="flex items-center space-x-2 text-sm font-light text-gray-700 mb-2">
                                    <Mail className="w-4 h-4" style={{ color: '#A8B536' }} />
                                    <span>E-Mail *</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg font-light text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                                        errors.email
                                            ? 'border-red-400 focus:ring-red-200'
                                            : 'border-gray-300 focus:ring-opacity-50'
                                    }`}
                                    placeholder="max.mustermann@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600 font-light">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="birthDate" className="flex items-center space-x-2 text-sm font-light text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4" style={{ color: '#A8B536' }} />
                                    <span>Geburtsdatum *</span>
                                </label>
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg font-light text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                                        errors.birthDate
                                            ? 'border-red-400 focus:ring-red-200'
                                            : 'border-gray-300 focus:ring-opacity-50'
                                    }`}
                                />
                                {errors.birthDate && (
                                    <p className="mt-1 text-sm text-red-600 font-light">{errors.birthDate}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-3xl font-light text-gray-900 mb-8">
                            Adresse
                            <div className="w-24 h-1 mt-3" style={{ backgroundColor: '#D5DD48' }}></div>
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="street" className="flex items-center space-x-2 text-sm font-light text-gray-700 mb-2">
                                    <MapPin className="w-4 h-4" style={{ color: '#A8B536' }} />
                                    <span>Straße und Hausnummer *</span>
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg font-light text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                                        errors.street
                                            ? 'border-red-400 focus:ring-red-200'
                                            : 'border-gray-300 focus:ring-opacity-50'
                                    }`}
                                    placeholder="Musterstraße 123"
                                />
                                {errors.street && (
                                    <p className="mt-1 text-sm text-red-600 font-light">{errors.street}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label htmlFor="postalCode" className="block text-sm font-light text-gray-700 mb-2">
                                        Postleitzahl *
                                    </label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg font-light text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                                            errors.postalCode
                                                ? 'border-red-400 focus:ring-red-200'
                                                : 'border-gray-300 focus:ring-opacity-50'
                                        }`}
                                        placeholder="1010"
                                    />
                                    {errors.postalCode && (
                                        <p className="mt-1 text-sm text-red-600 font-light">{errors.postalCode}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label htmlFor="city" className="block text-sm font-light text-gray-700 mb-2">
                                        Stadt *
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg font-light text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                                            errors.city
                                                ? 'border-red-400 focus:ring-red-200'
                                                : 'border-gray-300 focus:ring-opacity-50'
                                        }`}
                                        placeholder="Wien"
                                    />
                                    {errors.city && (
                                        <p className="mt-1 text-sm text-red-600 font-light">{errors.city}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="country" className="block text-sm font-light text-gray-700 mb-2">
                                    Land *
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg font-light text-gray-900 focus:outline-none focus:ring-2 transition-all ${
                                        errors.country
                                            ? 'border-red-400 focus:ring-red-200'
                                            : 'border-gray-300 focus:ring-opacity-50'
                                    }`}
                                    placeholder="Österreich"
                                />
                                {errors.country && (
                                    <p className="mt-1 text-sm text-red-600 font-light">{errors.country}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-4 rounded-lg font-light text-lg text-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            style={{ backgroundColor: '#D5DD48' }}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                                    <span>Wird gesendet...</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Reservierung abschließen</span>
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="px-8 py-4 rounded-lg font-light text-gray-600 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50"
                        >
                            Abbrechen
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 font-light mt-6 text-center">
                        * Pflichtfelder
                    </p>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;