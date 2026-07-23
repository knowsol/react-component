import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { iconSidebarMenus } from "@/components/Sidebar/iconSidebarData";
import Layout from "@/layouts/Layout";
import Admin from "@/pages/Admin";
import AdminHome from "@/pages/AdminHome";
import Buttons from "@/pages/Buttons";
import Color from "@/pages/Color";
import Component from "@/pages/Component";
import GNB from "@/pages/GNB";
import Layerpop from "@/pages/Layerpop";
import MainPage from "@/pages/MainPage";
import Tab from "@/pages/Tab";
import Tables from "@/pages/Tables";
import Typography from "@/pages/Typography";

const defaultAdminPath = iconSidebarMenus[0]?.path ?? "/admin/color";

const adminPageComponents = {
    menu1: Color,
    menu2: Typography,
    menu3: Component,
    menu4: Buttons,
    menu5: Tables,
    menu6: GNB,
    menu7: Tab,
    menu8: Layerpop,
};

function RoutePage() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/admin" replace />} />
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<AdminHome />} />
                    {iconSidebarMenus.map((menu) => {
                        const AdminPage = adminPageComponents[menu.id];
                        const relativePath = menu.path.replace("/admin/", "");

                        return (
                            <Route key={menu.id} path={relativePath}>
                                <Route index element={<AdminPage />} />
                                <Route path=":subMenuId" element={<AdminPage />} />
                            </Route>
                        );
                    })}
                    <Route path="*" element={<Navigate to={defaultAdminPath} replace />} />
                </Route>
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
