import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './routes.ts';

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 5000;

// 항상 promise로 return되고 top level await가 지원됨
console.log(`Server is listening on port ${PORT}`)
await app.listen({ port: PORT })