import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PatientForm from "./pages/PatientForm";
import Success from "./pages/Success";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patient" element={<PatientForm />} />
            <Route path="/success" element={<Success />} />
        </Routes>
    );
}

export default App;