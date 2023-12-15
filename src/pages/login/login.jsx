import './login.css'
import Tilt from 'react-parallax-tilt';
import {Button, message, Modal, Spin} from "antd";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import api from "../../api/api";
import constant from "../../constants/constants";
import {jwtDecode} from "jwt-decode";
const Login = ( {onLogin} ) => {

    const userRef = useRef()
    const errRef = useRef()
    const navigate = useNavigate()

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inputCredential, setInputCredential] = useState({UserName: '', Password: ''})

    const handleLogin = async (event) => {
        event.preventDefault()
        setIsModalOpen(true)
        const credential = {}
        credential["UserName"] = inputCredential.UserName
        credential["Password"] = inputCredential.Password
        console.log(credential)
        try {
            const res = await axios.post(
                api.LOGIN,
                credential
            )

            const decodedToken = jwtDecode(res.data.token)

            window.localStorage.setItem(constant.DISPLAY_NAME, decodedToken.DisplayName)
            window.localStorage.setItem(constant.AVATAR, decodedToken.AvatarUrl)
            window.localStorage.setItem(constant.ID, decodedToken.id)
            window.localStorage.setItem(constant.TOKEN, res.data.token)
            window.localStorage.setItem(constant.IS_LOGGED_IN, true)
            setIsModalOpen(false)
            onLogin(true)
            navigate('/')

        } catch (err) {
            setIsModalOpen(false)
            if (err.response) {
                console.log(err.response.data)
                setErrMsg('Wrong credential! Please input again')
            } else {
                setIsModalOpen(false)
                message.error(err.message)
            }
        }
    }

    return (
        <div style={{textAlign: "center"}} className="App bg-gray-900 h-screen w-screen relative overflow-hidden flex justify-center items-center">
            <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 transform rotate-160 animate-pulse"></div>
            <div className="h-35-r w-35-r bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full absolute top-96 -left-20 transform rotate-180 animate-pulse"></div>
            <Tilt>
                <div style={{ width: "150%", margin: "0 auto" }} className="container h-96 w-96 bg-white bg-opacity-10 rounded-2xl shadow-5xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm">
                    <form className='h-full flex flex-col justify-evenly items-center'>
                        <div className='text-white font-poppins text-2xl tracking-widest'>Login To TYH Admin Portal</div>
                        <input type="text" placeholder='username' className='input-text' onChange={(e) => setInputCredential({ ...inputCredential, UserName: e.target.value})}/>
                        <input type="password" placeholder='password' className='input-text' onChange={(e) => setInputCredential({...inputCredential, Password: e.target.value})}/>
                        {errMsg && <div className="text-red-500">{errMsg}</div>}
                        <Button onClick={ handleLogin } className='cursor-pointer font-poppins rounded-full px-5 py-1 bg-white bg-opacity-50 hover:bg-white hover:bg-opacity-80 '>Login</Button>
                    </form>
                </div>
            </Tilt>

            <Modal
                title="Logging you in"
                open={isModalOpen}
                footer={null}
                closable={false}
                keyboard={false}
                style={{ textAlign: "center"}}
            >
                <Spin size="large"/>

            </Modal>
        </div>
    )
};
export default Login;
