import Authentication from "../../components/Authentication/Authentication";
import logo from "../../assets/logo.png";
import "./AuthenticationPage.css";

function AuthenticationPage() {
  return (
    <div className="authentication-container">
      <div className="page-content">
        <div className="form">
          <h1>Connectez vous à votre compte</h1>
          <Authentication />
        </div>
      </div>
      <div className="image">
        <img src={logo} alt="LOGO"/>
      </div>
    </div>
  );
}

export default AuthenticationPage;
