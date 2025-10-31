type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

// for possible union it will create string literals
type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;

// <==================> String Union Type <=================>
interface Person {
  name: string;
  age: number;
  location: string;
}

type PropEventSource<T> = {
  on(
    event: `${string & keyof T}Change`,
    callback: (newValue: any) => void
  ): void;
};

function makeObject<Type>(obj: Type): Type & PropEventSource<Type> {
  throw "unimplemented";
}

const person = makeObject({
  name: "Abdur Rab Khan",
  age: 21,
  location: "Mumbai",
});

// person.on("fho", () => {}); ❌ Error: You can either use "nameChange" | "ageChange" | "locationChange"

person.on("ageChange", () => {}); // ✔️

// <==================> Inference with Template Literals <=================>
type IPropEventSource<T> = {
  on<Key extends string & keyof T>(
    event: `${Key}Changed`,
    callback: (newValue: T[Key]) => void
  ): void;
};

function makeObjectI<Type>(obj: Type): Type & IPropEventSource<Type> {
  throw "unimplemented";
}

const personI = makeObjectI({
  name: "Abdur Rab",
  age: 21,
  location: "Mumbai",
});

personI.on("nameChanged", (newName) => {
  console.log(`new name is ${newName}`);
});

personI.on("ageChanged", (newAge) => {
  console.log(`new age is ${newAge}`);
});

// <==================> Intrinsic String Manipulation Types <=================>
type Greeting = "Hello, world";
type ShoutGreet = Uppercase<Greeting>;

// <==================> Testing <=================>
type KeyFunction<T> = {
  on<Key extends string & keyof T>(
    event: `${Key}Changed`,
    callback: () => void
  ): void;
};

type PersonFunction = KeyFunction<Person>;
