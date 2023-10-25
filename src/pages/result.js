import React from "react";

const Result = (props) => {
  return (
    <>
      <div className="show-score">
        Your Score :{props.score}
        <br />
        Total Score :{props.totalScore}
        <br />
        Wrong Answer :{props.wrongAnswer}
      </div>
      <button id="next-button" onClick={props.tryAgain}>
        Play Again
      </button>
    </>
  );
};

export default Result;
