import React from "react";
import { useAppSelector } from "../hooks/redux";
import { Link } from "react-router-dom";
import { RoutePaths } from "../routers";

const DevPanel = () => {
    const { isAuthenticated, role, user } = useAppSelector((state) => state.app);
    return (
        <div className="devpanel">
            <div>
                <p>DEV PANEL</p>
                <p>Авторизация: {isAuthenticated.toString()}</p>
                <p>
                    USER: {user?.firstName} {user?.lastName}
                </p>
                <p>ROLE: {role}</p>
            </div>

            <div>
                <p>Навигация:</p>
                <Link to={RoutePaths.APP.GUEST}>GUEST</Link>
                <Link to={RoutePaths.APP.USER}>USER</Link>
                <Link to={RoutePaths.APP.MODERATOR}>MODERATOR</Link>
                <Link to={RoutePaths.APP.ADMINISTRATOR}>ADMINISTRATOR</Link>
                <Link to={RoutePaths.APP.OWNER}>OWNER</Link>
                <Link to={RoutePaths.TASKS.ROOT}>TASKS</Link>
                <Link to={RoutePaths.SETS.ROOT}>SETS</Link>
                <Link to={RoutePaths.ITEMS.ROOT}>ITEMS</Link>
                <Link to={RoutePaths.STORIES.CREATE}>STORIES</Link>
            </div>
        </div>
    );
};

export default DevPanel;
