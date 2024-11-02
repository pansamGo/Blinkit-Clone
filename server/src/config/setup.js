import AdminJS from "adminjs";
import AdminJSFastify from "@adminjs/fastify";
import * as AdminJSMongoose from "@adminjs/mongoose";
import * as Models from "../models/index.js";
import { authenticate, COOKIE_PASSWORD, sessionStore } from "./config.js";
import { dark, light } from "@adminjs/themes";

AdminJS.registerAdapter(AdminJSMongoose);

export const admin = new AdminJS({
    resources: [
        {
            resource: Models.Customer,
            options: {
                listProperties: ["phone", "role", "isActivated"],
                filterProperties: ["phone", "role"],
            },
        },
        {
            resource: Models.DeliveryPartner,
            options: {
                listProperties: ["email", "role", "isActivated"],
                filterProperties: ["email", "role"],
            },
        },
        {
            resource: Models.Admin,
            options: {
                listProperties: ["email", "password", "role", "isActivated"],
                filterProperties: ["email", "role"],
            },
        },
        { resource: Models.Branch},
        { resource: Models.Category},
        { resource: Models.Product},
        { resource: Models.Counter},
        { resource: Models.Order},
    ],

    branding: {
        companyName: "BlinkIt",
        withMadeWithLove: false,
        favicon: "https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/ozrgpc6hulbfxyi1zeqd",
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light],
    rootPath: "/admin",
});

export const buildAdminRouter = async (app) => {
    await AdminJSFastify.buildAuthenticatedRouter(
        admin,
        {
            authenticate,
            cookiePassword: COOKIE_PASSWORD,
            cookieName: "adminjs",  
        },
        app,
        {
            store: sessionStore,
            saveUninitialized: true,
            secret: COOKIE_PASSWORD,
            cookie: {
                httpOnly: process.env.NODE_ENV === "production",
                secure: process.env.NODE_ENV === "production",
            }
        }
    )
}