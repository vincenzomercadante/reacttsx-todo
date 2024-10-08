import React from "react";
import "./style.css";

interface Props {
  txt: string | React.ReactNode;
  type: string;
  onClick?: (e?: any) => void;
}

const MyButton: React.FC<Props> = ({ txt, type, onClick }) => {
  return (
    <>
      {/* button that accept as a parameter the text, type which decides the style of the button & onClick function */}
      <button
        onClick={onClick}
        type={type === "save" ? "submit" : "button"}
        className={
          type === "check" || type === "save"
            ? "button-success"
            : type === "reset"
            ? "button-warning"
            : "button-danger"
        }
      >
        {txt}
      </button>
    </>
  );
};

export default MyButton;
