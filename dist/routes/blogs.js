"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const create_1 = require("../controllers/blogs/create");
const list_1 = require("../controllers/blogs/list");
const get_1 = require("../controllers/blogs/get");
const update_1 = require("../controllers/blogs/update");
const delete_1 = require("../controllers/blogs/delete");
const router = (0, express_1.Router)();
router.get('/', list_1.getAllBlogs);
router.post('/', auth_1.authenticate, create_1.createBlog);
router.get('/:blogId', get_1.getBlog);
router.patch('/:blogId', auth_1.authenticate, update_1.updateBlog);
router.delete('/:blogId', auth_1.authenticate, delete_1.deleteBlog);
exports.default = router;
//# sourceMappingURL=blogs.js.map