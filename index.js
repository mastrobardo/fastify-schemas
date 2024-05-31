"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const routes_1 = require("./routes");
const server = (0, fastify_1.default)();
const loadSchemas = () => {
    const schemaDir = path_1.default.join(__dirname, 'schemas');
    const schemas = fs_1.default.readdirSync(schemaDir)
        .map(file => path_1.default.join(schemaDir, file))
        .filter(filePath => fs_1.default.lstatSync(filePath).isFile()) // Ensure it's a file
        .map(filePath => JSON.parse(fs_1.default.readFileSync(filePath, 'utf8')));
    schemas.forEach(schema => server.addSchema(schema));
};
loadSchemas();
server.register(routes_1.userRoutes);
server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
