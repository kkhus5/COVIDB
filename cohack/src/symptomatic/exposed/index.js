import React from "react";

const qBank = [
    {
        question:
            <div>
                Do you have any of the following? (Select any)
            </div>,
        answers: ["Fever or feeling feverish (such as chills, sweating)", "Cough",
            "Mild or moderate difficulty breathing", "Sore throat", "Muscle aches or body aches", "Vomiting or diarrhea",
            "New loss of taste or smell", "Congestion or runny nose", "Other symptoms"],
        correct: [""],
        questionId: "0"
    },
];

//export default (n) => Promise.resolve(qBank.find(element => element === n));

export default (n) => Promise.resolve(qBank.sort().slice(n - 1, n));