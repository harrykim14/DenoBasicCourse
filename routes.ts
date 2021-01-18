import { Router } from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std@0.83.0/uuid/mod.ts";
import { Book } from './types.ts';

const router = new Router();

let books: Book[] = [
    { id: "1", title: "Book One", author: "One"},
    { id: "2", title: "Book Two", author: "Two"},
    { id: "3", title: "Book Three", author: "Three"}
]

router.get('/', (context) => { context.response.body = "Hello, DENO!"; })
      .get('/books', async (context) => { context.response.body = books; } )
      .post('/addBook', async (context) => {
        const body = await context.request.body();
    
        if(!context.request.hasBody) {
            context.response.status = 400;
            context.response.body = "데이터가 없습니다."
        } else {
            const newBook: Book = await body.value;
            // error: TS2322 [ERROR]: Type 'Promise<any> Promise 타입으로 제공되기 때문에 이 값 또한 Promise에서 await로 풀어주어야 함
            newBook.id = v4.generate();
            books.push(newBook);
            context.response.status = 201;
            context.response.body = newBook;
        }
    })
      .get("/findBook/:id", async (context) => {
        const book: Book | undefined = await books.find(b => b.id === context.params.id)
        if(book) {
            context.response.status = 200;
            context.response.body = book;
        } else {
            context.response.status = 400;
            context.response.body = "해당하는 id를 가진 책이 없습니다"
        }
    });

export default router