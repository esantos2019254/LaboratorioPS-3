import { Router } from "express";
import { check } from "express-validator";
import {
    usersGet,
    usersPost,
    getUserById,
    usersPut
} from "./user.controller.js";
import {
    existsEmail,
    existsUserById
} from "../helpers/db-validator.js";
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router();

router.get("/", usersGet);

router.get(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsUserById),
        validateFields,
    ],
    getUserById
);

router.post(
    "/",
    [
        check("name", "this name is required").not().isEmpty(),
        check("password", "The password must be greater than 6 characters").isLength({min: 6,}),
        check("email", "this email is invalid").isEmail(),
        check("email").custom(existsEmail),
        validateFields,
    ],
    usersPost
);

router.put(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsUserById),
        validateFields,
    ],
    usersPut
);

export default router;