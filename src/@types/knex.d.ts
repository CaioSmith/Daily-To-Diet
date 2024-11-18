import { Knex } from 'knex'

declare module 'knex/types/tables' {
    export interface Tables {
        users: {
            id: string
            name: string
            age: number
            email: string
            password: string
            created_at: string
            updated_at: string
            session_id?: string
        },
        diet: {
            id: string
            user_id: string
            name: string
            description: string
            date: Date
            is_diet: boolean
        }
    }
}