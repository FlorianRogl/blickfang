import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "@vuer-ai/react-helmet-async";
import './index.css';
import { Analytics } from '@vercel/analytics/react';

// Eager Loading für kritische Komponenten
import Navbar from "./components/Homepage/Navbar.tsx";
import Footer from "./components/Homepage/Footer";
import ScrollToTop from "./components/ScrollToTop.tsx";
import GlobalSnackbar from "./components/GlobalSnackbar.tsx";

// Lazy Loading für alle Routen-Komponenten
const Homepage = lazy(() => import("./components/Homepage.tsx"));
const BookingForm = lazy(() => import("./components/Homepage/BookingForm.tsx"));
const Impressum = lazy(() => import("./components/Homepage/Impressum.tsx"));
const RussianManicureCourse = lazy(() => import("./components/Homepage/courses/RussianManicureCourse.tsx"));
const FastTipsCourse = lazy(() => import("./components/Homepage/courses/FastTipsCourse.tsx"));
const IndividualCourse = lazy(() => import("./components/Homepage/courses/IndividualCourse.tsx"));
const BasisCourse = lazy(() => import("./components/Homepage/courses/BasisCourse.tsx"));
const NotFound = lazy(() => import("./components/NotFound.tsx"));

// Optimierter Loading Component
const LoadingFallback = () => (
    <div 
        className="min-h-screen flex items-center justify-center" 
        style={{ backgroundColor: '#F5F4F0' }}
    >
        <div className="text-center">
            <div 
                className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                style={{ 
                    borderColor: '#D5DD48', 
                    borderTopColor: 'transparent' 
                }}
                role="status"
                aria-label="Lädt"
            ></div>
            <p className="text-gray-600 font-light text-sm">Lädt...</p>
        </div>
    </div>
);

function App() {
    return (
        <HelmetProvider>
            <ScrollToTop />
            <GlobalSnackbar />

            <div className="flex flex-col min-h-screen">
                {/* Navbar - wird sofort geladen */}
                <Navbar />
                
                {/* Main Content mit Lazy Loading */}
                <main className="flex-grow">
                    <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                            {/* Homepage Route */}
                            <Route path="/" element={<Homepage />} />
                            
                            {/* Booking Route */}
                            <Route path="/booking" element={<BookingForm />} />
                            
                            {/* Legal Route */}
                            <Route path="/impressum" element={<Impressum />} />

                            {/* Course Detail Routes */}
                            <Route 
                                path="/course/gel-nails-grundkurs" 
                                element={<BasisCourse />} 
                            />
                            <Route 
                                path="/course/russian-manicure" 
                                element={<RussianManicureCourse />} 
                            />
                            <Route 
                                path="/course/fast-tips-dual-tips" 
                                element={<FastTipsCourse />} 
                            />
                            <Route 
                                path="/course/individual-perfection-course" 
                                element={<IndividualCourse />} 
                            />
                            
                            {/* 404 Route - Muss immer als letztes kommen */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </main>
                
                {/* Footer - wird sofort geladen */}
                <Footer/>
                <Analytics/>
            </div>
        </HelmetProvider>
    );
}

export default App;
