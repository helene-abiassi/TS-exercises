import type {} from "../src/types/customTypes";

let mentor: string = "Raul"

let age = 23

type Student = "Helene" | "Thair" | "Rafal"
  


interface Person {
  name: Student;
  age: number;
  pets: string;
  hobbies?: Student;

}

const Helene: Person = {
  name: "Helene",
  age: 32,
  pets: "Bobby"
}

console.log(Helene);

async function helloTypeScript() {
  return "Hey there"
}

//* TYPESCRIPT EXERCISES - FROM STUDIO GHIBLI PROJECT

//* 1. Recreate the buildTable function in TS



//* 2. Recreate the fetch function in TS
