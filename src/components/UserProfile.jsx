import React, {useState} from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import {useNavigate} from "react-router-dom";
import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/cat1.jpeg';
import Axios from "axios";
import api from "../api/api";
import constant from "../constants/constants";
import { jwtDecode } from "jwt-decode";
import {Input, Modal} from "antd";


const UserProfile = () => {
    const { currentColor } = useStateContext();
    const [superAdminUpdatePass, setSuperAdminUpdatePass] = useState(false)
    const navigate = useNavigate();
    const decodedToken = jwtDecode(localStorage.getItem(constant.TOKEN))
    let role = ''

    if (decodedToken.Role === 1) {
        role = 'Super Admin'
    } else if (decodedToken.Role === 2) {
        role = 'Admin'
    }

    const onClick = (index) => {
        if (index === 0) {
            navigate('/changepass')
        } else if (index === 1) {
            navigate('/changedisplayname')
        } else if (index === 2) {
            console.log('update avatar')
        }
    }

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Setting</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {localStorage.getItem(constant.DISPLAY_NAME)} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {role}   </p>
          {/*<p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> TYH@gmail.com </p>*/}
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
              onClick={() => onClick(index)}
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
          isLogout={true}
        />
      </div>
    </div>

  );
};

export default UserProfile;
