import Authentication from "../../components/Authentication/Authentication";
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
      </div>
    </div>
  );
}

export default AuthenticationPage;
