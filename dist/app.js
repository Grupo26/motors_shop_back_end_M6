"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const handleError_middleware_1 = __importDefault(require("./middleware/handleError.middleware"));
const login_route_1 = __importDefault(require("./routes/login.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const cors_1 = __importDefault(require("cors"));
const vehicle_route_1 = __importDefault(require("./routes/vehicle.route"));
const comments_route_1 = __importDefault(require("./routes/comments.route"));
const commentsPartII_route_1 = __importDefault(require("./routes/commentsPartII.route"));
const corsOptions = {
    origin: ["http://localhost:3000"],
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use("/users", users_route_1.default);
app.use("/login", login_route_1.default);
app.use("/vehicle", vehicle_route_1.default);
app.use("/vehicle", comments_route_1.default);
app.use("/comments", commentsPartII_route_1.default);
app.use(handleError_middleware_1.default);
exports.default = app;
