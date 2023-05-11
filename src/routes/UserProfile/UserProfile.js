import "./UserProfile.css";
import FilledButton from "../../components/FilledButton/FilledButton";
import InformationRow from "../../components/InformationRow/InformationRow";
import Modal from "../../components/Modal/Modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";
import { useParams } from "react-router-dom";

const UserProfile = (props) => {
  const params = useParams();
  const userId = params.username;
  const [isDeactivateModalActive, setIsDeactivateModalActive] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const activeUser = auth().user;
  const toggleDeactivateModal = () => {
    setIsDeactivateModalActive(!isDeactivateModalActive);
  };

  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`http://localhost:55731/api/UserAPI/getUser?id=${userId}`)
        .then((response) => {
          setUser(response.data);
          console.log(response.data);
        });
    };
    fetchData();
  }, []);

  async function deactivateUser() {
    try {
      const postRequest = await axios
        .put("http://localhost:55731/api/UserAPI/softdelete", {
          user_id: user.user_id,
          user_firstName: user.user_firstName,
          user_lastName: user.user_lastName,
          user_email: user.user_email,
          user_phoneNumber: user.user_phoneNumber,
          user_username: user.user_username,
          user_password: user.user_password,
          confirm_pass: user.user_password,
          user_isActive: true,
        })
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            if (userId === activeUser) { // if at current user profile
              signOut();
              navigate("/");
            } else { // if at user from users / other users
              navigate("/users");
            }
          }
        })
    } catch (error) {
      console.log(error);
    }
    setIsDeactivateModalActive(!isDeactivateModalActive);
  }

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <div className="row-container">
        <img
          id="user-pp"
          src="../../images/main-layout/james-reid.png"
          alt="profile-picture"
        />
        <div className="user-information">
          <h3>
            {user.user_firstName} {user.user_lastName}
          </h3>
          <div className="row-container">
            <img
              id="user-email-img"
              src="../../images/main-layout/email-icon.png"
              alt="email-icon"
            />
            <p id="applicant-email">{user.user_email}</p>
          </div>
          <div className="row-container">
            <Link
              to={(userId === activeUser) ? "/userformdetails" : "/otheruserformdetails"}
              state={{
                formFunction: "Edit",
                user: user,
              }}
            >
              <FilledButton
                btnImgPath="../../images/main-layout/edit-icon.png"
                displayBtnImg="inline"
                btnTxt="Edit Profile"
                id="profile-edit-btn"
                display="none"
                pathFormFunction="Edit"
              />
            </Link>
            <FilledButton
              onClick={toggleDeactivateModal}
              btnImgPath="../../images/main-layout/trash-icon.png"
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
          onClose={deactivateUser}
          title="Deactivate User"
          description="Are you sure you want to deactivate?"
          btnTxt="Deactivate"
          icon="./images/main-layout/trash-illustration.png"
        />
      )}
      <InformationRow
        icon="../../images/main-layout/users-icon.png"
        field="Username"
        value={user.user_username}
      />
      <InformationRow
        icon="../../images/main-layout/phone.png"
        field="Contact Number"
        value={user.user_phoneNumber}
      />
    </div>
  );
};

export default UserProfile;
