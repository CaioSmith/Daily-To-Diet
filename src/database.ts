import 'dotenv/config'
import { knex as knexDatabase, Knex } from 'knex'

export const knexConfigDatabase: Knex.Config = {
    client: 'sqlite3',
    connection: {
        filename: './db/app.db'
    },
    migrations: {
        extension: 'ts',
        directory: './db/migrations'
    },
    useNullAsDefault: true
}

export const knex = knexDatabase(knexConfigDatabase)