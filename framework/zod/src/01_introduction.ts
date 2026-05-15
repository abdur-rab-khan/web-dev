import * as z from "zod";

// <-----------------------> BASIC INTRODUCTION <----------------------->
const Player = z.object({
  username: z.string().meta({ description: "Hello world" }),
  xp: z.number(),
});

const player = {
  username: 222,
  xp: "abdurrabkhan222",
};

// Player.parse(player); 👉 Throwing a ZodError, So we need to use try/catch block with "parse" or we can use "safeParse"

try {
  Player.parse(player);
} catch (err) {
  if (err instanceof z.ZodError) {
    console.error(
      "We are getting zod error: ",
      err.issues.map((v) => v.message).join(", "),
    );
  }
}

const { success, data, error } = Player.safeParse(player); // Now Instead of throwing anything it just return it, If failed return "ERROR" otherwise result

// <-----------------------> ZOD in TypeScript <----------------------->
// It's great to infer the type of "schema", which is very easy and safe.
type PlayerType = z.infer<typeof Player>;

const safePlayer: PlayerType = {
  username: "abdurrab222",
  xp: 22,
};

// 👉 In some-cases whether we perform any operations using "transformation", It's great to use "z.output/input" if we want input type and output type after transformation.
// It's because "z.output" returns type, after transforming the data, let's see with example

const schema = z.string().transform((a) => a.length);

type SchemaTypeWithInfer = z.infer<typeof schema>; // It's Number

type SchemaTypeOutput = z.output<typeof schema>; // It's number
type SchemaTypeInput = z.input<typeof schema>; // It's string
