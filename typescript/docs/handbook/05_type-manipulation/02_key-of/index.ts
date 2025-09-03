interface Person {
  name: string;
  age: number;
  address: string;
}

const person: Person = {
  name: "Abdur Rab",
  age: 21,
  address: "Mumbai",
};

const getValue = <T>(obj: T, key: keyof T) => {
  return obj[key];
};

const personName = getValue(person, "name");
console.log(personName); // Abdur Rab

const keys = Object.keys(person) as (keyof Person)[];
console.log(keys); // ["name", "age", "address"]
