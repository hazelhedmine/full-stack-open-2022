import { useState } from "react";

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const feedback = props.feedback;
  const average = props.average;
  const positive = props.positive;

  if (feedback === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {feedback}</p>
      <p>average {average}</p>
      <p>positive {positive * 100}%</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [feedback, setFeedback] = useState(0);
  const [score, setScore] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setFeedback(feedback + 1);
    setScore(score + 1);
    setAverage(score / feedback);
    setPositive(good / feedback);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setFeedback(feedback + 1);
    setAverage(score / feedback);
    setPositive(good / feedback);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setFeedback(feedback + 1);
    setScore(score - 1);
    setAverage(score / feedback);
    setPositive(good / feedback);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        feedback={feedback}
        average={average}
        positive={positive}
      ></Statistics>
    </div>
  );
};

export default App;
