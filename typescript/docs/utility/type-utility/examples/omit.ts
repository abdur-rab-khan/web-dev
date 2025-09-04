interface PersonWithLocation {
  name: string;
  age: number;
  location: {
    city: string;
    state: string;
  };
}

type PersonWithoutLocation = Omit<PersonWithLocation, "location">;

const Person: PersonWithoutLocation = {
  name: "Abdur Rab Khan",
  age: 21,
};

// Let's do using Generic
type PersonWithLoc<T> = T extends { location: any }
  ? Omit<T, "location">
  : T & { address: string };

// Let's check it
type WithLoc = PersonWithLoc<PersonWithLocation>;

// Let's check without on
type WithoutLoc = PersonWithLoc<PersonWithoutLocation>;
