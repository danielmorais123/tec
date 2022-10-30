import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from 'flowbite-react'
import React from 'react'
import { faBell, faEye } from '@fortawesome/free-solid-svg-icons'
import { Divider } from '@mui/material'
import Message from './Message'

const NotificationTab = () => {
    const abc = ["a", "b", "c", "d", "e", "f"]
    return (

        <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost !bg-transparent btn-circle  ">
                <div className='relative cursor-pointer'>
                    <FontAwesomeIcon icon={faBell} className="!h-[19px] object-contain text-gray-400" />
                    <span className='bg-red-400 text-white rounded-full px-1 text-xs absolute top-[-9px] right-[-9px]'>2</span>
                </div>


            </label>
            <div
                tabIndex={0}
                className="mt-3  shadow-2xl menu menu-compact dropdown-content rounded-box bg-white w-[300px]   flex flex-col flex-wrap"
            >
                <div className='w-full flex bg-red-400 text-gray-100 rounded-t-lg cursor-pointer justify-center items-center' >
                    <FontAwesomeIcon icon={faBell} />
                    <h1 className='tracking-wide font-semibold text-sm text-center p-1 '>Notifications</h1>
                </div>

                <Divider />
                <div className='flex flex-col max-h-[250px] overflow-y-scroll  scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-100'>
                    {abc.map((a, index) => (
                        <Message key={a} dontShowDivider={abc.length - 1 === index} />
                    )

                    )}



                </div>
              

            </div>
        </div>
    )
}

export default NotificationTab