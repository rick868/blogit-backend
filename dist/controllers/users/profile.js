"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await client_1.default.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                userName: true,
                emailAddress: true
            }
        });
        res.json(user);
    }
    catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=profile.js.map