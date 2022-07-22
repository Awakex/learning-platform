import { Role } from "./Role";

export interface User {
    _id: number;
    age: number;
    email: string;
    firstName: string;
    lastName: string;
    nickname: string;
    role: Role;
}
