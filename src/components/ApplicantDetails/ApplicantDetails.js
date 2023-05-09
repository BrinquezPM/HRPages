import "./ApplicantDetails.css";
import Chip from "../Chip/Chip";
import FilledButton from "../FilledButton/FilledButton";
import StatusRow from "../StatusRow/StatusRow";
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import axios from "axios";

const ApplicantDetails = (props) => {
  const [modalNotesOpen, setModalNotesOpen] = useState(false);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://localhost:55731/api/ApplicantAPI/getApplicant?id=6")
        .then((response) => {
          setInfo(response.data);
          console.log(response.data);
        });
    };
    fetchData();
  }, []);

  const date = new Date(info.apl_createdDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  async function updateStatus() {
    try {
      const postRequest = await axios
        .put("http://localhost:55731/api/ApplicantAPI/edit", {
          apl_id: info.apl_id,
          apl_firstName: info.apl_firstName,
          apl_lastName: info.apl_lastName,
          apl_email: info.apl_email,
          apl_documentCV: info.apl_documentCV,
          apl_documentPhoto: info.apl_documentPhoto,
          apl_position: info.apl_position,
          apl_status: info.apl_status + 1,
          apl_statusNote: info.apl_statusNote,
        })
        .catch((error) => {
          console.log(error);
          console.log(postRequest.data);
        });
    } catch (error) {
      console.log(error);
    }
    setModalNotesOpen(!modalNotesOpen);
  }

  // function downloadCV() {
  //   window.location.href = info.apl_documentCV;
  // }

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(info.apl_documentCV, { method: "GET" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="applicant-details"
      style={{ marginBlockStart: -565, marginInlineStart: 315 }}
    >
      <h1>Applicant Details</h1>
      <div className="row-container">
        <img
          id="applicant-pp"
          src={info.apl_documentPhoto}
          alt="profile-picture"
        />
        <div className="applicant-information">
          <div className="row-container">
            <h3>
              {info.apl_firstName} {info.apl_lastName}
            </h3>
            <Chip statusId={info.apl_status} />
          </div>
          <div className="row-container">
            <img
              id="applicant-email-img"
              src="./images/main-layout/email-icon.png"
              alt="email-icon"
            />
            <p id="applicant-email">
              {info.apl_email} | {date}
            </p>
          </div>
          <div style={{ display: "flex" }}>
            <FilledButton
              btnImgPath="./images/main-layout/download-icon.png"
              displayBtnImg="inline"
              btnTxt="Download CV"
              id="applicant-details-download-btn"
              display="none"
              path=""
              onClick={handleDownloadPDF}
            />
            <FilledButton
              btnImgPath="./images/main-layout/note-text-outline.png"
              displayBtnImg="inline"
              btnTxt="Notes"
              id="applicant-details-notes-btn"
              display="none"
              onClick={() => setModalNotesOpen(true)}
            />

            {modalNotesOpen && (
              <Modal
                iconDisplay="none"
                title="Notes"
                field="visible"
                fieldTxt="Add notes"
                backgroundColor="#28A745"
                btnTxt="Update"
                onClick={() => setModalNotesOpen(false)}
                onClose={updateStatus}
              />
            )}
          </div>
        </div>
      </div>
      <h4>{info.apl_position} Application Status</h4>
      <StatusRow
        statusName="Pre-Screened"
        statusNumber="1"
        id={info.apl_status !== 1 ? "circular-number-disabled" : undefined}
      />
      <StatusRow
        statusName="HR Interview"
        statusNumber="2"
        id={info.apl_status !== 2 ? "circular-number-disabled" : undefined}
      />
      <StatusRow
        statusName="Technical Interview"
        statusNumber="3"
        id={info.apl_status !== 3 ? "circular-number-disabled" : undefined}
      />
      <StatusRow
        statusName="Final Interview"
        statusNumber="4"
        id={info.apl_status !== 4 ? "circular-number-disabled" : undefined}
      />
      <StatusRow
        statusName="Job Offer"
        statusNumber="5"
        id={info.apl_status !== 5 ? "circular-number-disabled" : undefined}
      />
      <StatusRow
        statusName="Accepted Job Offer"
        statusNumber="6"
        id={info.apl_status !== 6 ? "circular-number-disabled" : undefined}
      />
    </div>
  );
};

export default ApplicantDetails;
