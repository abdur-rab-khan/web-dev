interface Shape {
  x: number;
  y: number;
  height: number;
  width: number;
}

const createShape = (): Shape => {
  return {
    x: 50,
    y: 100,
    height: 200,
    width: 600,
  };
};

// Return type of createShape is also Shape, by using typeof we extract type from them.
const newShape: ReturnType<typeof createShape> = {
  x: 100,
  y: 500,
  height: 100,
  width: 500,
};

const firstName: string = "Abdur Rab";
// const lastName: typeof firstName = 55; ❌ Type of firstName is string not number.

const lastName: typeof firstName = "Khan";
