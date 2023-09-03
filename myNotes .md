# TypeScript Spike

## what is typescript

Typescript is a

- **Strongly typed** → enforces strict rules on data types. Variables and expressions must be assigned specific types, and cannot be converted to others.
- **Object Oriented** → support classes, access modifiers, type annotations and other elements from OOP languages.
- **Compiled** → after a build step, it is translated to a language our machine can understand.

language.

## main characteristics

- **Support other Javascript libraries** → can be used with any framework or Library based on Javascript.
- **Typescript is Javascript** → any `.js` file can be converted to Typescript by changing the extention to `.ts` (or `.tsx` for JSX).
- **Portable** → can be execited on any browser, device, etc... that runs Javascript.
- Supports **_strongly typed_** or **_static typing_**
- **Tooling** → Advanced development features in IDE
- Catch bugs in advance -
- No learning curve from JS - **Superset**

## pros

- Highligh errors at compilation time (before saving our code), thanks to various code editing features (**Intellisense**). Javascript does it at run time (when saving)
- It is **_Strongly typed_**, Javascript is loosely typed, the data type of a variable or expression can be changed at any time.
- **Transpiling** → compiled and converted to the latest version of Javascript for execution, thus making it future ready code.
- Small learning curve from Javascript.
- Types definitions make code easiert to maintain and manage.
- Can improve Team performance.

## cons

- Compilation time → needs to be transformed to JS.
- The Typing system can became complicated at times.
- It might require some initial setup.
- False sense of security.

## setting up

- **Install TS globally** → `npm i -g typescript`
- Check version → `tsc --version`
- Create `main.ts` file → and type some plain JS code , e.g. `console.log("Hello TypeScript")`

## compile to js file

Browsers only understand JS so we need to compile our TS file.
In our terminal, type the command `tsc main.ts` to run the TS compiler.
A `main.js` file will be created. If we create an `index.html`file, we can link it and run it on the browser.
For now it looks identical as we only wrote plain JS supported for a long time.

Let's add some modern JS code to our `main.ts` file. For example a async function (version ES6 of JS).

```js
async function helloWorld() {
  return "hello";
}
```

After running the compiler we will see way more code being generated.
That is because by default TS is compiling to version ES3 (1999) of JS.
The compiler is able to translate TS to any version of JS we specify. This process is called **Transpiling**.

## compiler configuration

In order to decide to which version of JS we want to transpile TS, decide specifics folders for the TS we generate, and the destinaiton for the JS code created, and other configurations, we need to create a `tsconfig.json` file.
We can create manually, or generate one with the command `tsc --init`.
Initally, just a few options would be necessary :

```json
{
  "compilerOptions": {
    "target": "es6" or "esnext", //  "esnext" means to convert it to the latest JS version.
    "lib": ["dom", "es2020"] // libraries that can be useful. "dom" containes DOM definitions, like window,document , to build websites.
  }
}
```

But for a bigger project, additional settings are recommened :

```json
{
  "compilerOptions": {
    "target": "es6" or "esnext",
    "lib": ["dom", "es2020"],
    "module": "CommonJS" or  "ES6", // do not forget to include type="module" in your <script> in html file : <script src="filename.js" type="module"></script>
    "rootDir": "./src",  // Specify the folder`s name where we will write our .ts files,
    "outDir": "./build" or "./public", // Specify the folder's name , destiny for the generated .js file

    //(use this option only after gaining some experience)
    "strict": true, // prevent changes of type once a type is declared and "any" type.

    //this option will display line numbers from .ts file in dev tools, instead of .js line numbers.
    "sourceMap": true

  },

