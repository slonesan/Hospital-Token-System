import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TrackPatient from "./pages/TrackPatient";
import AdminDashboard from "./pages/AdminDashboard";
import AdminGate from "./components/admin/AdminGate";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/hello" element={<h1>Hello</h1>} />

            <Route path="/track/:token" element={<TrackPatient />} />

            <Route
                path="/dashboard"
                element={
                    <AdminGate>
                        <AdminDashboard />
                    </AdminGate>
                }
            />
        </Routes>
    );
}

export default App;