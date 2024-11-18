import z from 'zod'

export const dietRegisterBodySchema = z.object({
    name: z.string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string'
    }),
    description: z.string({
        required_error: 'description is required',
        invalid_type_error: 'description must be a string'
    }),
    date: z.string({
        required_error: 'date is required',
        invalid_type_error: 'date must be a datetime format'
    }).datetime(),
    is_diet: z.boolean({
        required_error: 'is_diet is required',
        invalid_type_error: 'is_diet must be a boolean'
    })
})

export const dietPutRegisterBodySchema = z.object({
    name: z.string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string'
    }).optional(),
    description: z.string({
        required_error: 'description is required',
        invalid_type_error: 'description must be a string'
    }).optional(),
    date: z.string({
        required_error: 'date is required',
        invalid_type_error: 'date must be a datetime format'
    }).datetime().optional(),
    is_diet: z.boolean({
        required_error: 'is_diet is required',
        invalid_type_error: 'is_diet must be a boolean'
    }).optional()
})
