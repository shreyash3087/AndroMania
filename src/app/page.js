"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link as ScrollLink, Element } from "react-scroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContext } from 'react';
import { TeamContext } from '../../context/TeamContext';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { teamName, setTeamName } = useContext(TeamContext);
  const [member1, setMember1] = useState(""); 
  const [member2, setMember2] = useState(""); 
  const [member3, setMember3] = useState("");
  const [contestId, setContestId] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Clear localStorage when the component mounts
    localStorage.clear();
  }, []);

  const handleJoin = async () => {
    try {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const uniqueTeamName = `${teamName}#${randomId}`;
      const response = await fetch("/api/userdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamName: uniqueTeamName, 
          member1,
          member2,
          member3,
          contestId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data.message);
        setTeamName(uniqueTeamName);
        router.push(`/contest/${contestId}`);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Header />
      <div className="bg-white shadow-md rounded-lg min-h-[650px] p-16 w-full flex justify-center items-center gap-10 text-7388a6">
        <div className="w-1/2 flex flex-col justify-center items-center p-10 rounded-xl">
          <h1 className="text-[2.5rem] font-bold mb-4 text-center leading-[1.3]">
            Welcome to Android Club&apos;s Debug Round
          </h1>
          <p className="text-lg mb-6">
            Are you excited for the second round!
          </p>
          <div className="flex gap-10 justify-center items-center">
            <div>
              <img src="/qr.png" className="w-48" alt="QR Code" />
            </div>
            <div className="flex flex-col gap-4">
              <ScrollLink
                to="rules"
                smooth={true}
                duration={500}
                className="bg-[#879bb8] text-white font-bold h-14 w-40 rounded-full flex items-center justify-center cursor-pointer"
              >
                Instructions {"->"}
              </ScrollLink>
              <button
                className="border-[#879bb8] border-2 text-[#879bb8] font-bold h-14 w-40 rounded-full"
                onClick={() => setIsModalOpen(true)}
              >
                Get Started {"->"}
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <img src="/android-bot.jpg" alt="Android Bot" />
        </div>
      </div>

      <Element name="rules" className="w-full">
        <div className="bg-white shadow-md rounded-lg py-16 px-10 w-full mt-8">
          <h2 className="text-2xl font-bold mb-4">Rules and Instructions</h2>
          <ul className="space-y-2 text-left">
            <li className="flex gap-1 items-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mr-2"
                width={15}
              />
              You will be presented with React Based code snippets containing
              bugs.
            </li>
            <li className="flex gap-1 items-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mr-2"
                width={15}
              />
              Carefully read the code snippet provided.You will be given <b>two minutes</b> to debug the code.
            </li>
            <li className="flex gap-1 items-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mr-2"
                width={15}
              />
              Read the bug description carefully,the bugs would be small and you have to accurately solve that bug to earn points.
            </li>
            <li className="flex gap-1 items-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mr-2"
                width={15}
              />
              Submit your fixed code before the timer runs out.
            </li>
            <li className="flex gap-1 items-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mr-2"
                width={15}
              />
              Make sure your code is functional and meets the requirements.
            </li>
            <li className="flex gap-1 items-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mr-2"
                width={15}
              />
              <b>
                Scoring: +100 points for a correct bug fix.
              </b>
            </li>
            <li className="flex gap-1 items-center">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mr-2"
                width={15}
              />
              <b>
                Bonus: Twice the amount of time left for that question will be added in your score as bonus,so be fast to earn more points.
              </b>
            </li>
          </ul>
        </div>
      </Element>

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4">Enter Team Details</h3>
            <div className="mb-4">
              <label className="block text-left">Team Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter your team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-left">Member 1 (Leader)</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter member 1 name"
                value={member1}
                onChange={(e) => setMember1(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-left">Member 2</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter member 2 name (leave blank if solo)"
                value={member2}
                onChange={(e) => setMember2(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-left">Member 3</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter member 3 name (leave blank if solo)"
                value={member3}
                onChange={(e) => setMember3(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-left">Contest ID</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter contest ID"
                value={contestId}
                onChange={(e) => setContestId(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-[#879bb8] text-white font-bold py-2 px-4 rounded"
                onClick={handleJoin}
              >
                Join Contest
              </button>
              <button
                className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
