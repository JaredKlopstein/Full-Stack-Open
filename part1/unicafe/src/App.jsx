import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  // Calculate total responses
  const total = good + neutral + bad;
  
  // Calculate average: good = 1, neutral = 0, bad = -1
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total;

  // Calculate positive responses
  const positive = total === 0 ? 0 : good / total;

  return (
    <div>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average.toFixed(2)}</p>
      <p>positive {positive.toFixed(2)}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
};

export default App;
