import React, { useEffect, useState, useMemo, useRef } from "react";
import { SandpackProvider, SandpackCodeEditor, SandpackPreview, SandpackLayout,useSandpack } from "@codesandbox/sandpack-react";
import { usePathname } from "next/navigation";
import { CircularProgress, Box, Typography, Button } from "@mui/material";

const Timer = ({ timeLeft, onTimeUp, setTimeLeft }) => {
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp, setTimeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <div className="text-lg">
        Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-teal-500 h-2.5 rounded-full"
          style={{ width: `${(timeLeft / 120) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const Editor = ({ teamName, fixedCode, onSubmit, isSubmitDisabled, timeLeftRef }) => {
  const { sandpack } = useSandpack();
  const [appJsContent, setAppJsContent] = useState("");

  useEffect(() => {
    if (sandpack.files["/App.js"]) {
      setAppJsContent(sandpack.files["/App.js"].code);
    }
  }, [sandpack.files]);

  const handleSubmit = async () => {
    try {
      const cleanedAppJsContent = appJsContent.replace(/\s+/g, "");
      const cleanedFixedCode = fixedCode.replace(/\s+/g, "");

      if (cleanedAppJsContent.trim() === cleanedFixedCode.trim()) {
        const res = await fetch("/api/userdata");
        if (!res.ok) throw new Error("Failed to fetch user data");
        const userData = await res.json();
        const user = userData.find((user) => user.teamName === teamName);
        if (user) {
          const timeLeft = timeLeftRef.current;
          console.log("asdjaskdjkasdkjk",timeLeft);
          const scoreToAdd = 100 + 2 * timeLeft;
          console.log("sadasd",scoreToAdd);
          const updateRes = await fetch(`/api/updateScore`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              teamName: user.teamName,
              score: user.score + scoreToAdd,
            }),
          });
          if (!updateRes.ok) throw new Error("Failed to update score");
          console.log("Score updated successfully");
        }
      } else {
        console.log("Submitted code does not match the fixed code");
      }
    } catch (error) {
      console.error("Error handling submit:", error);
    } finally {
      onSubmit();
    }
  };

  return (
    <>
      <SandpackLayout>
        <div className="flex flex-col w-full">
          <div>
            <SandpackCodeEditor style={{ height: "400px" }} showLineNumbers={true} showRunButton={false} />
          </div>
          <div className="bg-white text-sm border-2 border-gray-100 px-4">Live Output -</div>
          <div>
            <SandpackPreview
              showNavigator
              style={{ height: "150px" }}
              showOpenInCodeSandbox={false}
            ></SandpackPreview>
          </div>
        </div>
      </SandpackLayout>
      <div className="mt-4">
        <Button
          className="py-2 px-4 rounded-lg bg-teal-500 text-white"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      </div>
    </>
  );
};


function Contest({ teamName }) {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [contestData, setContestData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [hasFinished, setHasFinished] = useState(false);
  const timeLeftRef = useRef(timeLeft);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(() => {
  const savedState = localStorage.getItem('isSubmitDisabled');
  return savedState === 'true'; 
});
  useEffect(() => {
    timeLeftRef.current = timeLeft; 
  }, [timeLeft]);
  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const res = await fetch(`/api/contest/${id}`, { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch contest data");
        const data = await res.json();
        setContestData(data);

        if (data.isStarted) {
          const timeElapsed = Math.floor((Date.now() - new Date(data.startTime)) / 1000);
          const questionIndex = Math.floor(timeElapsed / 120);
          const timeRemaining = 120 - (timeElapsed % 120);

          setCurrentQuestionIndex(questionIndex);
          setTimeLeft(timeRemaining);
        }
      } catch (error) {
        console.error("Error fetching contest data:", error);
      }
    };
    fetchContestData();
  }, [id]);

  useEffect(() => {
    if (contestData && contestData.isStarted) {
      const timeElapsed = Math.floor((Date.now() - new Date(contestData.startTime)) / 1000);
      const questionIndex = Math.min(
        Math.floor(timeElapsed / 120),
        contestData.questions.length - 1
      );
      const timeRemaining = 120 - (timeElapsed % 120);
  
      setCurrentQuestionIndex(questionIndex);
      setTimeLeft(timeRemaining);
    }
  }, [contestData]);

  const handleTimeUp = async () => {
    if (currentQuestionIndex === contestData.questions.length - 1) {
      setHasFinished(true);

      try {
        const response = await fetch(`/api/contest/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contestid: id,
            isStarted: false,
            isFinished: true,
          }),
        });
        console.log("Contest status update response:", response);
      } catch (error) {
        console.error("Error updating contest status:", error);
      }
    } else {
      setIsSubmitDisabled(true);
      setTimeout(moveToNextQuestion, 3000);
    }
  };

  const moveToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < contestData.questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(120);
      setIsSubmitDisabled(false);
      localStorage.removeItem('isSubmitDisabled');
    }
  };
  

  const handleSubmit = () => {
    setIsSubmitDisabled(true);
    localStorage.setItem('isSubmitDisabled', 'true');
  };
  

  const memoizedSandpackProvider = useMemo(() => (
    <SandpackProvider
      template="react"
      files={{
        "/App.js": {
          code: contestData?contestData.questions[currentQuestionIndex].initialCode:"",
        },
      }}
      customSetup={{
        dependencies: {
          react: "latest",
          "react-dom": "latest",
        },
      }}
    >
      <Editor
        teamName={teamName}
        fixedCode={contestData?contestData.questions[currentQuestionIndex].fixedCode:""}
        onSubmit={handleSubmit}
        isSubmitDisabled={isSubmitDisabled}
        timeLeftRef={timeLeftRef} 
      />
    </SandpackProvider>
  ), [contestData, currentQuestionIndex, isSubmitDisabled]);

  if (!id) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!contestData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading contest data...
        </Typography>
      </Box>
    );
  }

  if (!contestData.isStarted) {
    return (
      <div className="bg-white flex flex-col justify-center items-center h-screen gap-6">
        <div className="text-[#879bb8] text-4xl">The contest has not started yet.</div>
        <a className="text-gray-100 bg-[#879bb8] px-4 py-2 rounded-lg hover:bg-[#67778e] text-lg" href="/">
          Go Back
        </a>
      </div>
    );
  }

  if (hasFinished || contestData.isFinished) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#ffe0b2",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" color="textSecondary" sx={{ mb: 2 }}>
          The contest has finished.
        </Typography>
        <Button variant="contained" color="secondary" href="/">
          Go Home
        </Button>
      </Box>
    );
  }

  return (
    <div className="p-4 mt-5">
      <h1 className="text-2xl font-bold mb-4">Debugging Contest</h1>
      <div className="flex gap-10 p-4">
        <div className="w-1/2">
          {contestData.isStarted && (
            <>
              <Timer timeLeft={timeLeft} onTimeUp={handleTimeUp} setTimeLeft={setTimeLeft} />
              <div>
                <div className="text-xl my-3">
                  <b>Bug Description:</b> {contestData.questions[currentQuestionIndex].bugDescriptions[0]}
                </div>
              </div>
              <div>
                <div className="text-xl font-bold my-4">
                  Question: {currentQuestionIndex + 1}. {contestData.questions[currentQuestionIndex].questionText}
                </div>
                <pre className="p-4 text-[17px] bg-gray-100 rounded-lg overflow-x-auto">
                  {contestData.questions[currentQuestionIndex].initialCode}
                </pre>
              </div>
            </>
          )}
        </div>
        <div className="w-1/2">
          {memoizedSandpackProvider}
        </div>
      </div>
    </div>
  );
}

export default Contest;