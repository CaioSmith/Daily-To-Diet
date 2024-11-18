import fastify from 'fastify';
import cookie from '@fastify/cookie'
import { userSchema } from './routes/user';
import { dietSchema } from './routes/diet';

const app = fastify()

app.register(cookie)
app.register(userSchema, {
    prefix: 'users'
});

app.register(dietSchema, {
    prefix: 'diet'
})

app.listen({
    port: 3333
}).then(() => {
    console.log('Server listening on port 3333')
})