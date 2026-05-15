import * as z from "zod";

const Person = z.object({
  name: z.string().meta({ description: "It's the name of the user" }),
  age: z.number().min(0).max(150, { error: "Number is too big" }), // We can customize based error, suppose now if max error occur than "Number is too big" which add into the massage instead of default one.
  address: z.string(),
});

const { success, data, error } = Person.safeParse({
  name: "Abdur Rab Khan",
  age: 500,
  address: "Mumbai",
});

if (success) {
  console.log("Data is: ", data);
} else {
  console.error("Error: ", error.issues);
  /*
  --> Return in this format:
  [
    {
        expected: 'string',
        code: 'invalid_type',
        path: [ 'username' ],
        message: 'Invalid input: expected string, received number'
    },
    {
        expected: 'number',
        code: 'invalid_type',
        path: [ 'favoriteNumbers', 1 ],
        message: 'Invalid input: expected number, received string'
    },
    {
        code: 'unrecognized_keys',
        keys: [ 'extraKey' ],
        path: [],
        message: 'Unrecognized key: "extraKey"'
    }
  ];
  */
}

console.log("Error is tree form: ", z.treeifyError(error!));
/*
    --> Give in tree format.

    {
        errors: [ 'Unrecognized key: "extraKey"' ],
        properties: {
            username: { errors: [ 'Invalid input: expected string, received number' ] },
            favoriteNumbers: {
            errors: [],
            items: [
                undefined,
                {
                errors: [ 'Invalid input: expected number, received string' ]
                }
            ]
            }
        }
    }
*/
