interface Person {
  name: string;
  age: number;
  address: string;
}

type F = Exclude<Person, "name" | "age">;
