"use strict";

window.addEventListener("DOMContentLoaded", fetchData);

function fetchData() {
    const students = "https://petlatkea.dk/2021/hogwarts/students.json";
    fetch(students)
        .then(res => res.json())
        .then(transcribeData);
}

const allStudents = [];

// here's all the students
function transcribeData(students) {
    students.forEach(s => {
        const Student = {
            firstName: "",
            middleName: "",
            lastName: "",
            nickname: "",
            gender: "",
            house: ""
        }
        const student = Object.create(Student);

        // remove if any space around and then find the first available space after the first name
        const removeSpace = s.fullname.trim();
        const firstSpace = removeSpace.indexOf(" ");
        const lastSpace = removeSpace.lastIndexOf(" ");

        // remember "Leanne" is not correct yet
        student.firstName = removeSpace.substring(0, firstSpace);
        student.firstName = removeSpace.substring(0, 1).toUpperCase() + removeSpace.substring(1, firstSpace).toLowerCase();
        // console.log(`First name _${student.firstName}_`)

        // remember "ernie"'s quotes need to be removed
        student.middleName = removeSpace.substring(firstSpace + 1, lastSpace);
        if (student.middleName.length > 2) {
            student.middleName = removeSpace.substring(firstSpace + 1, firstSpace + 2).toUpperCase() + removeSpace.substring(firstSpace + 2, lastSpace).toLowerCase();
            // console.log(`Second name _${student.middleName}_`);
        } else {
            // console.log("denied");
        }

        student.lastName = removeSpace.substring(lastSpace);
        student.lastName = removeSpace.substring(lastSpace + 1, lastSpace + 2).toUpperCase() + removeSpace.substring(lastSpace + 2);

        const removeSpaceHouse = s.house.trim();
        student.house = removeSpaceHouse;
        student.house = removeSpaceHouse.substring(0, 1).toUpperCase() + removeSpaceHouse.substring(1).toLowerCase();
        student.gender = s.gender;

        allStudents.push(student);
    });

    cleanData();
}

function cleanData() {
    console.table(allStudents);
}