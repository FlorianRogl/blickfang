import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "@vuer-ai/react-helmet-async";
import Navbar from "./components/Homepage/Navbar.tsx";
import Homepage from "./components/Homepage.tsx";
import CourseDetailPage from "./components/Homepage/CourseDetailPage.tsx";
import './index.css';
import Footer from "./components/Homepage/Footer";
import BookingForm from "./components/Homepage/BookingForm.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import GlobalSnackbar from "./components/GlobalSnackbar.tsx";

function App() {
    return (
        <HelmetProvider>
            <ScrollToTop />
            <GlobalSnackbar />

            <div>
                {/* Navbar einmal für die ganze App */}
                <Navbar />
                <Routes>
                    {/* Homepage Route */}
                    <Route path="/" element={<Homepage />} />
                    <Route path="/booking" element={<BookingForm />} />
                    <Route path="/course/:courseSlug" element={<CourseDetailPage />} />
                </Routes>
                <Footer/>

            </div>
        </HelmetProvider>
    );
}



export default App;