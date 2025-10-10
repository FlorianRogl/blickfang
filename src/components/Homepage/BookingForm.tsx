import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const BookingForm = () => {
    const navigate = useNavigate();
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

    // Scroll nach oben beim Laden der Komponente
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log('Buchungsdaten:', formData);

        // Sofort zur Homepage navigieren mit Buchungsbestätigung
        window.scrollTo(0, 0);
        navigate('/', { state: { bookingSuccess: true } });
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
                {/* Animated Background */}
                <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, #A8B536 0%, #D5DD48 50%, #A8B536 100%)',
                }}>
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
                    }}></div>
                </div>

                {/* Decorative Elements */}
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

                            {/* Progress Indicator */}
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
                            className="flex-1 py-4 rounded-lg font-light text-lg text-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] flex items-center justify-center space-x-2"
                            style={{ backgroundColor: '#D5DD48' }}
                        >
                            <CheckCircle className="w-5 h-5" />
                            <span>Reservierung abschließen</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-8 py-4 rounded-lg font-light text-gray-600 hover:bg-gray-100 transition-all duration-200"
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