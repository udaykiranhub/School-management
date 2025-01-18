// import Logo from "../assets/logo.png";
// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Dialog, DialogPanel } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { useDispatch, useSelector } from "react-redux";

// function Header() {
//   // const user = useSelector((state) => state.user.user);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const user = "xgy";

//   return (
//     <>
//       {user ? (
//         <>
//           <header className=" bg-white w-[93vw] fixed  left-3 top-0 lg:left-10  lg:top-0  z-30 rounded-[20px]">
//             <nav
//               aria-label="Global"
//               className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
//             >
//               <div className="flex lg:flex-1">
//                 <a href="#" className="-m-1.5 p-1.5">
//                   <span className="sr-only">Your Company</span>
//                   <img alt="logo" src={Logo} className=" w-[100px] h-[100px]" />
//                 </a>
//               </div>
//               <div className="flex lg:hidden">
//                 <button
//                   type="button"
//                   onClick={() => setMobileMenuOpen(true)}
//                   className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//                 >
//                   <span className="sr-only">Open main menu</span>
//                   <Bars3Icon aria-hidden="true" className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="hidden lg:flex lg:gap-x-12">
//                 <Link
//                   to="/"
//                   className={`text-md font-semibold leading-6 ${
//                     location.pathname === "/"
//                       ? "text-blue-500"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   to="/about-us"
//                   className={`text-md font-semibold leading-6 ${
//                     location.pathname === "/about-us"
//                       ? "text-blue-500"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   About Us
//                 </Link>
//                 <Link
//                   to="/contact-us"
//                   className={`text-md font-semibold leading-6 ${
//                     location.pathname === "/contact-us"
//                       ? "text-blue-500"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   Contact Us
//                 </Link>
//                 <Link
//                   to="/fee-submission"
//                   className={`text-md font-semibold leading-6 ${
//                     location.pathname === "/fee-submission"
//                       ? "text-blue-500"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   Fee Submission
//                 </Link>
//                 <Link
//                   to="/admission-enquiry"
//                   className={`text-md font-semibold leading-6 ${
//                     location.pathname === "/admission-enquiry"
//                       ? "text-blue-500"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   Admission Enquiry
//                 </Link>
//               </div>
//               <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//                 <Link
//                   to="/login"
//                   className="text-xl font-semibold leading-6 text-gray-900"
//                 >
//                   Log in <span aria-hidden="true">&rarr;</span>
//                 </Link>
//               </div>
//             </nav>
//             <Dialog
//               open={mobileMenuOpen}
//               onClose={setMobileMenuOpen}
//               className="lg:hidden"
//             >
//               <div className="fixed inset-0 z-10 " />
//               <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
//                 <div className="flex items-center justify-between">
//                   <a href="#" className="-m-1.5 p-1.5">
//                     <span className="sr-only">Your Company</span>
//                     <img alt="" src={Logo} className="w-[50px] h-[50px]" />
//                   </a>
//                   <button
//                     type="button"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="-m-2.5 rounded-md p-2.5 text-gray-700"
//                   >
//                     <span className="sr-only">Close menu</span>
//                     <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//                   </button>
//                 </div>
//                 <div className="mt-6 flow-root  ">
//                   <div className="-my-6 divide-y divide-gray-500/10">
//                     <div className="py-6 flex flex-col space-y-3">
//                       <Link
//                         to="/"
//                         className={`text-md font-semibold leading-6 ${
//                           location.pathname === "/"
//                             ? "text-blue-500"
//                             : "text-gray-900"
//                         }`}
//                       >
//                         Home
//                       </Link>
//                       <Link
//                         to="/about-us"
//                         className={`text-md font-semibold leading-6 ${
//                           location.pathname === "/about-us"
//                             ? "text-blue-500"
//                             : "text-gray-900"
//                         }`}
//                       >
//                         About Us
//                       </Link>
//                       <Link
//                         to="/contact-us"
//                         className={`text-md font-semibold leading-6 ${
//                           location.pathname === "/contact-us"
//                             ? "text-blue-500"
//                             : "text-gray-900"
//                         }`}
//                       >
//                         Contact Us
//                       </Link>
//                       <Link
//                         to="/fee-submission"
//                         className={`text-md font-semibold leading-6 ${
//                           location.pathname === "/fee-submission"
//                             ? "text-blue-500"
//                             : "text-gray-900"
//                         }`}
//                       >
//                         Fee Submission
//                       </Link>
//                       <Link
//                         to="/admission-enquiry"
//                         className={`text-md font-semibold leading-6 ${
//                           location.pathname === "/admission-enquiry"
//                             ? "text-blue-500"
//                             : "text-gray-900"
//                         }`}
//                       >
//                         Admission Enquiry
//                       </Link>
//                     </div>
//                     <div className="py-6">
//                       <Link
//                         to="/login"
//                         className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                       >
//                         Log Out
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </DialogPanel>
//             </Dialog>
//           </header>
//         </>
//       ) : (
//         <>
//           <header className=" bg-white w-[93vw] fixed  left-3 top-0 lg:left-10  lg:top-0  z-30 rounded-[20px]">
//             <nav
//               aria-label="Global"
//               className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
//             >
//               <div className="flex lg:flex-1">
//                 <a href="#" className="-m-1.5 p-1.5">
//                   <span className="sr-only">Your Company</span>
//                   <img alt="logo" src={Logo} className=" w-[100px] h-[100px]" />
//                 </a>
//               </div>
//               <div className="flex lg:hidden">
//                 <button
//                   type="button"
//                   onClick={() => setMobileMenuOpen(true)}
//                   className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//                 >
//                   <span className="sr-only">Open main menu</span>
//                   <Bars3Icon aria-hidden="true" className="h-6 w-6" />
//                 </button>
//               </div>
//               <div className="hidden lg:flex lg:gap-x-12">
//                 <Link
//                   to="/"
//                   className={`text-md font-semibold leading-6 ${
//                     location.pathname === "/"
//                       ? "text-blue-500"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   to="/about-us"
//                   className={`text-md font-semibold leading-6 ${
//                     location.pathname === "/about-us"
//                       ? "text-blue-500"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   About Us
//                 </Link>
//                 <Link
//                   to="/contact-us"
//                   className={`text-md font-semibold leading-6 ${
//                     location.pathname === "/contact-us"
//                       ? "text-blue-500"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   Contact Us
//                 </Link>
//                 <Link
//                   to="/fee-submission"
//                   className={`text-md font-semibold leading-6 ${
//                     location.pathname === "/fee-submission"
//                       ? "text-blue-500"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   Fee Submission
//                 </Link>
//                 <Link
//                   to="/admission-enquiry"
//                   className={`text-md font-semibold leading-6 ${
//                     location.pathname === "/admission-enquiry"
//                       ? "text-blue-500"
//                       : "text-gray-900"
//                   }`}
//                 >
//                   Admission Enquiry
//                 </Link>
//               </div>
//               <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//                 <Link
//                   to="/login"
//                   className="text-xl font-semibold leading-6 text-gray-900"
//                 >
//                   Log in <span aria-hidden="true">&rarr;</span>
//                 </Link>
//               </div>
//             </nav>
//             <Dialog
//               open={mobileMenuOpen}
//               onClose={setMobileMenuOpen}
//               className="lg:hidden"
//             >
//               <div className="fixed inset-0 z-10 " />
//               <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
//                 <div className="flex items-center justify-between">
//                   <a href="#" className="-m-1.5 p-1.5">
//                     <span className="sr-only">Your Company</span>
//                     <img alt="" src={Logo} className="w-[50px] h-[50px]" />
//                   </a>
//                   <button
//                     type="button"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="-m-2.5 rounded-md p-2.5 text-gray-700"
//                   >
//                     <span className="sr-only">Close menu</span>
//                     <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//                   </button>
//                 </div>
//                 <div className="mt-6 flow-root  ">
//                   <div className="-my-6 divide-y divide-gray-500/10">
//                     <div className="py-6 flex flex-col space-y-3">
//                       <Link
//                         to="/"
//                         className={`text-md font-semibold leading-6 ${
//                           location.pathname === "/"
//                             ? "text-blue-500"
//                             : "text-gray-900"
//                         }`}
//                       >
//                         Home
//                       </Link>
//                       <Link
//                         to="/about-us"
//                         className={`text-md font-semibold leading-6 ${
//                           location.pathname === "/about-us"
//                             ? "text-blue-500"
//                             : "text-gray-900"
//                         }`}
//                       >
//                         About Us
//                       </Link>
//                       <Link
//                         to="/contact-us"
//                         className={`text-md font-semibold leading-6 ${
//                           location.pathname === "/contact-us"
//                             ? "text-blue-500"
//                             : "text-gray-900"
//                         }`}
//                       >
//                         Contact Us
//                       </Link>
//                       <Link
//                         to="/fee-submission"
//                         className={`text-md font-semibold leading-6 ${
//                           location.pathname === "/fee-submission"
//                             ? "text-blue-500"
//                             : "text-gray-900"
//                         }`}
//                       >
//                         Fee Submission
//                       </Link>
//                       <Link
//                         to="/admission-enquiry"
//                         className={`text-md font-semibold leading-6 ${
//                           location.pathname === "/admission-enquiry"
//                             ? "text-blue-500"
//                             : "text-gray-900"
//                         }`}
//                       >
//                         Admission Enquiry
//                       </Link>
//                     </div>
//                     <div className="py-6">
//                       <Link
//                         to="/login"
//                         className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
//                       >
//                         Log in
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </DialogPanel>
//             </Dialog>
//           </header>
//         </>
//       )}
//     </>
//   );
// }

