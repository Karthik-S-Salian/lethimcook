/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface User {
    id: number;
    name: string;
    email: string;
  }
  
interface Recipe {
    id: number;
    title: string;
    shortDesciption?: string; // Optional field
    desciption?: string; // Optional field
    ingredients: string;
    instructions: string;
    authorId: number;
    createdAt: string;
  }
  
interface Tag {
    id: number;
    tag: string;
    recipeId: number;
  }
  
interface View {
    userId: number;
    recipeId: number;
    liked: boolean;
  }
  
interface Comment {
    userId: number;
    recipeId: number;
    content?: string; // Optional field
    createdAt: string;
  }


  declare namespace App {
    interface Locals {
     user:User
    }
  }
  