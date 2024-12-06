"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const projectsRoutes_1 = __importDefault(require("./routes/projectsRoutes"));
const tasksRoutes_1 = __importDefault(require("./routes/tasksRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Créer notre app
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/api', projectsRoutes_1.default);
app.use('/api', tasksRoutes_1.default);
const uri = process.env.URI;
mongoose_1.default.connect(uri)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.log('Error connecting to MongoDB', error);
});
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
