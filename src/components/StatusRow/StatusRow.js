import "./StatusRow.css";
import FilledButton from "../FilledButton/FilledButton";
import { useState } from "react";
import Modal from "../Modal/Modal";

const StatusRow = (props) => {
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
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
            onClick={() => setModalUpdateOpen(true)}
          />

          {modalUpdateOpen && (
            <Modal
              iconDisplay="none"
              title="Update Status"
              field="visible"
              fieldTxt="Add notes"
              backgroundColor="#28A745"
              btnTxt="Update"
              onClick={() => setModalUpdateOpen(false)}
              onClose={() => setModalUpdateOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusRow;
