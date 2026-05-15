import * as z from "zod";

// Now days, Meta-data is every important It's commonly use with AI structure outputs or form validation
// To add meta data we have three function ".meta", ".describe", ".globalRegistry"

// <------------------------> Meta data <------------------------>
// It's very convenient to add meta data to our schema, it can be used to generate documentation, or to provide additional information about the schema
const string = z.string().meta({
  id: "string",
  description: "This is a string",
  title: "String",
});

// <------------------------> Describe <------------------------>
// It's very convenient to add description to our schema, it can be used to generate documentation, or to provide additional information about the schema
const number = z.number().describe("This is a number");

// <------------------------> Global Registry <------------------------>
// It's very convenient to add global registry to our schema, it can be used to generate documentation, or to provide additional information about the schema
z.globalRegistry.set("string", string);
z.globalRegistry.set("number", number);
