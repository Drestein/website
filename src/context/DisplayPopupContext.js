import { createContext } from "react";
import { useState } from "react";
const DisplayPopupContext = createContext();

export const DisplayPopupProvider = ({ children }) => {
  const [eventObject, setEventObject] = useState({
    name: "error",
    desc: "error",
    date: "error",
    rules: "error",
    type: "error",
    venue: "error",
    time: "error",
    tagline: "error",
    format: "error",
    members: "error",
    round1: "error",
    round1title: "error",
    round2: "error",
    round2title: "error",
    round3: "error",
    round3title: "error",
    round4: "error",
    round4title: "error",
    judge: "error",
    prize: "error",
    staff: [],
    student: [],
    logo: "error",
    // workshop details:
    day1 : "error",
    day2: "error"
  });
  return (
    <DisplayPopupContext.Provider
      value={{
        eventObject,
        setEventObject,
      }}
    >
      {children}
    </DisplayPopupContext.Provider>
  );
};

export default DisplayPopupContext;
