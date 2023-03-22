import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import quizQuestions from './Questions/quizQuestions.js';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import emailjs from 'emailjs-com';

const DONE_QUIZ = "Done";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
      counter: 0, //counter for the current question in the current path we're in
      currentQuestion: 1,
      currentPath: "firstQuestion",
      prevPath: "firstQuestion",
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: '',
      hasInput: false,
      inputContent: '',
      userAnswers: []
    };

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  getResumeData() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();

    this.setState({
      question: quizQuestions[0]["firstQuestion"][0].question,
      answerOptions: quizQuestions[0]["firstQuestion"][0].answers
    });
  }

  handleAnswerSelected(question, answer, answerType) {
    this.state.userAnswers.push({
      question: question,
      answer: answer
    });
    if (answerType !== DONE_QUIZ) {
      setTimeout(() => this.setNextQuestion(answerType), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  handleBackButtonClick(event) {
    var counter = this.state.counter;
    var currentQuestion = this.state.currentQuestion;
    var currentPath = this.state.currentPath;
    var prevPath = this.state.prevPath;
    this.state.userAnswers.pop();

    if(currentPath !== prevPath) {
      counter = quizQuestions[0][prevPath].length;
      currentPath = prevPath;
    } else if(counter > 1) {
      counter -= 1;
    }
    prevPath = quizQuestions[0][currentPath][counter - 1].prev;
    
    this.setState({
      question: quizQuestions[0][currentPath][counter - 1].question,
      answerOptions: quizQuestions[0][currentPath][counter - 1].answers,
      answer: '',
      counter: counter,
      currentQuestion: currentQuestion - 1,
      currentPath: currentPath,
      prevPath: prevPath,
      hasInput: quizQuestions[0][currentPath][counter - 1].hasInput === undefined ? false : quizQuestions[0][currentPath][counter - 1].hasInput,
      inputContent: quizQuestions[0][currentPath][counter - 1].inputContent === undefined ? '' : quizQuestions[0][currentPath][counter - 1].inputContent,
      userAnswers: this.state.userAnswers
    });
    console.log(this.state.userAnswers)
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  setNextQuestion(nextPath) {
    var counter = this.state.counter;
    var currentQuestion = this.state.currentQuestion;
    var currentPath = this.state.currentPath;
    var prevPath = this.state.prevPath;

    if(currentPath !== nextPath) {
      counter = 0;
      currentPath = nextPath;
    }
    prevPath = quizQuestions[0][currentPath][counter].prev;
    
    this.setState({
      question: quizQuestions[0][nextPath][counter].question,
      answerOptions: quizQuestions[0][nextPath][counter].answers,
      answer: '',
      counter: counter + 1,
      currentQuestion: currentQuestion + 1,
      currentPath: currentPath,
      prevPath: prevPath,
      hasInput: quizQuestions[0][nextPath][counter].hasInput === undefined ? false : quizQuestions[0][nextPath][counter].hasInput,
      inputContent: quizQuestions[0][nextPath][counter].inputContent === undefined ? '' : quizQuestions[0][nextPath][counter].inputContent,
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);
    
    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  formatEmail(){
    var message = '';
    for(let i = 0; i < this.state.userAnswers.length-1; i++){
      message += this.state.userAnswers[i].question + ' \n\n' + this.state.userAnswers[i].answer + " || " + ' \n\n';
    }

    message += this.state.userAnswers[this.state.userAnswers.length-1].question + ' \n\n' 
     + this.state.userAnswers[this.state.userAnswers.length-1].answer.name
     + ' \n\n' + this.state.userAnswers[this.state.userAnswers.length-1].answer.phone + ' \n\n' 
     + this.state.userAnswers[this.state.userAnswers.length-1].answer.email; 
    return message;
  }

  setResults(result) {
    emailjs.send("service_x9h4pih", "template_zo59si8", {
      name: this.state.userAnswers[this.state.userAnswers.length-1].answer.name,
      message: this.formatEmail(),
    }
    , "user_lDkxPxLwNuQZiXpJo7sRD");
    console.log(this.formatEmail());
    this.setState({ result: DONE_QUIZ });
    
  }

  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.currentQuestion}
        question={this.state.question}
        onAnswerSelected={this.handleAnswerSelected}
        onBackButtonClick={this.handleBackButtonClick}
        hasInput={this.state.hasInput}
        inputContent={this.state.inputContent}
        currentQuestion={this.state.counter}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} />
        <About data={this.state.resumeData.main} />
        {this.state.result ? this.renderResult() : this.renderQuiz()}
        <Footer data={this.state.resumeData.main} />
      </div>
    );
  }
}

export default App;
