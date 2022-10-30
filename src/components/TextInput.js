import { faCity, faEnvelopesBulk, faFaceSmile, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useAuth } from '../auth/useAuth'

const TextInput = ({ title, icon, placeholder, value, setValue }) => {

    const { authUser } = useAuth()


    return (
        <div className={`w-full lg:w-1/3`}>
            <label for="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{title}</label>
            <div className={`relative mb-6 w-full lg:w-[95%]  `}>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    {
                        icon === "name" && <FontAwesomeIcon icon={faFaceSmile} className="w-5 h-5 text-gray-400 dark:text-gray-400" />
                    }
                    {
                        icon === "phone" && <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-gray-400 dark:text-gray-400" />
                    }
                    {
                        icon === "city" && <FontAwesomeIcon icon={faCity} className="w-4 h-4 text-gray-400 dark:text-gray-400" />
                    }
                    {icon === "zip" && <FontAwesomeIcon icon={faEnvelopesBulk} className="w-4 h-4 text-gray-400 dark:text-gray-400" />}
                    {icon === "email" && <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>}
                </div>
                <input disabled={icon === "email"} value={icon === "email" ? authUser?.email : value} onChange={(e) => setValue(e.target.value)} type="text" id="input-group-1" className={`bg-gray-50 border ${icon === "email" && "text-red-400"} border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder={placeholder} />
            </div>
        </div>
    )
}

export default TextInput