"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const auth_1 = require("../../utils/auth");
const updatePassword = async (req, res) => {
    try {
        const userId = req.userId;
        const { currentPassword, newPassword } = req.body;
        const user = await client_1.default.user.findUnique({ where: { id: userId } });
        if (!user || !(await (0, auth_1.comparePasswords)(currentPassword, user.password))) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }
        const hashedPassword = await (0, auth_1.hashPassword)(newPassword);
        await client_1.default.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });
        res.json({ message: 'Password updated successfully' });
    }
    catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({ error: 'Failed to update password' });
    }
};
exports.updatePassword = updatePassword;
//# sourceMappingURL=password.js.map