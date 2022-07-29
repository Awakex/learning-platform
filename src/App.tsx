import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { RouteComponents } from "./routers";
import { PrivateRoute } from "./components/private-route";
import Page404 from "./pages/404";
import { ToastContainer } from "react-toastify";
import Header from "./components/header/header";
import Service from "./components/service/serivce";
import { toggleAppLoading } from "./store/app/app-slice";
import jwtDecode from "jwt-decode";
import { loadUser } from "./store/app/app-thunk";
import { Spin } from "antd";

export const App = () => {
    const { role, isAppLoading } = useAppSelector((state) => state.app);

    return (
        <React.Fragment>
            <BrowserRouter>
                <Service />
                <Header />
                {isAppLoading ? (
                    <Spin tip="Загрузка PROJECT W" size={"large"} />
                ) : (
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
                )}
            </BrowserRouter>

            <ToastContainer />
        </React.Fragment>
    );
};
