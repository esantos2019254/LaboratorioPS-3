import { Router } from "express";
import { check } from "express-validator";

import { login } from "../auth/auth.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router();

router.post(
    '/login',
    [
        check('emailOrUserName', 'This email is not valid').notEmpty(),
        check('password', 'The password is required').not().isEmpty(),
        validateFields,
    ], login);

export default router;