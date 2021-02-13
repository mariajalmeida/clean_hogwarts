"use strict";

window.addEventListener("DOMContentLoaded", fetchData);

function fetchData() {
    const students = "https://petlatkea.dk/2021/hogwarts/students.json";
    fetch(students)
        .then(res => res.json())
        .then(transcribeData);
}

// here's all the students
function transcribeData(students) {
    students.forEach(eachStudent);
}

// here's each student separately
function eachStudent(s) {
    console.log(s);
    const Student = {
        firstName: "",
        middleName: "",
        lastName: "",
        nickname: ""
    }
    const studentName = Object.create(Student);

    // remove if any space around and then find the first available space after the first name
    const removeSpace = s.fullname.trim();
    const firstSpace = removeSpace.indexOf(" ");
    console.log(removeSpace, "real data")

    const lastSpace = removeSpace.lastIndexOf(" ");

    // remember "Leanne" is not correct yet
    studentName.firstName = removeSpace.substring(0, firstSpace);
    studentName.firstName = removeSpace.substring(0, 1).toUpperCase() + removeSpace.substring(1, firstSpace).toLowerCase();
    // console.log(`First name _${studentName.firstName}_`)

    // remember "ernie"'s quotes need to be removed
    studentName.middleName = removeSpace.substring(firstSpace + 1, lastSpace);
    if (studentName.middleName.length > 2) {
        studentName.middleName = removeSpace.substring(firstSpace + 1, firstSpace + 2).toUpperCase() + removeSpace.substring(firstSpace + 2, lastSpace).toLowerCase();
        // console.log(`Second name _${studentName.middleName}_`);
    } else {
        // console.log("denied");
    }

    studentName.lastName = removeSpace.substring(lastSpace);
    studentName.lastName = removeSpace.substring(lastSpace + 1, lastSpace + 2).toUpperCase() + removeSpace.substring(lastSpace + 2);
    console.log(studentName.lastName);

}