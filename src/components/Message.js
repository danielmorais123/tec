import { Divider } from '@mui/material'
import React from 'react'

const Message = ({dontShowDivider}) => {
    return (
        <>

            <div className='flex p-4 cursor-pointer hover:bg-gray-100 transition '>
                <img src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" className='w-[40px] object-contain rounded-full' />
                <div className='flex flex-col ml-3 justify-between'>
                    <p className='text-sm'>Notification description</p>
                    <span className='text-2xs text-blue-400'>A few minutes ago</span>
                </div>

            </div> {dontShowDivider ? null : <hr className='h-3' />}
            
              </>
    )
}

export default Message