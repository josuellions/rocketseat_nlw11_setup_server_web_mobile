import Fastify from "fastify";
import cors from '@fastify/cors';

import { appRoutes } from "./routes";


const port = 3333;
const app = Fastify();

app.register(cors)

/*app.register(cors, {
  origin: ['http://localhost:5173', 'http://21.21.21.11:19000']
});*/

app.register(appRoutes);

app.listen({
  port,
  host: '0.0.0.0'
}).then((url) => {
  console.log(`>> START SERVER PORT: ${url}`)
})

