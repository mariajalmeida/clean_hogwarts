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
        }
        const student = Object.create(Student);

        // remove if any space around and then find the first available space after the first name
        const removeSpace = s.fullname.trim();
        const firstSpace = removeSpace.indexOf(" ");
        const lastSpace = removeSpace.lastIndexOf(" ");

        const mainName = removeSpace.substring(0, firstSpace) || removeSpace.substring(0);
        student.firstName = mainName.substring(0, 1).toUpperCase() + mainName.substring(1).toLowerCase();
        // console.log(`First name _${student.firstName}_`)


        const secondName = removeSpace.substring(firstSpace + 1, lastSpace);
        if (secondName.includes('"')) {
            // split and join helps removing the quotes
            const removeQuotes = secondName.split('"').join('');
            student.nickname = removeQuotes.substring(0, 1).toUpperCase() + removeQuotes.substring(1).toLowerCase();
            // console.log(`Second name _${student.middleName}_`);
        } else if (secondName.length > 2) {
            student.middleName = secondName.substring(0, 1).toUpperCase() + secondName.substring(1).toLowerCase();
        } else {
            student.middleName = undefined;
            student.nickname = undefined;
        }

        student.lastName = removeSpace.substring(lastSpace);
        student.lastName = removeSpace.substring(lastSpace + 1, lastSpace + 2).toUpperCase() + removeSpace.substring(lastSpace + 2).toLowerCase();

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