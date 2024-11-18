import z from 'zod'

export const userRegisterBodySchema = z.object({
    name: z.string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string'
    }),
    age: z.number({
        required_error: 'age is required',
        invalid_type_error: 'age must be a number'
    }),
    email: z.string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string'
    }).email(),
    password: z.string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string'
    }).min(6)
})

export const userLogedBodySchema = z.object({
    email: z.string({
        required_error: 'email is required',
        invalid_type_error: 'email must be a string'
    }).email(),
    password: z.string({
        required_error: 'password is required',
        invalid_type_error: 'password must be a string'
    })
})