import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import questionAPI from './question';
import QuestionBox from "./components/QuestionBox";
import Result from "./components/ResultBox";
import UserWelcome from "./components/UserWelcome";
import ToggleAge from "./components/ToggleAge";
import StartSymptoms from "./components/StartSymptoms";
import UnderAge from "./components/UnderAge";
import Disagree from "./components/Disagree";
import Minor from "./components/Minor";
import Asymptomatic from "./components/Asymptomatic";

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionBank: [],
            score: 0,
            responses: 0,
            isOfAge: false,
            isMinor: false,
            ageClicked: false,
            agree: false,
            refresh: true,
            atQuiz: false
        };

        this.getQuestions = this.getQuestions.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.computeAnswer = this.computeAnswer.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.toggleAge = this.toggleAge.bind(this);
        this.toggleAgree = this.toggleAgree.bind(this);
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
        var i;
        for (i = 0; i < correctAns.length; i++) {
            if (answer === "None of the Above") {
                this.setState({
                   responses: 100
                });
            } else {
                if (answer === correctAns[i]) {
                    this.setState({
                        score: this.state.score + 1
                    });
                }
                this.setState({
                    responses: this.state.responses < 5
                        ? this.state.responses + 1
                        : 5
                });
            }
        }
    };

    toggleAge = () => {
        this.setState({
            isOfAge: !this.state.isOfAge,
            ageClicked: !this.state.ageClicked,
            isMinor: false,
            atQuiz: true
        });
    };

    toggleAgree = () => {
        this.setState({
            agree: true
        });
    }

    toggleDisagree = () => {
        this.setState({
            agree: false
        });
    }

    toggleRefresh = () => {
        this.setState({
            refresh: false
        });
    }

    toggleMinor = () => {
        this.setState({
            isMinor: true
        });
    }

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
        const agree = this.state.agree;
        const refresh = this.state.refresh;
        const atQuiz = this.state.atQuiz;
        const isMinor = this.state.isMinor;

        return (
        <div className="container">
            {refresh && <UserWelcome toggleAgree={this.toggleAgree}
                                     toggleDisagree={this.toggleDisagree}
                                     toggleRefresh={this.toggleRefresh}/>}
            {(agree && !atQuiz && !isMinor) ? (
                <ToggleAge toggleAge={this.toggleAge} toggleMinor={this.toggleMinor}/>
            ) : (
                (!refresh && !agree) ? (
                    <Disagree />
                ) : (
                    <div> </div>
                )
            )}

            {isMinor && <Minor />}

            {isOfAge && responses < 7 &&
            <StartSymptoms
                score={score}
                isOfAge={isOfAge}
                questionBank={questionBank}
                questionBankLength={questionBankLength}
                responses={responses}
                loadQuestions={this.getQuestions}
                replay={this.playAgain}
                compute={this.computeAnswer}
            />}

            {responses === 100 &&
                <Asymptomatic
                    score={score}
                    isOfAge={isOfAge}
                    questionBank={questionBank}
                    questionBankLength={questionBankLength}
                    responses={responses}
                    loadQuestions={this.getQuestions}
                    replay={this.playAgain}
                    compute={this.computeAnswer}
                />
            }

        </div>)
    }
}

ReactDOM.render(<Quiz/>, document.getElementById("root"));