import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { userRegisterBodySchema } from '../schemas/user.schema';
import { userLogedBodySchema } from '../schemas/user.schema';

export async function userSchema(app: FastifyInstance){
    app.get('/', async (request, reply) => {
        const users = await knex('users').select('*')
        return reply.status(200).send(users)

    })


    app.post('/register', async (request, reply) => {
        
        const { name, age, email, password } = userRegisterBodySchema.parse(request.body)
        const hashedPassword = await bcrypt.hash(password, 10)

        const getUser = await knex('users')
            .where({ email })
            .first()

        if(getUser){
            return reply.status(400).send({
                error: 'User is already registered'
            })
        }

        await knex('users').insert({
            id: randomUUID(),
            name,
            age,
            email,
            password: hashedPassword
        })

        return reply.status(201).send({
            message: 'User registred successfully!'
        })
    })

    app.post('/login', async (request, reply) => {

        const { email, password } = userLogedBodySchema.parse(request.body) 

        const user = await knex('users')
            .where('email', email)
            .first()
        
        if(!user){
            return reply.status(400).send({
                error: 'Email is incorrect or does not exist'
            })
        }
        
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword){
            return reply.status(400).send({
                error: 'Password is incorrect'
            })
        }

        const sessionId = randomUUID()
        reply.cookie('sessionId', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })

        await knex('users')
            .where('email', email)
            .update('session_id', sessionId)

        return reply.status(200).send({
            message: 'Login successfuly'
        })
    })

    // app.get('/logout', (request, reply) => {})
}