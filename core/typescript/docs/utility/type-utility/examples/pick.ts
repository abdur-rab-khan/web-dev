interface Person {
  id: string;
  name: string;
  age: number;
}

type PickingNameAge = Pick<Person, "name" | "age">;
