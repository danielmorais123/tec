import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Address = ({ title, description, subtitle, sub, selectAddress, setSelectAddress }) => {
    return (
        <div className={`${selectAddress && "border-blue-400"} rounded-xl border-2 w-fit px-5 p-4 relative cursor-pointer `} onClick={() => setSelectAddress(true)}>
            <h1 className='text-sm text-gray-600 font-semibold tracking-wider'>Address 1</h1>
            <p className='mt-2 text-sm text-gray-600 font-semibold tracking-wider'>{title}</p>
            <p className=' text-xs mt-1 text-gray-400 font-semibold tracking-wider'>{description}</p>
            <p className=' text-xs mt-1 text-gray-400 font-semibold tracking-wider'>{sub}. {subtitle}</p> 
            {selectAddress ? <FontAwesomeIcon icon={faCheck} className="absolute top-3 right-4 text-blue-400" /> : null}
        </div>
    )
}

export default Address