import * as z from "zod";

// In Zod, We would transformation "data" from ""one state"" for ""another state""
const greetMsgByName = z.string().transform((v) => "Hello! " + v);
console.log(greetMsgByName.parse("Abdur Rab Khan")); // Hello! Abdur Rab --> It's transform "Hello!" to "Hello! Abdur Rab"

// Pipe: It's similar to how pipe works on "linux", mean become output of one become input of second, Here output of schema we can transform into second one.
const stringToLength = z.string().pipe(z.transform((val) => val.length));

stringToLength.parse("hello"); // => 5
