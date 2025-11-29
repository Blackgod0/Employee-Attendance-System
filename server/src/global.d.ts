import * as express from "express";
import { AuthUser } from "./utils/types/authTypes";

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

export { };
