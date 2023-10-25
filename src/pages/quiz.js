import React, { useEffect, useState } from "react";
import "./quiz.css";
import axios from "axios";
import Result from "./result";
const Quiz = () => {
  const [data, setData] = useState([]);

  //for getting next quistion
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  //evide nammal index vechittan select cheyyunath
  const [clickedOption, setClickedOption] = useState(0);
  //result compnent kaanikano vndeyo

  const [showResult, setShowResult] = useState(false);
  const getData = async () => {
    const { data } = await axios.get(" http://localhost:3000/quiz");
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  const newQuestion = () => {
    //eee function vilichaale state update aakullu
    updateScore();
    if (currentQuestion < data.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
    setClickedOption(0);
  };

  //function to check whether answer is true or false

  const updateScore = () => {
    console.log("Clicked Option:", clickedOption);
    console.log("Correct Answer:", data[currentQuestion].answer);
    if (clickedOption === data[currentQuestion].answer) {
      setScore(score + 1);
    } else {
      setWrongAnswer(wrongAnswer + 1);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setScore(0);
    setClickedOption(0);
    setWrongAnswer(0);
  };

  console.log("score", score);
  console.log("assa", clickedOption);
  console.log("wrong", wrongAnswer);
  return (
    <div>
      <p className="heading-txt">QUIZ APP</p>
      <div className="container" id="t1">
        {showResult ? (
          <Result
            score={score}
            totalScore={data.length}
            wrongAnswer={wrongAnswer}
            tryAgain={resetAll}></Result>
        ) : (
          <>
            <div className="question">
              <span id="quetion-number">{currentQuestion + 1} .</span>
              <span id="quetion-txt">{data[currentQuestion]?.question}</span>
            </div>

            <div className="option-container">
              {data[currentQuestion]?.options.map((option, i) => (
                <button
                  //className="option-btn"
                  className={`option-btn ${
                    clickedOption == i + 1 ? "checked" : null
                  }`}
                  onClick={() => {
                    setClickedOption(i + 1);
                  }}>
                  {option}
                </button>
              ))}
            </div>
            <button onClick={newQuestion} type="button" id="next-button">
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
