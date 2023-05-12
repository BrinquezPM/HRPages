import "./StatusRow.css";
import FilledButton from "../FilledButton/FilledButton";
import { useState } from "react";
import ModalStatus from "../Modal/ModalStatus";

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
              props.id === "circular-number-disabled" || props.statusNumber == 7
                ? "hidden"
                : "visible"
            }
            id="status-update"
            btnTxt="Update"
            display="none"
            onClick={() => setModalUpdateOpen(true)}
          />

          {modalUpdateOpen && (
            <ModalStatus
              iconDisplay="none"
              title="Update Status"
              field="visible"
              fieldTxt="Add a note"
              backgroundColor="#28A745"
              btnTxt="Update"
              value={props.value}
              onChange={props.onChange}
              name="note"
              onBlur={props.onBlur}
              onClick={() => setModalUpdateOpen(false)}
              onClose={props.onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusRow;
