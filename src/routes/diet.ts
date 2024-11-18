import { FastifyInstance } from 'fastify' 
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { dietPutRegisterBodySchema, dietRegisterBodySchema } from '../schemas/diet.schema'
import { randomUUID } from 'crypto'
import { get } from 'http'

export async function dietSchema(app: FastifyInstance){
    app.get(
        '/:id',
        {
            preHandler: [checkSessionIdExists]
        },
        async (request, reply) => {
            const { sessionId } = request.cookies
            const { id } = request.params as { id: string }

            const getUniqueDietById = await knex('diets')
                    .join('users', 'users.id', 'diets.user_id')
                    .where({
                        'diets.id': id,
                        'users.session_id': sessionId
                    })
                    .select('diets.*')
                    .first()

                if (!getUniqueDietById){
                    return reply.status(400).send({
                        error: 'diet does not exists'
                    })
                }

                const { userSessionId, ...dietData } = getUniqueDietById

                return reply.status(200).send(dietData)
    })

    app.get(
        '/',
        {
            preHandler: [checkSessionIdExists]
        },
        async (request, reply) => {
            const { sessionId } = request.cookies
            const diets = await knex('diets')
                .join('users', 'users.id', 'diets.user_id')
                .where({
                    'users.session_id': sessionId
                })
                .select('diets.*')
            
            return reply.status(200).send(diets)
    })

    app.post(
        '/',
        {
            preHandler: [checkSessionIdExists]
        },
        async (request, reply) => {
            let { sessionId } = request.cookies

            const { name, description, date, is_diet } = dietRegisterBodySchema.parse(request.body)

            const getUser = await knex('users')
                .where('session_id', sessionId)
                .first()

            if(!getUser) {
                return reply.status(404).send({
                    error: 'session not found'
                })
            }

            await knex('diets')
                .insert({
                    id: randomUUID(),
                    user_id: getUser?.id,
                    name,
                    description,
                    date,
                    is_diet
                })
        
            reply.status(201).send()
        })

    app.put(
        '/:id',
        {
            preHandler: [checkSessionIdExists]
        },
        async (request, reply) => {
            try{
                let { sessionId } = request.cookies
                const { id } = request.params as { id: string }
                const { name, description, date, is_diet } = dietPutRegisterBodySchema.parse(request.body)

                const searchDietDataById = await knex('diets')
                    .join('users', 'users.id', 'diets.user_id')
                    .where({
                        'diets.id': id,
                        'users.session_id': sessionId
                    })
                    .select('diets.*')
                    .first()
                
                if (!searchDietDataById){
                    return reply.status(400).send({
                        error: 'this diet id does not exist for this user'
                    })
                }
                
                const isEqualDietData = (
                    name === searchDietDataById.name ||
                    description === searchDietDataById.description ||
                    date === searchDietDataById.date ||
                    is_diet === searchDietDataById.is_diet
                )
                if(isEqualDietData){
                    return reply.status(400).send({
                        error: 'all values already to updated'
                    })
                }

                const putDietById = await knex('diets')
                    .where('id', id)
                    .update({
                        name,
                        description,
                        date,
                        is_diet,
                        updated_at: knex.fn.now()
                    })

                if(!putDietById){
                    return reply.status(404).send({
                        error: 'this diet id does not exists'
                    })
                }

                return reply.status(201).send()
            }catch (error) {
                return reply.status(404).send({
                    error: 'invalid request data, id is required',
                })
            }
    })
}