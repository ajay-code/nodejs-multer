import { Knex } from 'knex'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex: Knex) {
    return knex.schema.createTable('messages', (table) => {
        table.increments('id')
        table.text('message').notNullable()
        table
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex: Knex) {
    return knex.schema.dropTable('messages')
}
