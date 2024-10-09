import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/logo.png";
import Allapi from "../common";
import { toast } from "react-toastify";
import Adminlayout from "./Mainadminlayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DivideIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [logdata, setlogdata] = useState({
    username: "",
    password: "",
  });
  const token = localStorage.getItem("token");
  console.log("thv is", token);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function onchangehandle(e) {
    const { name, value } = e.target;
    setlogdata((prevData) => ({ ...prevData, [name]: value }));
    console.log("data is:", logdata);
  }

  async function onsubmithandle(e) {
    e.preventDefault();
    try {
      const logres = await fetch(Allapi.login.url, {
        method: Allapi.login.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: logdata.username,
          password: logdata.password,
        }),
      });
      const res = await logres.json();
      if (res.success) {
        // Save token to local storage
        const token = res.token;
        console.log("token gen  is", token);
        const expiryTime = new Date().getTime() + 3600 * 1000; // Set expiry time to 1 hour from now
        localStorage.setItem("token", token);
        // localStorage.setItem("expiryTime", expiryTime);
        localStorage.setItem("userData", JSON.stringify(res.data)); // Save user data in localStorage

        console.log("res is", res.data);
        navigate("/admin", { state: { data: res.data } });

        console.log("res is", res.data);

        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    }
  }
  return (
    <>
      <Header />
      {token ? (
        <>
          <div className="mt-80  h-[50vh]">YOU ARE LOGIN</div>
        </>
      ) : (
        <>
          <div className="login_page  min-w-[100vw] mt-12  md:min-w-[90vw]   ">
            <div className="bg-black rounded-md text-white flex min-w-screen min-h-screen flex-col items-center p-16 sm:justify-center sm:pt-0">
              <a href="#">
                <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2 ">
                  <div className="">
                    <div className="bg-white rounded-full w-[120px] h-[120px]">
                      <img src={logo} alt="Logo" />
                    </div>
                    <div>Vidya Nidhi</div>
                  </div>
                </div>
              </a>
              <div className="relative mt-12 w-full max-w-lg sm:mt-10">
                <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
                <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
                  <div className="flex flex-col p-6">
                    <h3 className="text-xl font-semibold leading-6 tracking-tighter">
                      Login
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-white/50">
                      Welcome back, enter your credentials to continue.
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <form onSubmit={onsubmithandle}>
                      <div>
                        <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                          <div className="flex justify-between">
                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                              Username
                            </label>
                            <div className="absolute right-3 translate-y-2 text-green-200"></div>
                          </div>
                          <input
                            type="text"
                            name="username"
                            value={logdata.username}
                            placeholder="Username"
                            autoComplete="off"
                            onChange={onchangehandle}
                            required
                            className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                          <div className="flex justify-between">
                            <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                              Password
                            </label>
                            <div
                              className="cursor-pointer absolute right-3 translate-y-2 text-green-200"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <FaEyeSlash className="text-white text-md" />
                              ) : (
                                <FaEye className="text-white" />
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={logdata.password}
                              onChange={onchangehandle}
                              placeholder="Password"
                              required
                              className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <a
                          className="text-sm font-medium text-foreground underline"
                          href="/forgot-password"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="mt-4 flex items-center justify-end gap-x-2">
                        <Link
                          to={"/"}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
                          href="/register"
                        >
                          Go Back
                        </Link>

                        <button
                          className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                          type="submit"
                          value="submit"
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};
export default Login;
