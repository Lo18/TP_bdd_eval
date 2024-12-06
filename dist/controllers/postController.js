"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPost = exports.deletePost = exports.updatePost = exports.getPostById = exports.createPost = exports.getAllPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Post_1.default.find().populate("author");
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllPosts = getAllPosts;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            return res.status(400).json({
                message: 'Title, content and author are required'
            });
        }
        const userExists = yield User_1.default.findById(author);
        if (!userExists) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const post = new Post_1.default({ title, content, author });
        const savedPost = yield post.save();
        res.status(201).json({
            message: 'Post created successfully',
            user: savedPost
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: 'Existe deja'
            });
        }
        console.log(error);
        return res.status(500).json({
            message: 'Error creating post',
            error: error.message
        });
    }
});
exports.createPost = createPost;
//
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const { id } = req.params;
        const user = yield User_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post updated successfully', user: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully', user: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deletePost = deletePost;
const searchPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q, startDate, endDate, sort = 'createdAt', order = 'asc', page, limit } = req.query;
        const filter = {};
        if (q) {
            filter.$text = { $search: q };
        }
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate);
            }
        }
        const sortOrder = { [sort]: order === 'asc' ? 1 : -1 };
        const skip = (Number(page) - 1) * Number(limit);
        const posts = yield Post_1.default.find(filter)
            .sort(sortOrder)
            .skip(skip)
            .limit(Number(limit))
            .populate("author");
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.searchPost = searchPost;
