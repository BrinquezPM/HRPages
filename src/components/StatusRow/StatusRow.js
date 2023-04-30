import "./StatusRow.css";
import FilledButton from "../FilledButton/FilledButton";

const StatusRow = (props) => {
  return (
    <div className="status-row">
      <div className="row-container">
        <div id={props.id} className="circular-number">
          <span>{props.statusNumber}</span>
        </div>
        <div className="status-details">
          <h6>{props.statusName}</h6>
          <FilledButton
            btnDisplay={
              props.id === "circular-number-disabled" ? "hidden" : "visible"
            }
            id="status-update"
            btnTxt="Update"
            display="none"
          />
        </div>
      </div>
    </div>
  );
};

export default StatusRow;
