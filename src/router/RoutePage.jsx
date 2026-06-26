import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/layouts/Layout";
import MainPage from "@/pages/MainPage";
import Color from "@/pages/Color";
import Typography from "@/pages/Typography";
import Component from "@/pages/Component";

function RoutePage() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/main" replace />} />
                <Route element={<Layout />}>
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/color" element={<Color />} />
                    <Route path="/typography" element={<Typography />} />
                    <Route path="/component" element={<Component />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutePage;
