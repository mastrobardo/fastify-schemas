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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const uuid_1 = require("uuid");
const users = [];
const userRoutes = (server) => __awaiter(void 0, void 0, void 0, function* () {
    const userSchema = server.getSchema('user.schema.json');
    const userSchemaDto = server.getSchema('userSchemaDto.json');
    server.get('/users', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        reply.send(users);
    }));
    server.post('/users', {
        schema: {
            body: userSchema
        }
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = Object.assign(Object.assign({}, request.body), { userId: (0, uuid_1.v4)() });
        users.push(newUser);
        reply.status(201).send(newUser);
    }));
    server.put('/users/:userId', {
        schema: {
            body: userSchema
        }
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = request.params;
        const updatedUser = request.body;
        const index = users.findIndex(user => user.userId === userId);
        if (index === -1) {
            reply.status(404).send({ message: 'User not found' });
        }
        else {
            users[index] = updatedUser;
            reply.send(updatedUser);
        }
    }));
    server.post('/users-with-dto', {
        schema: {
            body: userSchemaDto
        }
    }, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = Object.assign(Object.assign({}, request.body), { userId: (0, uuid_1.v4)() });
        users.push(newUser);
        reply.status(201).send(newUser);
    }));
});
exports.userRoutes = userRoutes;