"include": ["./src/**/*"] // Only compiles .ts files created inside src folder.
}
```

If you go for creating a `build` folder as destination only for the compiled `.js` files, better to include it in a `.gitignore` file.
When working collaborativly, it is advised not to commit those files, to avoide potential pull request and merge problems.
Only before deployment, we will build a final version.

After finishing with the configuration, simply run the command `tsc` to run the compiler with the config.

Plenty of other options are available, for instance choose to include or exclude files or folder into the build or even remove comments in order to have a clean production code.

[TypeScript compiler configuration](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

## primitive types

- **Implicit typing** : in the `index.ts` file declare a new variable and initialize it `let count = 23`. Then try to assign a string to the variable `count = '23'`.
  This produces an error, prompting that _"Type 'string' is not assignable to type 'number'."_. TS just prevented a big bug, and does it at run time. This wouldn't be an error for JS.

      Everytime we declare and initilize a variable , the type will be **inferred** by TS, from the value we assign to the variable.

- **Explicit typing** : When declaring a variable without initializing is not assigned right away but we still want to strong type, we can do so by using a colon followed by the type: `let petName : string`.

  Some developers might consider that if a variable is implicitly typed, would be redundant to explicity type it (e.g. `let count : number = 23`). Others might considere it more readable and help to avoid errors (e.g. `let a: Centimeters = 23; let b: Inchies = 10; let c:number = 2`, here you shouldn't be allowed to operate a with b). Make your own informed decission 😉.

- ⛔️ **any** ⛔️: An specific type that allow us to avoid the Type checking, thus defeating TS purpose. Ideally you would want to avoid skipping type checks but TS provides this flexibility that can sometimes be needed.
  A variable that is not explicitly or implicitly typed will have a type `any`.

⚠️ Type names `String`, `Number`, and `Boolean` (starting with capital letters) are accepted, but refer to some special built-in types that will very rarely appear in your code. Always use `string`, `number`, or `boolean` for types.
e.g

```ts
type word = string;
```

instead of

```ts
type word = String;
```

Now let's create our own types ➡︎

## unions

Let's create our own type as follow:

```ts
type WebDevMentor = "Emily" | "Heron";
```

We here use a union `|` to declare the type Mentor consists of either one of two strings.

Now declare a variable of type 'Mentor' and try to give it a different name.

```ts
let favMentor: WebDevMentor;
favMentor = "Killian";
```

will trigger the following error: _"Type 'Killian' is not assignable to type 'WebDevMentor'"_

## interfaces

Define the shape of an **object**, specifying its properties and types.
They key word `interface` can be used instead of `type` for non primitives types such as objects. `interfaces` offer more TS feature than `types`.

```ts
interface Student {
  name: string; // TS admits also comma, be consistent with the style. TS prefers semicolon though.
  course: string;
  courseLength: number;
  hasPet?: boolean; // optional property
  [key: string]: any; // index signature structure : [key: KeyType]: ValueType . Use? to type objects of unknown structure when you only know the key and value types.
  // check what happens if insitead of "any" value, we assign "number", "string", or "boolean"
}
```

We here declare a Person interface that is an object consisting at least of three properties (name, course and courseLenght).
We can add optional properties by adding a **?** symbol.
We can add other properties of any type using `[key: string] : any;`

```ts
const student1: Student = {
  name: "Tom",
  course: "Frontend",
  courseLength: 3,
  hasPet: false,
  whatever: "any value",
};
```

## types folder

As our project grows in complexity and files, we will have to create several custom types. It is a good idea to keep them organised and easy to find.

A way of doing that could be to create a `types` folder , and inside it create one , or several (depeding on the complexity of our project) files in which we will define our custom types. Those files might have the name of the `.ts`file for which we are defining the types.

In our example, we will define types for `main.ts`, therefore we will name it `mainTypes.ts`.
This file should contain no logic, only types/interfaces declarations.

A common misinterpretation of TS documentation is to declare the files with our custom types with the extension `.d.ts` (`.d.` stands for _declaraction_).
[Typescript Team position about the use of `.d.ts` file for custom types]("https://github.com/microsoft/TypeScript/issues/52593#issuecomment-1419505081")

Let's move `interface Student` inside `main.ts` ; Then fix the error by importing the interface `Student`

```ts
import type {Student} from "./@types/main";

const student1: Student = {
  name: "Tom",
 .....
};
```

## functions

let's start by creating a function without enforcing any type and making a call tat doesn't make sense. Here the function that multiples two variables together but we will call it using strings.

```js
function multiply(x, y) {
  return x * y;
}
const res = multiply("one", "two");

console.log(`res`, res);
```

This function won't produce any error in JS, until we see the strange result in the console.

Now if we explicitly declare types:

```ts
function multiply(x: number, y: number): {
  return x * y;
}
```

Now our function can only receive numbers as parameters.

But if we modify the function adding something in the calculation :

```ts
function multiply(x: number, y: number) {
  const result = x * y + "abc";
  return result;
}
const res = multiply(1, 2);
console.log("res", res); // output : 2abc
```

Now the function returns not a number, but a string, and this is not the desired return.

We can also type the return of a function, to make sure the output is the expected one.

We do that by adding a colon after the parenthesis.

```ts
function multiply(x: number, y: number): number {
  const result = x * y + 3;
  return result;
}
const res = multiply(1, 2);
console.log("res", res); // output can only be a number
```

This way we make sure that our function will only receive two numbers as parameters and return itself a number.

- Optional parameter
  we can define any parameter as optional.

```ts
function multiply(x: number, y: number, c?: number): number {
  const result = x * y * c; // with
  return result; // Be careful, if c is not passed, the result of this operation will be NaN
}
```

- With Arrow Functions:

```ts
const multiplyWithArrowFunction = (x: number, y: number): number => {
  const result = x * y + 3;
  return result;
};
```

A function that has no return statement can be typed as a `:void`.

```ts
const hi = (): void => {
  console.log("hi");
  // return "hallo" // this will trigger an error
};
```

## type alias

A _type alias_ is a name for any type of type..

There are situations in which our code might turn repetitive (DRY!)

```ts
const register = (
  password: string | number,
  user: { name: string; email: string }
) => {
  //....
};

const login = (
  password: string | number,
  user: { name: string; email: string }
) => {
  //....
};
```

As we can see, both functions use the same parameters.

To avoid that, we can create our own reusable types:

```ts
type StringOrNum = string | number;

interface UserObject {
  name: string;
  email: string;
}

