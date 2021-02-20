## Deno를 배워보자 (2021년 1월 18일)

- Node.js의 창립자 라이언 달이 만든 JavaScript, TypeScript 런타임으로 2020년 5월 13일에 1.0이 출시됨
- Node.js의 단점(모든 모듈이 node_modules에 저장되어 관리되는 점, legacy API의 얕은 지원, 안정성 등)을 보완하기 위해 만들어짐
- 발음은 "디노"로 Node.js의 애너그램임

- node.js와는 달리 외부 라이브러리의 리포지토리 url을 import하여 사용한다
```typescript
  import { serve } from "https://deno.land/std@0.83.0/http/server.ts";
```

- 디노는 기본적으로 Promise로 이루어져있기 때문에 Top-level await를 제공한다
```typescript
  const s = serve({ port: 5000 })
  for await(const req of s) {
    req.respond({ body: "hello, deno!\n"})
  }
```

- 라이브러리 별로 특정 디렉토리에 대한 읽기/쓰기, 네트워크 접근 권한 등을 설정 할 수 있다([참고](https://deno.land/manual/getting_started/permissions)
  * --allow-read, --allow-write, --allow-net 등
 
- 디노의 oak 프레임워크를 사용하여 어플리케이션 생성하기
```typescript  
import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './routes.ts';

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 5000;

console.log(`Server is listening on port ${PORT}`)
await app.listen({ port: PORT })
```

- 기존 (request, response, next) 형식을 사용하던 것과는 달리 oak 프레임워크에선 context로 한번에 받아 사용할 수 있다
```typescript
router.get("/", (context) => {
  context.response.body = "Hello deno, oak";
});
```

- 따라서 destructuring하여 사용할 수도 있다
```typescript
router.get("/", ({response}) => {
  response.body = "Hello deno, oak";
});
```

- 디노의 기본 제공되는 라이브러리는 [여기](https://deno.land/std@0.88.0)서 볼 수 있다
