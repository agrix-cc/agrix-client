import { Link, useNavigate } from "react-router-dom";
import WelcomeSlider from "../components/onboarding/welcomeSlider";
import Button from "../components/onboarding/button";
import InputField from "../components/onboarding/inputField";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ForgotPas = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    forgotemail: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await axios
  //     .post(`${process.env.REACT_APP_SERVER_URL}/signin`, data)
  //     .then((response) => {
  //       const token = response.data.token;
  //       localStorage.setItem("jwtToken", token);
  //       const decoded = jwtDecode(token);
  //       setError("");
  //       if (decoded.user.user_role === "admin") {
  //         navigate("/admin/home");
  //       } else {
  //         navigate("/");
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         setError(error.response.data.message);
  //       } else {
  //         setError(error.message);
  //       }
  //     });
  // };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!data.forgotemail || data.forgotemail.trim() === "") {
      alert("Email is required");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: data.forgotemail,
            subject: "AgriX | Verification Code",
          }),
        }
      );
      const responsemsg = await response.json();
      if (responsemsg.success) {
        alert("Email sent successfully!");
        navigate("/verifycode", { state: { email: data.forgotemail } });
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email.");
    }
  };

  return (
    <div>
      <div className="signin-header">
        <div className="relative sm:max-w-sm">
          <WelcomeSlider />
        </div>
      </div>
      <div className="px-4 flex justify-center items-center w-full mt-11">
        <div className="w-full sm:max-w-sm">
          <InputField
            className="flex-2"
            label="Email Address"
            id="forgotemail"
            name="forgotemail"
            placeholder="Enter your email address"
            type="email"
            value={data.forgotemail}
            onChange={(e) => handleChange(e)}
          />

          <Button
            className="flex-1"
            primary={true}
            label="Send Email"
            onClick={sendEmail}
          />

          <p className="text-center mt-2 mb-2 font-medium text-blue-900 hover:cursor-pointer">
            <Link to="/signin">Cancel</Link>
          </p>

          {error ? (
            <p className="text-center text-red-500 font-medium">{error}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPas;
