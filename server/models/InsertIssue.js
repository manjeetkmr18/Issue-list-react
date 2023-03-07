require('./db');
const Issue = require('./issues')

const tempIssues = [
    { Id: 1, Owner: "Person-A", Status: "Assigned", Created: new Date("2023-01-20"), Effort: 3, Due: new Date("2023-01-24"), Title: "This is First Issue" },
    { Id: 2, Owner: "Person-B", Status: "Resolved", Created: new Date("2023-01-18"), Effort: 2, Due: new Date("2023-01-20"), Title: "This is Second Issue" }
];

Issue.insertMany(tempIssues)
    .then(function (data) {
        console.log("Data", data)
    })
