// i. Extending Types
//      a. Using "&" operator
//      b. Using "extends" keyword
interface IShape {
  color: string;
}

interface ISquare extends IShape {
  sideLength: number;
}

type TShape = {
  color: string;
};

type TSquare = TShape & {
  sideLength: number;
};

type A = {
  a: string;
};

type B = {
  a: string;
};

type C = A & B; // Extends both of them into "C"
