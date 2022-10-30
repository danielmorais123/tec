import { faCheck, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const PaymentMethodCard = ({ type, title }) => {
    return (
        <div className={` border-gray-300 rounded-xl border-2 w-[200px] h-[150px] px-5 p-4 relative  flex items-center justify-center  flex-col mr-4`} >
            {type === "credit" && <FontAwesomeIcon icon={faCreditCard} className="w-8 object-contain h-8 text-red-500" />}
            {type === "paypal" && <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(37 99 235)" className="w-8 object-contain h-8 !text-blue-400"  viewBox="0 0 384 512"><path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z" /></svg>}

            <h1 className='text-sm text-gray-600 font-semibold mt-2'>{title}</h1>

            <FontAwesomeIcon icon={faCheck} className="absolute top-3 right-4 text-green-500" />
        </div>
    )
}

export default PaymentMethodCard