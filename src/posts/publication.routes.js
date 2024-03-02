import { Router } from "express";
import { check } from "express-validator";
import {
    postsGet,
    postsPost,
    postsPut,
    postsDelete,
    getPublicationById
} from './publication.controller.js';
import { existsPublicationById } from "../helpers/db-validator.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", postsGet);

router.get(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsPublicationById),
        validateFields,
    ],
    getPublicationById
);

router.post(
    "/",
    [
        validateJWT,
        check("name", "this name is required").not().isEmpty(),
        validateFields,
    ],
    postsPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsPublicationById),
        validateFields,
    ], postsPut);

router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsPublicationById),
        validateFields,
    ], postsDelete);

export default router;