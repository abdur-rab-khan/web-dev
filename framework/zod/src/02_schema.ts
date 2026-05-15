import * as z from "zod";

// <-----------------------> Primitive <----------------------->
// Zod supports every JavaScript Primitive Types

const number = z.number();
const string = z.string();
const bool = z.boolean();
const sym = z.symbol();
const nul = z.null();
const unde = z.undefined();

// 👉 And we can perform parsing using "parse" or "safeParse" and If transformation is using "async" operation than we can also use "asyncParse" or "asyncSafeParse".

// <-----------------------> String <----------------------->
// Zod string come with multiple "validations" (max, min, length, startsWith, endsWith, uppercase, lowercase)
// And "transformations" (trim, toLowerCase, toUpperCase, normalization, regex)
const stringWithValidation = z.string().min(2).max(20);
const stringWithTransformations = z.string().trim().toUpperCase();

const upperCaseWithoutTrimStr = stringWithTransformations.parse(
  "     hello-world       ",
); // ------> Uppercase without space.

console.log("Value is: ", upperCaseWithoutTrimStr);

// 🟡 Zod provides some common formats for working with strings like (email, url, httpUrl ["http", "https url"], iso.date, iso.time, iso.datetime, .jwt)
const email = z.email({
  pattern: /^/i, // Custom regex pattern if we want
});
const url = z.url();

// <-----------------------> Literal <----------------------->
// Literal is like similar to TypeScript Template Literal, It's similar to "zod > enum"
// We can access "zod" value using "literal.values"

const tuna = z.literal("tuna");
const state = z.object({
  state: z.literal(["pending", "completed"]),
});

type TState = z.infer<typeof state>;

const stateT: TState = {
  state: "completed",
};

// <-----------------------> Nullable or Optionals <----------------------->
// Nullable: Used to tell this value can be nullable.
// Optionals: Used to define this value can be optionals like "?" in typescript
// z.unknown: Like Unknown in Typescript
// z.any: Like Any in Typescript
const PersonSchema = z.object({
  name: z.string(),
  age: z.number().min(1).max(150),
  address: z.string().optional(), // Or like that: z.optional(z.string())
});
type TPerson = z.infer<typeof PersonSchema>;

PersonSchema.shape; // To get shape of the "type"

// <-----------------------> Zod Object <----------------------->
// 1. default: z.object({}) --> It's good, but it's also allow if we add any ""extra value that is not provided in schema"".
// 2. strick z.strictObject({}) --> It won't allow to add any extra value other than given in the schema.
const loosePerson = PersonSchema.parse({
  name: "A",
  age: 22,
  address: "add",
  extraDefault: "ex",
}); //  ✅ ALLOWED

const StrictPersonSchema = z.strictObject({
  name: z.string(),
  age: z.number().min(1).max(150),
  address: z.string().optional(), // Or like that: z.optional(z.string())
});
const strictPerson = StrictPersonSchema.parse({
  name: "A",
  age: 22,
  address: "add",
  extraDefault: "ex",
}); // ❌ WRONG

// <-----------------------> Zod Utility <----------------------->
// partial: To make everything optional.
// omit: To remove any keys from type
// required: To make everything required mean remove optionals
// pick: To pick any type for it
// keyof: To get all the keys from the schema
// extends: To extends any schema

// --> Partial
const OptionalPerson = PersonSchema.partial();
type PartialPerson = z.infer<typeof OptionalPerson>; // Everything is optional

// --> Required
const RequiredPerson = OptionalPerson.required();
type RequiredPerson = z.infer<typeof RequiredPerson>; // Everything is required

// --> Omit
const OmitName = PersonSchema.omit({ name: true });
type PersonWithoutName = z.infer<typeof OmitName>;

// --> Pick
const address = PersonSchema.pick({ address: true }).required();
type PersonAddress = z.infer<typeof address>;

// --> Extends
const details = z.object({
  hobbies: z.array(z.string()),
  favoriteShow: z.array(z.string()),
});

const ExtendedPerson = PersonSchema.extend(details); // Or inside details, Using ... spread operator we extends it.
type ExPerson = z.infer<typeof ExtendedPerson>;

// <-----------------------> Array <----------------------->
const array = z.array(z.string()).min(1); // We can define array type using this and also in array we can describe only one type.

// <-----------------------> Tuple <----------------------->
// --> Unlike array, Here we can define multiple type and it's usually fixed.
const Tuple = z.tuple([z.string(), z.number()]);
type TTuple = z.infer<typeof Tuple>; // Makes [string, number]
