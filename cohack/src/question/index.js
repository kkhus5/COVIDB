const qBank = [
    {
        question:
            "Are you 18 years or over?",
        answers: ["Yes", "No"],
        correct: "Yes",
        questionId: "1"
    },
    {
        question:
            "Are you experiencing any of these symptoms?",
        answers: ["Fever or Feeling Feverish (chills, sweating)", "Difficulty Breathing (not severe)", "Whole Body Aches", "Vomiting or Diarrhea", "None of the Above"],
        correct: ["Difficulty Breathing", "Fever or Feeling Feverish (chills, sweating)"],
        questionId: "2"
    },
];

// () => 0.5 - Math.random()
export default (n = 5) =>
    Promise.resolve(qBank.sort().slice(0, n));