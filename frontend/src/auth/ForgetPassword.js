import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link,useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";
import { OTPValidator,emailValidator,required } from "../common/validators";


const ForgetPassword = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp , setOTP] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [success,setSuccess] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangeOTP = (e) => {
        const otp = e.target.value;
        setOTP(otp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        // setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {

          if(!successful)  {
            AuthService.email({email}).then(
                (response) => {
                  setMessage(response.data.message);
                  setSuccess(true);
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
                }
              );
          }else{
          AuthService.verifyOtp({otp}).then(
            (response) => {
              setMessage(response.data.message);
              setSuccess(true);
              setSuccessful(true);
              navigate("/update-password",{state:{email:email}});
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();

              setMessage(resMessage);
              setSuccess(false);
            }
          );
         }
          
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAbFBMVEX///8AAAADBwgdHBy9vb7BwcE9PT3z8/P8/PwAAAMAAwUICgpAQUHu7u7k5OTW1taPkI9PT080NTXLy8uzs7SHh4eio6MfICDb3NxhYWFKSkokJCRVVVV1dXUpKikSExOYmZppamp+fn6rq6vh8AZGAAAFAklEQVRoge1a2ZKqMBBNi0gksqg4guL+//94OxviGJaw1NyHnKmammIgJ9056e40EOLg4ODg4ODg4ODwn4P+JUOcbs/eXDhv07iZ/A5z4272BiUHgMW8AEjNft9DODM1Z98bDS9BzGxG8PG3JrNjbjacsuVcyE5IvobY6HI+rUOTDifAQTD4hv/4QmhQBii7qTc6HzEoJcGykXsBu3xiYol8p8Zv4WbAjFIciT2O28nNpf5DJo2vONRPFTpa1ptjDZcpuXGkC6wXndw3nB/jWy2ajJqQaCNVJrzeyA2npSfvuyYTEVOSXOWQ3pLPoZl7FcQreefNpIkhyG7S3lVMVx3cJCgg5G6H+3heKnIjbp4QChy5k5vQp1AGKi4YzR3IsUJ44jS6ufGml9wRYiajEKgFhBfP0T3sRuRMPTMmxlGSKxtY/p5JBzfV24IBZCPIM7WrNpEMF73s5v55iEoCC42hQYamwuo1PHh2In25BeSjwB+1DnJy8vL5tLran5tkatFXLdVlEzfBMCH8xmqLZsFNkiPfmhiQEkIsUjrFn70HjAcJrx4ebbjfgfjHxu21Tbr5SAs23CIBSb3YlVIHEVAA0+GHu6zsJiLxMh6Xiqif6UgWFXypmSwD6rDlJsubSmz9FIcqU2nr9kViyY1m5Ge16P1Kqb1a6nP+pU9ru/GR01txnZDFUQgn00DW3Dj5p8qDly6v04sse+BpUscgbl3qQdleSkVl5SHTLAf4nNP7xx6llC6Ojr5ZlgO5Sa7DjOlRiaUOKHnDdhzEzccKyg7F3fW6iPJjMp9LHFSMMxTvlKtMxrKWCDicm/JaQBQUu++bcFhRJmCt0bwXRtiNYjrLLXRL6gz4Z6KC37m1qh/FTeKt5Ag/S6lsIS9vTef6qbgJ1XniXrt4V0IoOkLPSG6hOJnYtI1xwVXGWlU2DTcqToUZKF5JnrwKtbWOWWdtM9bnVAVOVrWkwgVT4XZubuJfaw3AWkMOrs0RbyLuVLn4fZhHkalLafuzo7iFv0ORnstC9OpC/BMXvhSBZQ1l3FpYjYhrWPlKmYVwwBN9ehLLvU0x0BxkOxSO+3m4xUmFqVwmGYJAH6F8FW5b/T40j2ENeFInNGP0ira6WIob9T7Ybr9SVGBOzpUKG/U+1G49src0ywmviTYRE7Obkjsu5Z7iHm2GWhWp96m49fmA67stdlH15qGhSWV7NuC/nkrEx47IhTfrmpIXyV/TtD+XxCexjCJzdUVsyrNaKDuT33HG2ueZpzb1nXY21vmKUF0zel+tGqszMFanT7VtuzPFe6Cr9vuvbond+TveqGBZtFdDn0C/y9C7+XzKyufveGLTcKG6TxT+ijM9ufnKBVrfnn1POdEqqfdFe3OTRJ+CimhAnynStdTmXU/39nmm48mdDHqJUOn9Vum9V09T+xuD866/vr8G3L31Tnv3NPmpk0l9d1eADZBNn4UQzKZ/L1cevFjPLkcbRM+AMd7D7setOqF45hv/zmS/U3p/9OrdJ3qZHlO8K4oeaqujIR3cm+AVqsrrNQEzx0tVeeErEO+Jmt4Lwu6idsYE/tZAv8tC77Jr417oIFoEQ/X9C2Jv6TgjGFrfh2LRM1bfv/HT8U4yrj53gNSf+JW/n0Jllykj0m1l+DyfOsihS+NS/t13HpS3FGYnh0OThv/qux5h+vzfMzXiT7/jcnBwcHBwcHBwcPg/8A+tkUM+kcb5TgAAAABJRU5ErkJggg=="
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleSubmit} ref={form}>
                    {!successful ? (
                        <div>
                            
                            <div className="form-group">
                                <label htmlFor="email">Cognizant Email</label>
                                <Input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, emailValidator]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Send</button>
                            </div>
                            <Link to="/" >Back to login</Link>
                        </div>
                    ) : <>
                    
                    <div className="form-group">
                                <label htmlFor="email">Enter OTP</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="otp"
                                    value={otp}
                                    placeholder="Enter OTP"
                                    onChange={onChangeOTP}
                                    validations={[required, OTPValidator]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Verify OTP</button>
                            </div>


                    
                    </>}

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    success ? "alert alert-success" : "alert alert-danger"
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

export default ForgetPassword;
