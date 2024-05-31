import { FastifyInstance } from 'fastify';
import { UserSchemaJson as UserSchema } from './types/user.schema';
import { v4 as uuidv4 } from 'uuid';
import { UserSchemaDtoJson } from './types/user-dto.schema';

const users: UserSchema[] = [];

export const userRoutes = async (server: FastifyInstance) => {
  const userSchema = server.getSchema('user.schema.json');
  const userSchemaDto = server.getSchema('userSchemaDto.json');
  
  server.get<{ Reply: UserSchema[] }>('/users', async (request, reply) => {
    reply.send(users);
  });

  server.post<{ Body: UserSchema }>('/users', {
    schema: {
      body: userSchema
    }
  }, async (request, reply) => {
    const newUser = { ...request.body as UserSchema, userId: uuidv4() };
    users.push(newUser);
    reply.status(201).send(newUser);
  });

  server.put<{ Params: { userId: string }, Body: UserSchema }>('/users/:userId', {
    schema: {
      body: userSchema
    }
  }, async (request, reply) => {
    const { userId } = request.params;
    const updatedUser = request.body;
    const index = users.findIndex(user => user.userId === userId);

    if (index === -1) {
      reply.status(404).send({ message: 'User not found' });
    } else {
      users[index] = updatedUser;
      reply.send(updatedUser);
    }
  });

  server.post<{ Body: UserSchemaDtoJson }>('/users-with-dto', {
    schema: {
      body: userSchemaDto
    }
  }, async (request, reply) => {
    const newUser = { ...request.body, userId: uuidv4() };
    users.push(newUser);
    reply.status(201).send(newUser);
  });
};
