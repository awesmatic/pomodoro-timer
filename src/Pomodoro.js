import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [sessions, setSessions] = useState(0);
  const [message, setMessage] = useState(false);
  const [count, setCount] = useState("");
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    if (sessions !== 0 && startTimer) {
      const interval = setInterval(() => {
        clearInterval(interval);
        if (seconds === 0) {
          if (minutes !== 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            let minutes = message ? 25 : 4;
            let seconds = message ? 0 : 59;
            if (message) {
              setSessions(sessions - 1);
            }

            setMessage(!message);
            setSeconds(seconds);
            setMinutes(minutes);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
  }, [seconds, sessions, startTimer]);

  const totalMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const totalSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const sessionsHandler = (event) => {
    event.preventDefault();
  };

  const startButtonHandler = () => {
    setStartTimer(true);
    count && setSessions(count);
    setCount("");
  };
  const stopButtonHandler = () => {
    setStartTimer(false);
  };

  const inputHandler = (e) => {
    console.log(e.target.value);
    setCount(Number(e.target.value));
  };

  console.log(count, sessions);
  return (
    <Container className="container" maxWidth="md">
      <Box>
        <div className="pomodoro">
          <div className="title">Pomodoro Timer</div>
          {message && <div className="message">Its time for break</div>}
          <form onSubmit={(e) => sessionsHandler(e)} className="form">
            <label>Enter the Number of sessions:</label>
            <input
              className="input"
              type="number"
              name="sessions"
              onChange={inputHandler}
              value={count}
            />
          </form>
          <div className="timer">
            {totalMinutes}:{totalSeconds}
          </div>
          <div className="button">
            <Button
              className="btn"
              variant="contained"
              onClick={startButtonHandler}
            >
              start
            </Button>
            <Button
              className="btn"
              variant="contained"
              onClick={stopButtonHandler}
            >
              stop
            </Button>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default Pomodoro;
