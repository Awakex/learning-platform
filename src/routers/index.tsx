import { Roles } from "../types/Roles";
import TaskConstructorContainer from "../components/tasks/task-constructor-container";
import TaskCreate from "../components/tasks/task-create/task-create";
import SetsCreate from "../components/sets/sets-create";
import SetConstructorContainer from "../components/sets/set-constructor-container";

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
    SETS: {
        ROOT: "/sets",
        EDIT: "/sets/edit/:id",
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
        element: <TaskCreate />,
        requiredRolePower: Roles.ADMIN,
    },
    {
        id: 8,
        path: RoutePaths.CONSTRUCTOR.EDIT,
        element: <TaskConstructorContainer />,
        requiredRolePower: Roles.ADMIN,
    },
    {
        id: 9,
        path: RoutePaths.SETS.ROOT,
        element: <SetsCreate />,
        requiredRolePower: Roles.ADMIN,
    },
    {
        id: 10,
        path: RoutePaths.SETS.EDIT,
        element: <SetConstructorContainer />,
        requiredRolePower: Roles.ADMIN,
    },
];
