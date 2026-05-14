// i. "Awaited" is used to get a type of Promise, Like there is a promise who return something and I want to get that type we can use this.
type A = Promise<boolean>;
type AwaitedA = Awaited<A>; // boolean;

// ii.
interface Person {
  name: string;
  age: number;
  address: string;
}

type Ex = Exclude<Person, "name" | "age">;

const object: Ex = {
  name: "",
  age: 1,
  address: "",
};

// iii. "Omit": It's used to remove something from the "Object" type
interface IPerson {
  name: string;
  age: number;
  location: {
    city: string;
    state: string;
  };
}

type PersonWithoutAddress = Omit<IPerson, "location">;
const person: PersonWithoutAddress = {
  name: "Abdur Rab Khan",
  age: 21,
};

// iv. "Pick": It's used to create a new type by "pick" types from existing one.
type PickingNameAndLocation = Pick<IPerson, "age" | "location">;
