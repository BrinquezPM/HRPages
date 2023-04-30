import "./LoginPage.css";
import LoginCarousel from "../../components/LoginCarousel/LoginCarousel";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="login-page">
      <LoginCarousel />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
