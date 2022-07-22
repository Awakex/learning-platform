import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { useAppSelector } from "./hooks/redux";
import { RouteComponents } from "./routers";
import { PrivateRoute } from "./components/PrivateRoute";
import DevPanel from "./components/DevPanel";
import Page404 from "./pages/404";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Service from "./components/Service/Serivce";

export const App = () => {
    const { role } = useAppSelector((state) => state.app);

    return (
        <div className="App">
            <BrowserRouter>
                <Service />
                <Header />
                <DevPanel />
                <Routes>
                    {RouteComponents.map((route) => (
                        <Route
                            key={route.id}
                            path={route.path}
                            element={
                                <PrivateRoute
                                    outlet={route.element}
                                    requiredRolePower={route.requiredRolePower}
                                    userRolePower={role}
                                />
                            }
                        />
                    ))}

                    <Route path="*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>

            <ToastContainer />
        </div>
    );
};
