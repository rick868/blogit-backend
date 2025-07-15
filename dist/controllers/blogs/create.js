"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlog = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const createBlog = async (req, res) => {
    try {
        const { title, synopsis, content, featuredImage } = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: userId missing' });
        }
        const blog = await client_1.default.post.create({
            data: {
                title,
                synopsis,
                content,
                featuredImage,
                userId: userId,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            include: { user: true }
        });
        res.status(201).json(blog);
    }
    catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({ error: 'Failed to create blog' });
    }
};
exports.createBlog = createBlog;
//# sourceMappingURL=create.js.map