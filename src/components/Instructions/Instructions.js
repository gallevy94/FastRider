import "./Instructions.css";

import TicketIcon from "../../assets/icons/ticket-icon.png";
import ClockIcon from "../../assets/icons/clock-icon.png";
import ArrowIcon from "../../assets/icons/arrow-icon.png";

export const Instructions = () => {
  const instructionData = {
    instructions: [
      {
        id: 1,
        icon: <img className="mainIcon" src={TicketIcon} alt="ticket-icon" />,
        info: "Enter your park ticket #PIN number, then select the desired ride while noting the stated return time",
      },
      {
        id: 2,
        icon: <img className="mainIcon" src={ArrowIcon} alt="arrow-icon" />,
        info: `Press "submit" to confirm and retrieve your access code`,
      },
      {
        id: 3,
        icon: <img className="mainIcon" src={ClockIcon} alt="clock-icon" />,
        info: "When the time comes, use the special fastRider line to cut out a considerable wait time",
      },
    ],
  };
  return (
    <div className="InstructionsWrapper">
      {instructionData.instructions.map((instruction) => (
        <div className="singleInstruction" key={instruction.id}>
          {instruction.icon}
          {instruction.info}
        </div>
      ))}
    </div>
  );
};
