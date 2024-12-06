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
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, age } = req.body;
        if (!name || !email || !password || !age) {
            return res.status(400).json({
                message: 'Name, email, password and age are required'
            });
        }
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({
                message: 'Email already used'
            });
        }
        const newUser = new User_1.default({ name, email, password, age });
        const savedUser = yield newUser.save();
        const token = (0, jwt_1.generateToken)(savedUser._id);
        res.status(201).json({ message: 'User created successfully', token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        const token = (0, jwt_1.generateToken)(user._id);
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.login = login;
/*import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response): Promise<any> => {
    try{
        const {name, email, password, age} = req.body;
        if (!name || !email || !password || !age) {
            return res.status(400).json({
                message : 'Name, email, age and password are required'
            })
        }
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({
                message : 'Email already used'
            })
        }
        const newUser=new User({name, email, password, age});
        const savedUser: any = await newUser.save();
        const token = generateToken(savedUser._id as string);

        res.status(201).json({message:'User created successfully', token});
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
}

export const login = async (req: Request, res: Response): Promise<any> => {
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message : 'Email and password are required'
            })
        }
        const user = await User.findOne({email});
        if (!user){
            return res.status(404).json({
                message : 'User not found'
            })
        }
        const isMatch = await User.findOne({password});
        if (!isMatch){
            return res.status(401).json({
                message : 'Invalid credentials'
            })
        }
        const token = generateToken(user._id as string);
        res.status(200).json({message: 'login successfully', token});
    } catch (error:any) {
        res.status(500).json({message: error.message})
    }
}*/ 
