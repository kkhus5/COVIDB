import React, { Component } from 'react';
import QuestionBox from "./QuestionBox";

class Asymptomatic extends Component {
    constructor(props) {
        super(props);

        this.getAsymptomaticQuestions = this.getAsymptomaticQuestions.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.computeAsymptomatic = this.computeAsymptomatic.bind(this);
    }

    // Function to get question from ./question
    getAsymptomaticQuestions() {
        this.props.loadQuestions();
    };

    // Set state back to default and call function
    playAgain = () => {
        this.props.replay();
    };

    // Function to compute scores
    computeAsymptomatic = (answer, correctAns) => {
        this.props.compute(answer, correctAns);
    };

    // componentDidMount function to get question
    componentDidMount() {
        this.getAsymptomaticQuestions();
    }

    render() {
        const asymptomaticBank = this.props.questionBank;
        const asymptomatic = this.props.responses;

        return <div>
            <div className="title"> Asymptomatic Screening Protocol </div>
            {
                asymptomaticBank.length > 0 && asymptomatic === 0 &&
                asymptomaticBank.map(({question, answers,
                correct, questionId}) => <QuestionBox question=
                {question} options={answers} key={questionId}
                selected={answer => this.computeAsymptomatic(answer, correct)}/>)
            }
            { asymptomatic === 1 &&
            asymptomaticBank.map(({question, answers,
            correct, questionId}) => <QuestionBox question=
            {question} options={answers} key={questionId}
            selected={answer => this.computeAsymptomatic(answer, correct)}/>)
            }
            { asymptomatic === 2 && <div>
                <p> Testing is not recommended at this time. </p>
                <p> You may be asked to wear a mask. </p>
                <p> Practice social distancing. </p>
                <p> Monitor symptoms:
                    <ul>
                        <li> Check your temperature twice daily. </li>
                        <li> Contact your provider if symptoms worsen. </li>
                    </ul>
                </p>
            </div>
            }
        </div>
    }
}

export default Asymptomatic