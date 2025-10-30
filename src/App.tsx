import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "@vuer-ai/react-helmet-async";
import Navbar from "./components/Homepage/Navbar.tsx";
import Homepage from "./components/Homepage.tsx";
import './index.css';
import Footer from "./components/Homepage/Footer";
import BookingForm from "./components/Homepage/BookingForm.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import GlobalSnackbar from "./components/GlobalSnackbar.tsx";
import RussianManicureCourse from "./components/Homepage/courses/RussionManicureCourse.tsx";
import FastTipsCourse from "./components/Homepage/courses/FastTipsCourse.tsx";
import IndividualCourse from "./components/Homepage/courses/IndividualCourse.tsx";
import BasisCourse from "./components/Homepage/courses/BasisCourse.tsx";
import Impressum from "./components/Homepage/Impressum.tsx";

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
                    <Route path="/impressum" element={<Impressum />} />

                    {/* Course Detail Route */}
                    <Route path="/course/gel-nails-grundkurs" element={<BasisCourse />} />
                    <Route path="/course/russian-manicure" element={<RussianManicureCourse />} />
                    <Route path="/course/fast-tips-dual-tips" element={<FastTipsCourse />} />
                    <Route path="/course/individual-perfection-course" element={<IndividualCourse />} />
                </Routes>
                <Footer/>
            </div>
        </HelmetProvider>
    );
}

export default App;