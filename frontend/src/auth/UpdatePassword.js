import React, { useState, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import {passwordValidator,required} from '../common/validators';




const UpdatePassword = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // console.log(location.state.email);

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      var email = location.state?.email;
      // const ForgetRequest = {
      //   password: password,
      //   confPassword: confirmPassword,
      //   email: location.state?.email
      // };


      // {password, confirmPassword, email}
      


      AuthService.forget({password, confirmPassword, email}).then(
        (response) => {
          setMessage(response.data.message);
              setSuccessful(true);
          navigate("/ui/login");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">

        <Form onSubmit={handleSubmit} ref={form}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required,passwordValidator]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confPassword">Confirm Password</label>
            <Input
              type="password"
              className="form-control"
              name="confPassword"
              value={confirmPassword}
              onChange={onChangeConfPassword}
              validations={[required]}
            />
          </div>
         

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Update</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert">
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

export default UpdatePassword;
