import fastify from 'fastify';
import path from 'path';
import fs from 'fs';
import { userRoutes } from './routes';

const server = fastify();
console.log('asdasdasdsa')
const loadSchemas = () => {
  const schemaDir = path.join(__dirname, 'schemas');
  const schemas = fs.readdirSync(schemaDir)
    .map(file => path.join(schemaDir, file))
    .filter(filePath => fs.lstatSync(filePath).isFile())
    .map(filePath => JSON.parse(fs.readFileSync(filePath, 'utf8')));
  schemas.forEach(schema => server.addSchema(schema));
};

loadSchemas();
server.register(userRoutes);

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
