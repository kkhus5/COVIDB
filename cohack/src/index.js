import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import questionAPI from './question';
import QuestionBox from "./components/QuestionBox";
import Result from "./components/ResultBox";
import UserWelcome from "./components/UserWelcome";
import ToggleAge from "./components/ToggleAge";

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: [],
            score: 0,
            responses: 0,
            isOfAge: false,
            ageClicked: false
        };

        this.getQuestions = this.getQuestions.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.computeAnswer = this.computeAnswer.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.toggleAge = this.toggleAge.bind(this);
    }

    // Function to get question from ./question
    getQuestions = () => {
        questionAPI().then(question => {
            this.setState({questionBank: question});
        });
    };

    // Set state back to default and call function
    playAgain = () => {
        this.getQuestions();
        this.setState({score: 0, responses: 0});
    };

    // Function to compute scores
    computeAnswer = (answer, correctAns) => {
        if (answer === correctAns) {
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5
                ? this.state.responses + 1
                : 5
        });
    };

    //onAnswerSelect = () => {
        //this.refs.btn.setAttribute("disabled", "disabled");
    //};

    toggleAge = () => {
        this.setState({
            isOfAge: !this.state.isOfAge,
            ageClicked: !this.state.ageClicked
        });
    };

    // componentDidMount function to get question
    componentDidMount() {
        this.getQuestions();
    }

    render() {
        const score = this.state.score;
        const isOfAge = this.state.isOfAge;
        const ageClicked = this.state.ageClicked;
        const questionBank = this.state.questionBank;
        const questionBankLength = this.state.questionBank.length;
        const responses = this.state.responses;

        return (
        <div className="container">
            {!ageClicked && <ToggleAge toggleAge={this.toggleAge}/>}
            {isOfAge &&
            <StartPage
                score={score}
                isOfAge={isOfAge}
                questionBank={questionBank}
                questionBankLength={questionBankLength}
                responses={responses}
                loadQuestions={this.getQuestions}
                replay={this.playAgain}
                compute={this.computeAnswer}
            />}

            {!isOfAge && ageClicked ? (<div>This is intended only for people who are >= 18 years (link out to CDC) </div>
            ) : (
                !isOfAge && !ageClicked ? (
                    <div> Are you 18 years or older? </div>
                ) : (
                    <div> </div>
                )
            )}
        </div>)
    }
}

class StartPage extends Component {
    constructor(props) {
        super(props);

        this.getQuestions = this.getQuestions.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.computeAnswer = this.computeAnswer.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    // Function to get question from ./question
    getQuestions() {
        this.props.loadQuestions();
    };

    // Set state back to default and call function
    playAgain = () => {
        this.props.replay();
    };

    // Function to compute scores
    computeAnswer = (answer, correctAns) => {
        this.props.compute();
    };

    //onAnswerSelect = () => {
    //this.refs.btn.setAttribute("disabled", "disabled");
    //};

    // componentDidMount function to get question
    componentDidMount() {
        this.getQuestions();
    }

    render() {
        const isOfAge = this.props.isOfAge;
        const score = this.props.score;
        const questionBank = this.props.questionBank;
        const responses = this.props.responses;

        if (isOfAge) {
            return <div>
                <div className="title"> Screening Protocol </div>
                {
                    questionBank.length > 0 && responses < 5 &&
                    questionBank.map(({question, answers,
                    correct, questionId}) => <QuestionBox question=
                    {question} options={answers} key={questionId}
                    selected={answer => this.computeAnswer(answer, correct)}/>)
                }
                {
                    responses === 5
                        ? (<Result score={score}
                                   playAgain={this.playAgain}/>)
                        : null
                }
            </div>
        } else {
            return <div className="notOfAge">
                This is intended only for people who are 18 years or older.
            </div>
        }
    }
}

ReactDOM.render(<Quiz/>, document.getElementById("root"));