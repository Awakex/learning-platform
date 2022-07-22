import { Roles } from "../types/Roles";
import TaskConstructorContainer from "../components/task-constructor/task-constructor-container";
import TaskConstructorPage from "../pages/task-constructor-page";

export const RoutePaths = {
    ROOT: "/",
    APP: {
        GUEST: "/guest",
        USER: "/user",
        MODERATOR: "/moderator",
        ADMINISTRATOR: "/administrator",
        OWNER: "/owner",
    },
    CONSTRUCTOR: {
        ROOT: "/constructor",
        CREATE: "/constructor/create",
        EDIT: "/constructor/edit/:id",
        PLAY: "/constructor/play",
    },
};

export const RouteComponents = [
    { id: 1, path: RoutePaths.ROOT, element: <p>ROOT PATH</p>, requiredRolePower: Roles.GUEST },
    { id: 2, path: RoutePaths.APP.GUEST, element: <p>GUEST</p>, requiredRolePower: Roles.GUEST },
    { id: 3, path: RoutePaths.APP.USER, element: <p>USER</p>, requiredRolePower: Roles.USER },
    {
        id: 4,
        path: RoutePaths.APP.MODERATOR,
        element: <p>MODERATOR</p>,
        requiredRolePower: Roles.MODERATOR,
    },
    {
        id: 5,
        path: RoutePaths.APP.ADMINISTRATOR,
        element: <p>ADMINISTRATOR</p>,
        requiredRolePower: Roles.ADMIN,
    },
    { id: 6, path: RoutePaths.APP.OWNER, element: <p>OWNER</p>, requiredRolePower: Roles.OWNER },
    {
        id: 7,
        path: RoutePaths.CONSTRUCTOR.ROOT,
        element: <TaskConstructorPage />,
        requiredRolePower: Roles.ADMIN,
    },
    {
        id: 8,
        path: RoutePaths.CONSTRUCTOR.EDIT,
        element: <TaskConstructorContainer />,
        requiredRolePower: Roles.ADMIN,
    },
];
