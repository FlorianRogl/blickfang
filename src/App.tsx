    import { Route, Routes } from "react-router-dom";
    import { HelmetProvider } from "@vuer-ai/react-helmet-async";
    import Navbar from "./components/Homepage/Navbar.tsx";
    import Homepage from "./components/Homepage.tsx";
    import CourseDetailPage from "./components/Homepage/CourseDetailPage.tsx";
    import './index.css';

    function App() {
        return (
            <HelmetProvider>
                <div>
                    {/* Navbar einmal für die ganze App */}
                    <Navbar />

                    <Routes>
                        {/* Homepage Route */}
                        <Route path="/" element={<Homepage />} />

                        <Route path="/course/:courseSlug" element={<CourseDetailPage />} />
                    </Routes>
                </div>
            </HelmetProvider>
        );
    }



    export default App;