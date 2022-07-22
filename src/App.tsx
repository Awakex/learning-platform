import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { useAppSelector } from "./hooks/redux";
import { RouteComponents } from "./routers";
import { PrivateRoute } from "./components/private-route";
import DevPanel from "./components/dev-panel";
import Page404 from "./pages/404";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/header";
import Service from "./components/service/serivce";

export const App = () => {
    const { role } = useAppSelector((state) => state.app);

    return (
        <React.Fragment>
            <BrowserRouter>
                <Service />
                <Header />
                <DevPanel />
                <div className="container">
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
                </div>
            </BrowserRouter>

            <ToastContainer />
        </React.Fragment>
    );
};