const login = (password: StringOrNum, user: UserObject) => {
  //....
};
```

This will make our code more readable

We could also create a generic type for the function.

```typescript
type SendCredentials = (argument1: StringOrNum, argument2: UserObject) => void;

const register: SendCredentials = (
  password: string | number,
  user: { name: string; email: string }
) => {
  //....
};
```

- when to use Interface and when Type Alias?
  - Generally speaking, _interface_ is prefered over _type_.
  - We use **type** when:
    - defining an alias for primitive types (string, boolean, number).
    - defining a type for a function.
    - defining a union.

## Arrays

We can force arrays to only receive certain types by using explicit types and brackets to signify that it's an array:

```ts
const arr: number[] = [];
arr.push(1); //ok
arr.push("1"); //error
arr.push(true); //error
```

This will prove very useful in web development working with arrays of objects.

```typescript
const pedro: Student = {
  name: "pedro",
  course: "frontend",
  courseLenght: 3,
};
const santi: Student = {
  // all properties
};
const cohort: Student[] = [santi, pedro];
```

we can also define it like this

```typescript
const cohort2: Array<Student> = [santi, pedro];
```

If we hover over the two, we will see there are no differences between the two.

Another real use case would be to make sure a list of persons coming from a database fulfills our definition of the interface Person declared earlier

## tuple

A special type of array in which each element can have a different type.

```ts
type MyList = [number, string, boolean];
const list1: MyList = [1, "hi", true];

myList[1] = 5; // error
```

- The types are fixed.
- Order matters.
- If we include an optional element, better put at the last position.

Although in programming we don't use many mixed arrays, some use cases might coordinates `[place, latittude, longitude]`, arrays with user information like `[id, name]` , or table data.

## namespaces

Namespaces are a way to group related code, such as interfaces, functions, types, classes, or other namespaces, under a single name.
This helps to organice and manage code preventing naming conflicts and providing logical structure to the application

Let's create a namespace that groups all the types we can use to define the Data course

```ts
namespace Data {
  interface Student {
    firstName: string;
    course: "data";
    courseLength: 3 | 5;
  }
  type Mentor = "Arjun" | "Killian";
  type Cohort = Array<Student>;
  type SayYourMentor = (a: Mentor) => String;
}
```

Later, with the help of intellisense (suggestions), we can have acces to every type defined inside

```ts
const stundent3: Data.Student = {
  firstName: "Alberto",
  course: "data",
  courseLength: 3,
};
const group1: Data.Cohort = [student3];

const sayOutloud: Data.SayYourMentor = (mentor) => {
  return `${mentor} is my mentor`;
};

const result = sayOutloud("Killian");
console.log("result", result);
```

This would allow us to create a `namespace WebDev` resusing the same types with different values, without any name conflicts.

```ts
type MyList = [number?, string?, boolean?];
const list1: MyList = [];
arr.push(1); //ok
arr.push("1"); //ok
arr.push(true); //ok
```

Same goes for objects

```ts
interface Person {
  firstname?: string;
  lastname: string;
  [key: string]: any;
}
```

Means that a person does not specifically require to have a firstname.

## generics

Generics are an importan tool to create reusable code in other languages like C# or Java.
In TS will allow us to create reusable code that can work with a variaty of data types, rather than being tied to a specifcic data type.

The syntax woudl be like this :

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
```

## generics with functions

If we had a function that adds Ids to an user object

```ts
const addId = (user: object) => {
  const id = 34;
  const userWithId = { ...user, id };
  return userWithId;
};
const user1 = { name: "tom", password: 123 };
const newUser1 = addId(user1);
console.log(newUser1.name); // Property 'name' does not exist on type 'object'.
```

When we try to acces property _name_ (or _password_), we get an error. Ts knows that newUser1 is an object, but only knows property _id_ .

Assigning a genery type to the functions signature, is like defining a placeholder for types that can be used in a function (or interface), allowing us to specify the actual type at a later point.

We do that by inserting `<Type>` before the partenthesis, and now, to capture whatever type the argument of the function is, we assign it also to it

```ts
const addId = <Type>(user: Type) => {
  const id = 34;
  const userWithId = { ...user, id };
  return userWithId;
};

const user1 = { name: "tom", password: 123 };
const newUser1 = addId(user1);
console.log(newUser1.name); // No error
```

Now the error goes away, because we can capture the types of what comes inside the argument `user`

We could also apply it to the return of the function.

```typescript
const addId = <Type>(user: Type): Type => {
  //......
};
```

## generics with interfaces

The use of generics with an interface will allow us to create an interfce that defines different objects.

```ts
interface Animal<Type> {
  type: string;
  legs: number;
  info: Type; // this allow us to assign different types to this field
}
```

At the time of assign that type to a variable, we can define the type of _info_ property.

```ts
const dog: Animal<string> = {
  type: "dog",
  legs: 4,
  info: "hate cats",
};

const cat: Animal<string[]> = {
  type: 4,
  type: "cat",
  legs: ["have claws", "love tuna"],
};
```

[TS Handbook](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
