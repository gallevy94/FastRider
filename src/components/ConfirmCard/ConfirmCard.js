import { React } from "react";
import "./ConfirmCard.css";

import VIcon from "../../assets/icons/v-icon.png";

export const ConfirmCard = ({ confData, userName }) => {
  console.log(confData, "=========");
  return (
    <div className="confirmClass">
      <div className="singleInstruction">
        <img className="mainIcon" src={VIcon} alt="V-icon" />
        <h2>Hey {userName}!</h2>
        <div>
          Thank you for using The Jungle™ FastRider ticket system - your access
          code is now ready!
        </div>
      </div>
      <div className="confirmationInfo">
        <div
          className="color"
          style={{ backgroundColor: confData.ride.zone.color, height: 5 }}
        ></div>
        <div className="rideZoneName">
          <div className="rideNameConfirmed">{confData.ride.name}</div>
          <div className="zoneName">{confData.ride.zone.name}</div>
        </div>
        <div className="returnTimeCodeInfo">
          <div className="returnheadling">Return At</div>
          <h4 className="returnTimeConfirm">{confData.return_time}</h4>
          <div className="codeHeadling">Use Access Code</div>
          <h4 className="code">{confData.access_code.toUpperCase()}</h4>
        </div>
      </div>
    </div>
  );
};
