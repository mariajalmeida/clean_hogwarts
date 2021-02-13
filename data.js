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
    console.log(s)
}