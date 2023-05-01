import "./InformationRow.css";

const InformationRow = (props) => {
  return (
    <div className="information-row">
      <div className="row-container">
        <img src={props.icon} alt="icon" />
        <div className="information-content">
          <h6>{props.field}</h6>
          <p>{props.value}</p>
        </div>
      </div>
    </div>
  );
};

export default InformationRow;
