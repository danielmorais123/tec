import { faCartShopping, faTrash } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@mui/material'
import { supabase } from '../supabase/supabaseConfig'
import { useAuth } from '../auth/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'

const CartIcon = ({ productsInCart, setProductsInCart }) => {

    const [total, setTotal] = useState(0)

    const { authUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        let totalCheckout = 0
        productsInCart.forEach((product) => {
            totalCheckout += product.price;

        })
        setTotal(totalCheckout)
    }, [productsInCart])

    return (

        <div className="dropdown dropdown-end ">
            <label tabIndex={0} className="btn btn-ghost !bg-transparent btn-circle  ">
                <div className='relative cursor-pointer'>
                    <FontAwesomeIcon icon={faCartShopping} className="!h-[19px] object-contain text-gray-400" />
                    <span className='bg-red-400 text-white rounded-full px-1 text-xs absolute top-[-9px] right-[-9px]'>{productsInCart.length}</span>
                </div>


            </label>
            <div
                tabIndex={0}
                className="mt-3   shadow-2xl menu menu-compact dropdown-content rounded-box bg-white w-[300px]   flex flex-col flex-wrap"
            >
                <div className='w-full flex bg-purple-400 text-gray-100 rounded-t-lg cursor-pointer justify-center items-center' >

                    <h1 className='tracking-wide font-semibold text-sm text-center p-1 '>Shopping Cart</h1>
                </div>

                <Divider />
                <div className='flex flex-col max-h-[250px] overflow-y-scroll  p-2 scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-100'>

                    {productsInCart.map((product) => (
                        <div className='p-3 flex justify-between flex-row bg-gray-50 text-black cursor-pointer rounded-lg m-2 ' key={product.id}>
                            <div className='flex  items-center'>

                                <img src={product.image} className="h-[40px] object-contain " />
                                <div className='flex flex-col justify-between ml-2'>
                                    <h1 className='tracking-wide'>{product.title}</h1>
                                    <span className='text-xs text-gray-700 font-bold'>{product.price}€</span>

                                </div>
                            </div>

                        </div>

                    ))}
                    <div className='flex items-center'>
                        <div className='ml-4'>
                            <h1 className='text-sm text-black font-semibold tracking-wide'>Total :</h1>
                            <span className="text-sm text-purple-600">{total}€</span>
                        </div>
                        <button onClick={() => navigate("/checkout")} type="button" class="text-white m-2 w-fit mx-auto bg-purple-400 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                            Check Out
                        </button>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default CartIcon