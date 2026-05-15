import * as z from "zod";

// <------------------------> Refine <------------------------>
// --> There are some functions which helps to perform custom validation and set some custom logic for that.
// Refine: It's a callback function that suppose to return false, If we don't want to trigger error.

const myString = z.string().refine((v) => v.length < 5, {
  error: "It's too big",
  when(payload) {
    return payload.value !== "Abdur Rab Khan";
  },
});

console.log(myString.parse("Abdur Rab Khan")); // It's triggering validation issue but, "when" preventing from that.
console.log(myString.parse("This is going to trigger the issue"));

// <------------------------> Super Refine <------------------------>
// --> It's provides low-level stuff for handling validation
