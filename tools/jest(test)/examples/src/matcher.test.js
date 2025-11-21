const obj = {
  name: "jest",
  type: "testing framework",
  by: "facebook",
};

const arr = [1, 2, 3, 4, 5];

function funNUll() {
  return null;
}

describe("Basic matchers", () => {
  // toBe matcher example
  test("toBe matcher", () => {
    expect(2 + 2).toBe(4);
  });

  test("obj name toBe matcher", () => {
    expect(obj.name).toBe("jest");
  });

  test("array length toBe matcher", () => {
    expect(arr[0]).toBe(1);
  });

  // toEqual matcher example
  test("toEqual matcher", () => {
    expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
  });

  test("obj toEqual matcher", () => {
    expect(obj).toEqual({
      name: "jest",
      type: "testing framework",
      by: "facebook",
    });
  });

  // toBeNull matcher example
  test("toBeNull matcher", () => {
    expect(funNUll()).toBeNull(); // true because funNUll() returns null .not toBeNull() would be false
  });

  test("not toBeNull matcher", () => {
    expect(obj.name).not.toBeNull(); // true because obj.name is "jest" .toBeNull() would be false
  });

  // toBeTruthy and toBeFalsy matcher example
  test("toBeTruthy matcher", () => {
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();
    expect("non-empty string").toBeTruthy();
  });

  // toBeFalsy matcher example
  test("toBeFalsy matcher", () => {
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect("").toBeFalsy();
  });
});

describe("Number matchers", () => {
  const value = 2 + 12;

  test("toBeGreaterThan matcher", () => {
    expect(value).toBeGreaterThan(10);
  });

  test("toBeGreaterThanOrEqual matcher", () => {
    expect(value).toBeGreaterThanOrEqual(14);
  });

  test("toBeLessThan matcher", () => {
    expect(value).toBeLessThan(20);
  });

  test("toBeLessThanOrEqual matcher", () => {
    expect(value).toBeLessThanOrEqual(14);
  });

  test("toBeCloseTo matcher", () => {
    const floatSum = 0.1 + 0.2;
    expect(floatSum).toBeCloseTo(0.3);
  });
});

describe("String matchers", () => {
  const str = "Hello, welcome to the world of Jest testing framework.";

  test("toMatch matcher with string", () => {
    expect(str).toMatch("Jest");
  });

  test("toMatch matcher with regex", () => {
    expect(str).toMatch(/^hello/i);
  });
});

describe("Array and Iterable matchers", () => {
  const fruits = ["apple", "banana", "orange", "mango"];

  test("array contains banana", () => {
    expect(fruits).toContain("banana");
  });
});

describe("Exception matchers", () => {
  function throwError() {
    throw new Error("This is a test error");
  }

  test("toThrow matcher without error parameter", () => {
    expect(throwError).toThrow(/test error/);
  });
});
