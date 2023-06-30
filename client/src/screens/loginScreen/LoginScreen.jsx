import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import PropTypes from "prop-types";
import axios from "axios";
import loginIcon from "../../assets/login.svg";
import "./LoginScreen.css";
import { UserApi } from "../../services/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";
function LoginScreen(props) {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    const res = await axios({
      method: "post",
      url: login ? UserApi.LOGIN_USER : UserApi.CREATE_USER,
      data: {
        email,
        password,
        ...(!login
          ? {
              name,
            }
          : {}),
      },
    });
    if (res.data.user) {
      props.setUser(res.data.user);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/products");
    } else {
      toast.error("Wrong Credentials");
    }
  }

  return (
    <MDBContainer className=" margintop1 ">
      <MDBCard>
        <MDBRow className="gs-0">
          <MDBCol md="8 mx-0">
            <MDBCardImage
              src={loginIcon}
              alt="login form"
              className="rounded-start w-75 img4"
            />
          </MDBCol>

          <MDBCol md="4" className="margintop2">
            <form onSubmit={handleSubmit}>
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <span className="h1 fw-bold mb-0 colorgreen">Traya .</span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  {login ? "Sing into" : "Sing up"} your account
                </h5>
                {!login && (
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Name"
                    id="formControlLg2"
                    type="text"
                    size="lg"
                    name="name"
                  />
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="formControlLg1"
                  type="email"
                  size="lg"
                  name="email"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlLg3"
                  type="password"
                  size="lg"
                  name="password"
                />

                <MDBBtn
                  className="mb-4 px-5 btngreen "
                  color="#28a745"
                  size="lg"
                >
                  {login ? "Log in" : "Sign up"}
                </MDBBtn>
                <p className="mb-5 pb-lg-2" style={{ color: "#717171" }}>
                  {login ? "  Don't have an account ? " : "Have an accoun ? "}
                  <a
                    href="#!register"
                    style={{ color: "#28a745" }}
                    onClick={() => {
                      setLogin(!login);
                    }}
                  >
                    {login ? "Register here" : "Login here"}
                  </a>
                </p>
                <div className="d-flex flex-row justify-content-start">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

LoginScreen.propTypes = {
  setUser: PropTypes.func.isRequired,
};
export default LoginScreen;
