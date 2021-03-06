import React, { useState, useEffect } from "react";
import axios from "axios";
import { Ride } from "../Ride/Ride";
import { useNavigate } from "react-router-dom";

import "./RidesGridSubmit.css";

export function RidesGridSubmit({ setConData, setUserName }) {
  const [rides, setRides] = useState([]); //rides we get from server
  const [userInput, setUserInput] = useState(""); //user input
  const [rideIdClick, setRideIdClick] = useState(0); //ride id from click
  const navigate = useNavigate();

  //gets rides from server
  useEffect(() => {
    axios
      .get(
        `http://fast-rider.herokuapp.com/api/v1/rides?token=433898df4a3e992b8411004109e4d574a90695e39e
`
      )
      .then((res) => {
        const ridesFromAPI = res.data;
        setRides(ridesFromAPI);
        console.log(ridesFromAPI);
      });
  }, []);

  //changes everytime user writes
  const onChangeInput = (event) => {
    setUserInput(event.target.value);
  };

  //changes everytime user click ride
  const onRidePress = (id) => {
    setRideIdClick(id);
  };

  //calls when user click submit btn
  const submitUserInput = () => {
    //turns time to int
    let currentRideTime = changeToTimeOnly(rides.return_time);
    currentRideTime = currentRideTime.replace(":", "");
    const intRideTime = parseInt(currentRideTime);

    if (rideIdClick === 0) {
      alert("Ride was not selected!");
    }

    if (intRideTime < 900 || intRideTime > 1900) {
      alert("Sorry, our park is currently closed!");
    }

    if (rides.remaining_tickets === 0) {
      alert(
        "Sorry, we're sold out on this ride! Please pick a different ride."
      );
    }

    const pin = generateBtn(); //generate a new pin for the post request
    postUserInput(pin); //calls post
  };

  //sends post request
  const postUserInput = (pinNumber) => {
    axios
      .post(`http://fast-rider.herokuapp.com/api/v1/tickets`, {
        pin: pinNumber,
        ride_id: rideIdClick,
        token: "433898df4a3e992b8411004109e4d574a90695e39e",
      })
      .then((res) => {
        setConData(res.data);
        setUserName(userInput);
        res.data.return_time = changeToTimeOnly(res.data.return_time);
        navigate("Confirmation");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  //Changes time stap from server to time only
  const changeToTimeOnly = (returnTime) => {
    const date = new Date(returnTime);

    const hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
    const min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return hour + ":" + min;
  };

  const generateBtn = () => {
    const pinFirstNum = Math.floor(1000 + Math.random() * 9000);
    const pinSecondNum = Math.floor(1000 + Math.random() * 9000);

    const firstChar = calcNumToLetter(pinFirstNum);
    const secondChar = calcNumToLetter(pinSecondNum);

    let newPin =
      "JN-" + pinFirstNum + "-" + pinSecondNum + "-" + firstChar + secondChar;

    return newPin;
  };

  const calcNumToLetter = (pinNum) => {
    const arr = Array.from(String(pinNum), Number);

    let res = 0;
    let sum = 0;

    for (let i = 0; i < 4; i++) {
      sum = 0;

      if (i % 2 === 0) {
        sum += arr[i] * 1;
      } else {
        sum += arr[i] * 2;
      }
      if (sum > 9) {
        res += (sum % 10) + Math.floor(sum / 10);
      } else {
        res += sum;
      }
    }

    res = (res % 26) + 65;
    const pinChar = String.fromCharCode(res);

    return pinChar;
  };

  return (
    <div className="mainWrapper">
      <div className="searchWrapper">
        <input
          className="input"
          onChange={onChangeInput}
          type="text"
          placeholder="Enter Your Name"
        />
        <button className="btn" onClick={submitUserInput}>
          SUBMIT
        </button>
      </div>

      <div className="ridesWrapper">
        {rides.map((ride) => (
          <Ride
            onRidePress={onRidePress}
            rideIdClick={rideIdClick}
            id={ride.id}
            zoneName={ride.zone.name}
            zoneColor={ride.zone.color}
            rideName={ride.name}
            remTickets={ride.remaining_tickets}
            returnTime={changeToTimeOnly(ride.return_time)}
          />
        ))}
      </div>
    </div>
  );
}
