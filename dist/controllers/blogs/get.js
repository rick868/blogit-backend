"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlog = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const getBlog = async (req, res) => {
    try {
        const { postId } = req.params;
        const blog = await client_1.default.post.findFirst({
            where: {
                id: postId,
                isDeleted: false
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                }
            }
        });
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    }
    catch (error) {
        console.error('Get blog error:', error);
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
};
exports.getBlog = getBlog;
//# sourceMappingURL=get.js.map