import React from "react";
import "./Ride.css";

import TicketIcon from "../../assets/icons/grey-ticket.png";
import ClockIcon from "../../assets/icons/grey-clock.png";

export function Ride({
  onRidePress,
  rideIdClick,
  id,
  zoneColor,
  zoneName,
  rideName,
  returnTime,
  remTickets,
}) 
{
  return (
    <div
      className="rideWrapper"
      style={{ backgroundColor: id === rideIdClick ? zoneColor : "#373737" }}
      onClick={() => onRidePress(id)}
    >
      <div
        className="zoneColor"
        style={{ backgroundColor: zoneColor, height: 5 }}
      />
      <div className="rideTitlesWrapper">
        <h4 className="zoneName">{zoneName}</h4>
        <div className="rideName">{rideName}</div>
      </div>
      <div className="timeTicketWrapper">
        <div className="returnTimeWrapper">
          <img className="iconride" src={ClockIcon} alt="clock-icon" />
          <span className="returnTime">{returnTime}</span>
        </div>
        <div className="ticketsWrapper">
          <img className="iconride" src={TicketIcon} alt="clock-icon" />
          <span className="RemainingTickets">{remTickets}</span>
        </div>
      </div>
    </div>
  );
}
