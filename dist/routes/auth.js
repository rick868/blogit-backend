"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = require("../controllers/auth/register");
const login_1 = require("../controllers/auth/login");
const logout_1 = require("../controllers/auth/logout");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
router.post('/register', validation_1.registerRules, validation_1.validateRequest, register_1.register);
router.post('/login', login_1.login);
router.post('/logout', logout_1.logout);
exports.default = router;
//# sourceMappingURL=auth.js.map