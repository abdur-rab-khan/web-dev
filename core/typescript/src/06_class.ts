class Sample {
  val1!: string; // ! Intending val1 has been initialized
  readonly val2: string = "Hello";

  constructor(a: string) {
    this.setVal1(a);
  }

  private setVal1(a: string) {
    this.val1 = a;
  }
}

const sample = new Sample("Val1");

// sample.val2 = "something"; ❌ Error because it is readonly

// <===========================> CONSTRUCTOR <===========================>
class Base {
  x: number = 55;
}

class Derived extends Base {
  constructor() {
    super();

    console.log("Value of x from Base class is: ", this.x); // "SUPER" is necessary to call Parent class attribute.
  }
}

// <===========================> IMPLEMENTS <===========================>
interface Checkable {
  x: boolean;
  check(name: string): boolean;
}

class NameChecker implements Checkable {
  x: boolean = Boolean(1);

  // We have to note that, implements works as interface type of a class.
  check(name: string): boolean {
    if (name === "Abdur Rab Khan") {
      return true;
    }

    return false;
  }
}

// <===========================> ABSTRACT <===========================>
// Abstract class cannot be instantiated directly, it must be extended by other classes to make use of its properties and methods.
// It is mainly used to define the shape of a class.
abstract class Animal {
  abstract makeSound(): void;

  // Non-abstract method, means it can directly be used by the derived class.
  move(): void {
    console.log("Roaming the earth...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Bark Bark");
  }
}

const dog = new Dog();
dog.makeSound();
dog.move();

// <===========================> Usage of Generic with classes <===========================>
class Box<T> {
  contents: T;

  constructor(value: T) {
    this.contents = value;
  }

  getContents(): T {
    return this.contents;
  }
}

class X {
  printThings<T>(things: T[]): void {
    things.forEach((thing) => console.log(thing));
  }

  addThings<T>(a: T, b: T): T {
    return a;
  }
}

const x = new X();
x.printThings<string>(["Hello", "World"]);
console.log(x.addThings<number>(5, 10));
