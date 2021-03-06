import { useState } from "react";

const MostVotedAnecdote = (props) => {
  const max = Math.max(...props.votes);
  const index = props.votes.indexOf(max);
  return (
    <div>
      <div>{props.anecdotes[index]}</div>
      <div>has {props.votes[index]} votes</div>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(7));

  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const updateAnecdote = () => {
    let index = getRandom(0, 6);
    setSelected(index);
  };

  const voteAnecdonte = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={voteAnecdonte}>vote</button>
      <button onClick={updateAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <MostVotedAnecdote
        anecdotes={anecdotes}
        votes={votes}
      ></MostVotedAnecdote>
    </div>
  );
};

export default App;
