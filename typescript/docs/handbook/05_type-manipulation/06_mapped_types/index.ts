// Mapped types use the in keyword to iterate over the keys of an existing type. And mapped to other type.
type MappedType<OldType> = {
  [K in keyof OldType]: boolean;
};

type Features = {
  darkMode: () => void;
  isLoggedIn: () => void;
};

type FeaturesOptions = MappedType<Features>;

// MAPPED TYPE MODIFIERS
type CreateMutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockAccount = CreateMutable<LockedAccount>;

// Key remapping
type Getter<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getter<Person>;

// PERFORM FILTRATION
type RemoveKindField<T> = {
  [K in keyof T as K extends "kind" ? never : K]: T[K];
};

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

type ShapeWithoutKind = RemoveKindField<Shape>;

const shapeWithoutKind: ShapeWithoutKind = {
  radius: 55,
  sideLength: 100,
};

// MAP OVER ARBITRARY UNIONS
type EventConfig<Event extends { kind: string }> = {
  [K in Event as Event["kind"]]: (event: K) => void;
};

type SquareEvent = { kind: "square"; x: number; y: number };
type CircleEvent = { kind: "circle"; radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;

// Further Exploration
type ExtractPII<Type> = {
  [Props in keyof Type]: Type[Props] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
