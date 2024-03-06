import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, primaryKey } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable('user', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    joinedOn: text("joined_on").default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const recipeTable = sqliteTable('recipe', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    shortDesciption: text("short_desciption"),
    desciption: text("desciption"),
    ingredients: text("ingredients").notNull(),
    instructions: text("instructions").notNull(),
    authorId: integer("author_id").references(() => userTable.id).notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const tagsTable = sqliteTable('Tag', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    tag: text("tag").notNull().unique(),
    recipeId: integer("recipe_id").references(() => recipeTable.id).notNull(),
});

export const viewTable = sqliteTable('View', {
    userId: integer("user_id").references(() => userTable.id).notNull(),
    recipeId: integer("recipe_id").references(() => recipeTable.id).notNull(),
    liked:integer("liked",{mode:"boolean"}).default(false)
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.userId, table.recipeId] }),
    };
});

export const commemtsTable = sqliteTable('Comment', {
    userId: integer("user_id").references(() => userTable.id).notNull(),
    recipeId: integer("recipe_id").references(() => recipeTable.id).notNull(),
    content: text("content"),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull()
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.userId, table.recipeId] }),
    };
});