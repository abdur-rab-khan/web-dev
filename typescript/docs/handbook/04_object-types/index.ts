interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = {
  1: "One",
  2: "Two",
  3: "Three",
};

console.log(myArray[1]);

// Excess Property Checks
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): Required<SquareConfig> {
  return {
    color: config?.color || "red",
    width: config?.width || 55,
  };
}

const squareConfig = createSquare({ width: 100 });

// First Way
const sConfigV = { colour: "blue", width: 5555 };
const sConfig = createSquare(sConfigV);

// Second way
const sConfigV2 = { colour: "blue" };
const sConfig2 = createSquare(sConfigV2);

// <==========================> WITHOUT GENERIC <==========================>
interface Box {
  content: any;
}

const box: Box = { content: 1 };

// "any" type is not safe, that can lead to accidental runtime errors
// box.content.toLowerCase(); ✔️ It's correct they does not give any error

// "any" type is not safe, that can lead to accidental runtime errors
interface SafeBox {
  content: unknown;
}

const sBox: SafeBox = { content: "44" };

// sBox.content.toLowerCase() ❌ Cause an error

if (typeof sBox.content === "string") {
  console.log(sBox.content.toLowerCase());
}

// <==========================> GENERIC <==========================>
interface BoxGen<T> {
  content: T;
}

const genBox: BoxGen<string> = { content: "Hello" };
