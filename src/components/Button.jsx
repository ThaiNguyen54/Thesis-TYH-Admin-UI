import React from 'react';
import {useNavigate} from "react-router-dom";

import { useStateContext } from '../contexts/ContextProvider';
import constant from "../constants/constants";

const Button = ({ isLogout, icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  const { setIsClicked, initialState } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.setItem(constant.IS_LOGGED_IN, false)
    window.localStorage.removeItem(constant.IS_LOGGED_IN)
    window.localStorage.removeItem(constant.TOKEN)
    window.localStorage.removeItem(constant.AVATAR)
    window.localStorage.removeItem(constant.DISPLAY_NAME)
    navigate('/')
    window.location.reload()
  }

  return (
    <button
      type="button"
      onClick={isLogout === true ? (e) => handleLogout(e) : () => setIsClicked(initialState)}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
