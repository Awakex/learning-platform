import { Roles } from "../types/Roles";
import TaskConstructorContainer from "../components/tasks/task-constructor-container";
import TaskCreate from "../components/tasks/task-create/task-create";
import SetsCreate from "../components/sets/sets-create";
import SetConstructorContainer from "../components/sets/set-constructor-container";
import Player from "../components/player/player";
import { TASKS_CONFIG } from "../components/tasks/config/tasks-config";
import ItemsCreate from "../components/items/items-create";
import ItemConstructorContainer from "../components/items/item-constructor/item-constructor-container";

export const RoutePaths = {
    ROOT: "/",
    APP: {
        GUEST: "/guest",
        USER: "/user",
        MODERATOR: "/moderator",
        ADMINISTRATOR: "/administrator",
        OWNER: "/owner",
    },
    TASKS: {
        ROOT: "/tasks",
        CREATE: "/tasks/create",
        EDIT: "/tasks/edit/:id",
        PLAY: "/tasks/play",
    },
    SETS: {
        ROOT: "/sets",
        EDIT: "/sets/edit/:id",
    },
    PLAYER: {
        ROOT: "/player",
        PLAY_SET: "/play/:setId",
    },
    ITEMS: {
        ROOT: "/items",
        EDIT: "/items/edit/:id",
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
        path: RoutePaths.TASKS.ROOT,
        element: <TaskCreate />,
        requiredRolePower: Roles.ADMIN,
    },
    {
        id: 8,
        path: RoutePaths.TASKS.EDIT,
        element: <TaskConstructorContainer config={TASKS_CONFIG} />,
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
    {
        id: 11,
        path: RoutePaths.PLAYER.ROOT,
        element: <Player />,
        requiredRolePower: Roles.USER,
    },
    {
        id: 12,
        path: RoutePaths.PLAYER.PLAY_SET,
        element: <Player />,
        requiredRolePower: Roles.USER,
    },
    {
        id: 13,
        path: RoutePaths.ITEMS.ROOT,
        element: <ItemsCreate />,
        requiredRolePower: Roles.OWNER,
    },
    {
        id: 14,
        path: RoutePaths.ITEMS.EDIT,
        element: <ItemConstructorContainer />,
        requiredRolePower: Roles.OWNER,
    },
];
