import "./Chip.css";

const Chip = (props) => {
  return (
    <div className="chip">
      <span>{props.chipTxt}</span>
    </div>
  );
};

export default Chip;