// export default Header;
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.png";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(!!token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryTime");
    setIsLoggedIn(false);
    toast.error("Logged out Succesfully");

    navigate("/login");
  };

  return (
    <>
      <header className="fixed w-full top-0 left-0 z-30 bg-white px-4 sm:px-5 md:px-8">
        <nav
          aria-label="Global"
          className="flex justify-between items-center py-4 md:py-6 bg-white px-10"
        >
          <div className="flex lg:flex-1" >
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt="logo"
                src={Logo}
                width="100px"
                className=""
           
              />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex lg:gap-x-10">
            <Link
              to="/"
              className={`text-sm md:text-lg font-semibold leading-6 ${
                location.pathname === "/" ? "text-blue-500" : "text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className={`text-sm md:text-lg font-semibold leading-6 ${
                location.pathname === "/about-us"
                  ? "text-blue-500"
                  : "text-gray-900"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className={`text-sm md:text-lg font-semibold leading-6 ${
                location.pathname === "/contact-us"
                  ? "text-blue-500"
                  : "text-gray-900"
              }`}
            >
              Contact Us
            </Link>
            <Link
              to="/fee-submission"
              className={`text-sm md:text-lg font-semibold leading-6 ${
                location.pathname === "/fee-submission"
                  ? "text-blue-500"
                  : "text-gray-900"
              }`}
            >
              Fee Submission
            </Link>
            <Link
              to="/admission-enquiry"
              className={`text-sm md:text-lg font-semibold leading-6 ${
                location.pathname === "/admission-enquiry"
                  ? "text-blue-500"
                  : "text-gray-900"
              }`}
            >
              Admission Enquiry
            </Link>
          </div>

          {/* Login / Logout Button */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-md md:text-xl font-semibold leading-6 text-gray-900"
                style={{backgroundColor:"white"}}
              >
                Logout <span aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="text-md md:text-xl font-semibold leading-6 text-gray-900"
                style={{backgroundColor:"white"}}
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Menu Dialog */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-[300px] bg-white max-w-xs overflow-y-auto  p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img alt="logo" src={Logo} className="w-[50px] h-[50px]" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root ">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-6 py-6 flex flex-col">
                  <Link
                    to="/"
                    className={`text-base font-semibold leading-7 ${
                      location.pathname === "/"
                        ? "text-blue-500"
                        : "text-gray-900"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about-us"
                    className={`text-base font-semibold leading-7 ${
                      location.pathname === "/about-us"
                        ? "text-blue-500"
                        : "text-gray-900"
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact-us"
                    className={`text-base font-semibold leading-7 ${
                      location.pathname === "/contact-us"
                        ? "text-blue-500"
                        : "text-gray-900"
                    }`}
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/fee-submission"
                    className={`text-base font-semibold leading-7 ${
                      location.pathname === "/fee-submission"
                        ? "text-blue-500"
                        : "text-gray-900"
                    }`}
                  >
                    Fee Submission
                  </Link>
                  <Link
                    to="/admission-enquiry"
                    className={`text-base font-semibold leading-7 ${
                      location.pathname === "/admission-enquiry"
                        ? "text-blue-500"
                        : "text-gray-900"
                    }`}
                  >
                    Admission Enquiry
                  </Link>
                </div>
                <div className="py-6">
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log Out
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
}

export default Header;
