type Person = {
  name: string;
  age: number;
  location: {
    city: string;
    country: string;
  };
};

const person: Person = {
  name: "Abdur Rab",
  age: 21,
  location: {
    city: "Mumbai",
    country: "India",
  },
};

const location: Person["location"] = {
  city: "Mumbai",
  country: "Maharashtra",
};
