import { Link, useNavigate, useLocation } from "react-router-dom";
import WelcomeSlider from "../components/onboarding/welcomeSlider";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectLabel,
} from "../components/ui/select";
import { createListCollection } from "@chakra-ui/react";
import Button from "../components/onboarding/button";
import InputField from "../components/onboarding/inputField";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Spacer from "../components/spacer";

const ResetPas = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const isFirstRender = useRef(true);

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    password: {
      isActive: false,
      message:
        "Password too weak. Use at least 8 characters with letters, numbers, and symbols.",
    },
    confirmPassword: {
      isActive: false,
      message: "Password is not matching",
    },
    serverResponse: {
      message: "",
    },
  });

  const handleChange = (e) => {
    isFirstRender.current = false;
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    let newStateError = { ...error };

    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
    if (!passwordRegex.test(data.password)) {
      newStateError.password.isActive = true;
      isValid = false;
    } else {
      newStateError.password.isActive = false;
    }

    // Validate confirm password
    if (data.confirmPassword !== data.password) {
      newStateError.confirmPassword.isActive = true;
      isValid = false;
    } else {
      newStateError.confirmPassword.isActive = false;
    }

    setError(newStateError);
    return isValid;
  };

  const resetPassword = async () => {
    if (!validateForm()) {
      alert("not valid");
      // return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }), // Send email and verifycode
        }
      );

      const responseData = await response.json();

      if (responseData.success) {
        alert("Password has been successfully reset.");
        navigate("/signin"); // Redirect user to signin page
      } else {
        setError((prevError) => ({
          ...prevError,
          server: {
            isActive: true,
            message: response.data.message || "Failed to reset password.",
          },
        }));
      }
    } catch (err) {
      setError((prevError) => ({
        ...prevError,
        server: {
          isActive: true,
          message:
            err.response?.data?.message || "An unexpected error occurred.",
        },
      }));
    }
  };

  useEffect(() => {
    if (email) {
      setData((prevData) => ({ ...prevData, email }));
    }
  }, [email]);

  // Validate password on input change
  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    setError((prevError) => {
      // Temporary object to hold error
      const passwordError = { ...prevError.password };
      // Check password strength
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,}$/;
      // Set is active to be false when password is not match with regex
      passwordError.isActive = !passwordRegex.test(data.password);
      // update error state
      return { ...prevError, password: passwordError };
    });
  }, [data.password]);

  // Validate confirm password on input change
  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    setError((prevError) => {
      // Temporary object to hold error
      const confirmPasswordError = { ...prevError.confirmPassword };
      // Set is active to be false when confirm password and password doesn't match
      confirmPasswordError.isActive = data.confirmPassword !== data.password;
      // update error state
      return { ...prevError, confirmPassword: confirmPasswordError };
    });
  }, [data.confirmPassword, data.password]);

  return (
    <div className="h-dvh relative">
      <div className="signin-header">
        <div className="relative sm:max-w-sm">
          <WelcomeSlider />
        </div>
      </div>
      <div className="px-4 flex justify-center items-center w-full mt-11">
        <div className="w-full sm:max-w-sm">
          <form>
            <div className="mb-4">
              <InputField
                label="New Password"
                id="password"
                name="password"
                placeholder="********"
                type="password"
                onChange={(e) => {
                  handleChange(e);
                  if (data.password !== data.confirmPassword) {
                    setError({
                      ...error,
                      confirmPassword: {
                        ...error.confirmPassword,
                        isActive: true,
                      },
                    });
                  } else {
                    setError({
                      ...error,
                      confirmPassword: {
                        ...error.confirmPassword,
                        isActive: false,
                      },
                    });
                  }
                }}
                error={error.password.isActive}
              />
              {error.password.isActive ? (
                <p className="text-center text-red-500 font-medium">
                  {error.password.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-4">
              <InputField
                label="Retype new password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                type="password"
                onChange={(e) => {
                  handleChange(e);
                }}
                error={error.confirmPassword.isActive}
              />
              {error.confirmPassword.isActive ? (
                <p className="text-center text-red-500 font-medium">
                  {error.confirmPassword.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="pt-2">
              <Button
                  id="reset-pwd-btn"
                label="Reset Password"
                primary={true}
                onClick={resetPassword}
              />
            </div>
            {error.serverResponse.message ? (
              <p className="text-center text-red-500 font-medium mt-2">
                {error.serverResponse.message}
              </p>
            ) : (
              ""
            )}
            <p className="text-center mt-2 mb-2 font-medium text-blue-900 hover:cursor-pointer">
              <Link to="/signin">Cancel</Link>
            </p>
          </form>
          <Spacer />
        </div>
      </div>
    </div>
  );
};

export default ResetPas;
