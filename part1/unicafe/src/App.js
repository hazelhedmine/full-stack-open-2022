import { useState } from "react";

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <p>
        {props.text} {props.value}%
      </p>
    );
  }
  return (
    <p>
      {props.text} {props.value}
    </p>
  );
};

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
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <StatisticLine text="good" value={good}></StatisticLine>
      <StatisticLine text="neutral" value={neutral}></StatisticLine>
      <StatisticLine text="bad" value={bad}></StatisticLine>
      <StatisticLine text="all" value={feedback}></StatisticLine>
      <StatisticLine text="average" value={average}></StatisticLine>
      <StatisticLine text="positive" value={positive * 100}></StatisticLine>
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

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
      <Button handleClick={handleGoodClick} text="good"></Button>
      <Button handleClick={handleNeutralClick} text="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"></Button>
      <h1>statistics</h1>
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
