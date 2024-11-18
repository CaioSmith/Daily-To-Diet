import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('Users', (table) => {
        table.uuid('id').primary()
        table.uuid('session_id')
        table.text('name').notNullable()
        table.integer('age').notNullable()
        table.text('email').notNullable()
        table.text('password').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
    })

    await knex.schema.createTable('Diets', (table) => {
        table.uuid('id').primary()
        table.uuid('user_id').notNullable()
        table.foreign('user_id').references('id').inTable('Users').onDelete('CASCADE')
        table.string('name').notNullable();
        table.text('description').notNullable()
        table.datetime('date').notNullable();
        table.boolean('is_diet').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable()
        
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('Users')
    await knex.schema.dropTable('Diets')
}

