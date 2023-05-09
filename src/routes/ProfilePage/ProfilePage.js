import "./ProfilePage.css";
import FilledButton from "../../components/FilledButton/FilledButton";
import InformationRow from "../../components/InformationRow/InformationRow";
import Modal from "../../components/Modal/Modal";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const ProfilePage = (props) => {
  const [isDeactivateModalActive, setIsDeactivateModalActive] = useState(false);
  const toggleDeactivateModal = () => {
    setIsDeactivateModalActive(!isDeactivateModalActive);
  };
  let {state} = useLocation();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          "http://localhost:55731/api/UserAPI/getUser?id=0ffab3f7-fb85-4806-a0fa-ee9d419de037"
        )
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="profile-page">
      <h1>{state.title}</h1>
      <div className="row-container">
        <img
          id="user-pp"
          src="./images/main-layout/james-reid.png"
          alt="profile-picture"
        />
        <div className="user-information">
          <h3>Mel Jefferson Gabutan</h3>
          <div className="row-container">
            <img
              id="user-email-img"
              src="./images/main-layout/email-icon.png"
              alt="email-icon"
            />
            <p id="applicant-email">gabutan.meljefferson@gmail.com</p>
          </div>
          <div className="row-container">
            <Link 
              to="/user" 
              state={{
                formFunction: "Edit",
                user: user
              }}
            >
              <FilledButton
                btnImgPath="./images/main-layout/edit-icon.png"
                displayBtnImg="inline"
                btnTxt="Edit Profile"
                id="profile-edit-btn"
                display="none"
                pathFormFunction="Edit"
              />
            </Link>
            <FilledButton
              onClick={toggleDeactivateModal}
              btnImgPath="./images/main-layout/trash-icon.png"
              displayBtnImg="inline"
              btnTxt="Deactivate"
              id="profile-deactivate-btn"
              display="none"
            />
          </div>
        </div>
      </div>
      {isDeactivateModalActive && (
        <Modal
          onClick={toggleDeactivateModal}
          title="Remove User"
          description="Are you sure you want to remove the user(s)?"
          btnTxt="Remove"
          icon="./images/main-layout/trash-illustration.png"
        />
      )}
      <InformationRow
        icon="./images/main-layout/users-icon.png"
        field="Username"
        value="MelGabutan"
      />
      <InformationRow
        icon="./images/main-layout/phone.png"
        field="Contact Number"
        value="(+63) 927 038 9123"
      />
    </div>
  );
};

export default ProfilePage;
