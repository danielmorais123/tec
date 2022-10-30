import React, { useState } from 'react'
import log from '../img/logo.png'
import { faUser, faShop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'


const Sidebar = ({ open, selected, setSelected }) => {

    const navigate = useNavigate()

    return (
        <div className={` hidden xl:flex ${open ? "w-[300px]" : "w-[100px]"}  transition items-center justify-start flex-col`}>
            <img src={log} className={`object-contain max-w-[130px] ${!open && "w-[60px] mt-5"}`} />

            <ul className={`flex mt-7 flex-col w-full ${open ? "justify-start" : "justify-center"}`} >
                <li onClick={() => {

                    setSelected("shop")
                    navigate("/")
                }} className={`flex items-center  ${!open && selected === "shop" && "w-fit mx-auto hover:bg-red-400 mt-3"} ${!open && "p-4"} cursor-pointer transition ${selected === "shop" && "bg-red-500  text-white hover:bg-red-400"} p-2 font-semibold   rounded-lg ${open ? "w-[80%] mx-auto justify-start" : "justify-center"} `}>
                    <FontAwesomeIcon icon={faShop} className="w-[24px]" />
                    <span className={`${!open && "hidden"} ml-2 tracking-wider`}>Shop</span>
                </li>
                <li onClick={() => {

                    setSelected("chat")
                    navigate("/chat")
                }} className={`flex items-center ${!open && selected === "chat" && "w-fit mx-auto hover:bg-red-400 mt-3"} ${!open && "p-4"} cursor-pointer transition ${selected === "chat" && "bg-red-500  text-white hover:bg-red-400"} p-2 font-semibold   rounded-lg ${open ? "w-[80%] mx-auto justify-start" : "justify-center"} `}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                    <span className={`${!open && "hidden"} ml-2 tracking-wider`}>Chat</span>
                </li>
                <li onClick={() => {

                    setSelected("profile")
                    navigate("/profile")
                }} className={`flex items-center  ${!open && selected === "profile" && "w-fit mx-auto hover:bg-red-400 mt-3"} ${!open && "p-4"} cursor-pointer transition ${selected === "profile" && "bg-red-500  text-white hover:bg-red-400"} p-2 font-semibold   rounded-lg ${open ? "w-[80%] mx-auto justify-start" : "justify-center"} `}>
                    <FontAwesomeIcon icon={faUser} className="w-[24px]" />
                    <span className={`${!open && "hidden"} ml-2 tracking-wider`}>Profile</span>
                </li>
            </ul>
        </div >
    )
}

export default Sidebar