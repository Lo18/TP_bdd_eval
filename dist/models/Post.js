"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//définir notre schéma
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true, maxlength: 100 },
    content: { type: String, required: true, maxlength: 1000 },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});
postSchema.index({ title: 'text', content: 'text' });
//Créer notre model
const Post = (0, mongoose_1.model)('Post', postSchema);
exports.default = Post;
