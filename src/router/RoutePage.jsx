import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/layouts/Layout";
import MainPage from "@/pages/MainPage";
import Color from "@/pages/Color";
import Typography from "@/pages/Typography";
import Component from "@/pages/Component";
import Buttons from "@/pages/Buttons";
import Tables from "@/pages/Tables";
import GNB from "@/pages/GNB";
import Tab from "@/pages/Tab";
import Layerpop from "@/pages/Layerpop";
import Admin from "@/pages/Admin";

function RoutePage() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/admin" replace />} />
                <Route path="/admin" element={<Admin />} />
                <Route element={<Layout />}>
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/color" element={<Color />} />
                    <Route path="/typography" element={<Typography />} />
                    <Route path="/component" element={<Component />} />
                    <Route path="/buttons" element={<Buttons />} />
                    <Route path="/table" element={<Tables />} />
                    <Route path="/gnb" element={<GNB />} />
                    <Route path="/tab" element={<Tab />} />
                    <Route path="/layerpop" element={<Layerpop />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutePage;
