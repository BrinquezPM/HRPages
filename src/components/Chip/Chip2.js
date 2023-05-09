import "./Chip.css";

const Chip = (props) => {
  let borderColor, textColor, chipTxt;
  switch (props.statusId) {
    case 1:
      chipTxt= "Pre-screened";
      borderColor = "blue";
      textColor = "blue";
      break;
    case 2:
      chipTxt= "HR Interview";
      borderColor = "green";
      textColor = "green";
      break;
    case 3:
      chipTxt= 
      borderColor = "green";
      textColor = "green";
      break;
    case 4:
      chipTxt="Final Interview";
      borderColor = "yellow";
      textColor = "yellow";
      break;
    case 5:
      chipTxt= "Job Offer";
      borderColor = "red";
      textColor = "red";
      break;
    case 6:
      chipTxt=  "Accepted job offer";
      borderColor = "red";
      textColor = "red";
      break;
    default:
      chipTxt= "No Status";
      borderColor = "black";
      textColor = "inherit";
  }

  const chipStyle = {
    border: "1px",
    borderStyle: "solid",
    borderColor: borderColor,
    color: textColor,
  };

  return (
    <div className="chip" style={chipStyle} id={props.statusId}>
      <span>{chipTxt}</span>
    </div>
  );
};

export default Chip;
