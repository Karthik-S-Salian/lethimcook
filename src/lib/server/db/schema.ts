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
    image:text("image"),
    shortDescription: text("short_desciption"),
    description: text("desciption").notNull(),
    authorId: integer("author_id").references(() => userTable.id).notNull(),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const ingredientTable = sqliteTable('ingredient', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    ingredient: text("ingredient").notNull().unique(),
});

export const ingredientRecipeTable = sqliteTable('ingredient_recipe', {
    ingredient: integer("ingredient").references(() => ingredientTable.id),
    recipe: integer("recipe").references(() => recipeTable.id),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.ingredient, table.recipe] }),
    };
});

export const tagsTable = sqliteTable('Tag', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    tag: text("tag").notNull().unique(),
});

export const tagRecipeTable = sqliteTable('tag_recipe', {
    tag: integer("tag").references(()=>tagsTable.id),
    recipe: integer("recipe").references(() => recipeTable.id),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.tag, table.recipe] }),
    };
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