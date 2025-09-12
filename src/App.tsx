import { Route, Routes } from "react-router-dom";
import {HelmetProvider} from "@vuer-ai/react-helmet-async";
import Navbar from "./components/Homepage/Navbar.tsx";
import './index.css';
import Homepage from "./components/Homepage.tsx";


function App() {
    return (
        <HelmetProvider>
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Homepage/>} />

            </Routes>
        </div>
        </HelmetProvider>
    );
}

export default App;