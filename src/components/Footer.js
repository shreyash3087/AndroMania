import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin,faInstagram,faTwitter } from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <div
      className={` relative pt-16 pb-6 bg-[#7388a6] text-white px-10 w-full mt-10`}
      id="footer"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between text-left lg:text-left">
          <div className={`w-full lg:w-6/12 px-4`}>
            <h4 className={`text-3xl font-semibold text-blueGray-700`}>
              Thanks For Joining In !!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Join the Android Community,Find us on any of these platforms.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="group bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]"
                type="button"
              >
                <a
                  href="https://www.linkedin.com/company/android-club-vit-bhopal/"
                  target="blank"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="group-hover:brightness-0 group-hover:invert"
                  />
                </a>
              </button>
              <button
                className={`group text-gray-500 bg-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]`}
                type="button"
              >
                <a href="https://www.instagram.com/androidclub.vitb/" target="blank">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="group-hover:brightness-0 group-hover:invert"
                  />
                </a>
              </button>
              <button
                className="group bg-white text-red-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]"
                type="button"
              >
                <a href="mailto:androidclub@vitbhopal.ac.in" target="blank">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="group-hover:brightness-0 group-hover:invert"
                  />
                </a>
              </button>
              <button
                className="group bg-white text-black shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:scale-110 hover:bg-[#777]"
                type="button"
              >
                <a href="https://x.com/AndroidClubVitb?t=iPhquCbxjvvGXw7oYszOQQ&s=09" target="blank">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    className="group-hover:brightness-0 group-hover:invert"
                  />
                </a>
              </button>
            </div>
          </div>
          <div className="text-2xl font-bold text-center w-1/3">
            Andro Mania || Full-Stack Combat
            <div className="text-sm mt-2 border-t-2 border-white font-light text-center">
           Quiz Hack Conquer
          </div>
          </div>
          
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className={`text-sm text-blueGray-500 font-semibold py-1`}>
              Copyright © <span id="get-current-year">2024</span>
              <a
                href="#"
                className="text-blueGray-500 hover:text-gray-300"
                target="_blank"
              >
                {" "}
                Android Club | Made By SDC Android Club
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
