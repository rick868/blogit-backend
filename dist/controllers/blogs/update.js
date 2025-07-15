"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const updateBlog = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;
        const { title, synopsis, content, featuredImage } = req.body;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: userId missing' });
        }
        const blog = await client_1.default.post.findFirst({
            where: {
                id: postId,
                userId: userId,
                isDeleted: false
            }
        });
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found or unauthorized' });
        }
        const updatedBlog = await client_1.default.post.update({
            where: { id: postId },
            data: {
                title: title || blog.title,
                synopsis: synopsis || blog.synopsis,
                content: content || blog.content,
                featuredImage: featuredImage || blog.featuredImage
            },
            include: { user: true }
        });
        res.json(updatedBlog);
    }
    catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({ error: 'Failed to update blog' });
    }
};
exports.updateBlog = updateBlog;
//# sourceMappingURL=update.js.map