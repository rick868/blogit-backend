"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { firstName, lastName, userName, emailAddress } = req.body;
        const existingUser = await client_1.default.user.findFirst({
            where: {
                AND: [
                    { id: { not: userId } },
                    { OR: [{ emailAddress }, { userName }] }
                ]
            }
        });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already in use' });
        }
        const updatedUser = await client_1.default.user.update({
            where: { id: userId },
            data: { firstName, lastName, userName, emailAddress },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                userName: true,
                emailAddress: true
            }
        });
        res.json(updatedUser);
    }
    catch (error) {
        console.error('Update user profile error:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=update.js.map