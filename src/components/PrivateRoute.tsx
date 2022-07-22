import React from "react";
import { Navigate } from "react-router-dom";

interface IProps {
    outlet: JSX.Element;
    requiredRolePower: number;
    userRolePower: number;
}

export const PrivateRoute = ({ outlet, requiredRolePower, userRolePower }: IProps) => {
    if (userRolePower >= requiredRolePower) {
        return outlet;
    } else {
        return <Navigate to={{ pathname: "/" }} />;
    }
};
