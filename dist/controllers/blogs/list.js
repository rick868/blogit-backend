"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBlogs = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await client_1.default.post.findMany({
            where: { isDeleted: false },
            include: { user: true }
        });
        res.json(blogs);
    }
    catch (error) {
        console.error('List blogs error:', error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};
exports.getAllBlogs = getAllBlogs;
//# sourceMappingURL=list.js.map