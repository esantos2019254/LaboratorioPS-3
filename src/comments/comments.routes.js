import { Router } from "express";
import { check } from "express-validator";
import {
    commentsGet,
    commentsPost,
    commentsPut,
    commentDelete,
    getCommentById
} from './comment.controller.js';
import { existsCommentById } from "../helpers/db-validator.js";
import {
    validateFields
} from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", commentsGet);

router.get(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsCommentById),
        validateFields,
    ],
    getCommentById
);

router.post(
    "/",
    [
        validateJWT,
        check("comment", "this comment is required").not().isEmpty(),
        check("publicationId", "this id is required").not().isEmpty(),
        validateFields,
    ],
    commentsPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsCommentById),
        validateFields,
    ], commentsPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsCommentById),
        validateFields,
    ], commentDelete
);

export default router;