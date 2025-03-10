import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  // Calculate total responses
  const total = good + neutral + bad;
  
  // Calculate average: good = 1, neutral = 0, bad = -1
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total;

  // Calculate positive responses
  const positive = total === 0 ? 0 : good / total;
  if (total === 0) {
    return (
    <div>
      <p>No feedback given</p>
    </div>
  )
  }

  return (
    <div>
      <table>
        <tbody>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={total}/>
      <StatisticLine text='average' value={average}/>
      <StatisticLine text='positive' value={`${positive}%`}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

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
      <Button onClick={handleGood} text='good'/>
      <Button onClick={handleNeutral} text='neutral'/>
      <Button onClick={handleBad} text='bad'/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
};

export default App;
