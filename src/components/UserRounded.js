import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faGear, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'

const UserRounded = ({ logout }) => {
    return (

        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost !bg-transparent btn-circle avatar ">
                <div className="w-8 rounded-full">
                    <img src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"} />
                </div>
            </label>
            <ul
                tabIndex={0}
                className="mt-3 p-2 shadow-2xl menu menu-compact dropdown-content bg-white rounded-box w-52"
            >
                <li className='flex justify-between items-center w-full flex-row'>
                    <a className="justify-between w-full">
                        <div>
                            <FontAwesomeIcon icon={faUser} />
                            <span className='ml-3'>Profile</span>
                        </div>


                    </a>
                </li>
                <li className='flex justify-between items-center w-full flex-row'>
                    <a className="justify-between w-full">
                        <div>
                            <FontAwesomeIcon icon={faGear} />
                            <span className='ml-3'>Settings</span>
                        </div>


                    </a>
                </li>
                <li onClick={logout} className='flex justify-between items-center w-full flex-row'>
                    <a className="justify-between w-full">
                        <div>
                            <FontAwesomeIcon icon={faSignOut} />
                            <span className='ml-3'>Logout</span>
                        </div>


                    </a>
                </li>
            </ul>
        </div>
    )
}

export default UserRounded