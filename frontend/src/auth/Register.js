import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import {passwordValidator,required,vusername,idValidator,emailValidator,confirmPasswordValidator} from '../common/validators';

import AuthService from "../services/auth.service";

// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="invalid-feedback d-block">
//         This field is required!
//       </div>
//     );
//   }
// };

// const validEmail = (value) => {    // 2078563@cognizant.com
//   if (!isEmail(value)) {
//     return (
//       <div className="invalid-feedback d-block">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="invalid-feedback d-block">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

// const userid = (value) => {                 //2078563
//   const regex = new RegExp('^[0-9]{5,8}+$/');
//   // const pattern = "/^[0-9]{5,8}+$/";
//   if (regex.test(value)) {
//     return (
//       <div className="invalid-feedback d-block">
//         The userid/cognzantId must be between 5 and 8 digits.
//       </div>
//     );
//   }
// };

// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {     //123456
//     return (
//       <div className="invalid-feedback d-block">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

const cpassword = (password,confPassword) => {       
  console.log(password);  
  // console.log(confPassword.value);               //123456
  if (password !== confPassword.value) {
    return (
      <div className="invalid-feedback d-block">
        The password do not match
      </div>
    );
  }
  return "";
  

};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [cognizantId, setCognizantId] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const userName = e.target.value;
    setUserName(userName);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeCognizantId = (e) => {
    const cognizantId = e.target.value;
    setCognizantId(cognizantId);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };


  const onChangeConfPassword = (e) => {
    const confPassword = e.target.value;
    setConfPassword(confPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register({userName, email, password,cognizantId,confPassword}).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-4 offset-md-4">
      <h3 className="text-center">Registration Form</h3>
      <div className="card">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
                <div className="form-group">
                  <label htmlFor="userName">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="userName"
                    value={userName}
                    onChange={onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cognzantId">Cognizant Id</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="cognzantId"
                    value={cognizantId}
                    onChange={onChangeCognizantId}
                    validations={[required, idValidator]}
                  />
                </div>

              <div className="form-group">
                <label htmlFor="email">Cognizant Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, emailValidator]}
                />
              </div>
            
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required, passwordValidator]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword">Confirm Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="cpassword"
                    value={confPassword}
                    onChange={onChangeConfPassword}
                    validations={[required,cpassword]}
                  />
                </div>
            

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
