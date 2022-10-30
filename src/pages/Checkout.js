import React, { useState } from 'react'

import NavbarIntegrated from '../components/NavbarIntegrated'
import ShopCards from '../components/ShopCards'
import { motion } from 'framer-motion'
import Drawer from '../components/Drawer'
import Sidebar from '../components/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import CheckOutSum from '../components/CheckOutSum'
import UserInformation from '../components/UserInformation'

const Checkout = (props) => {

    const { productsInCart, setProductsInCart, setOpen, open, selected, setSelected } = props


    console.log({ check: productsInCart })
    return (
        <div className="flex relative flex-row  min-h-screen">
            <Sidebar open={open} selected={selected} setSelected={setSelected} />
            <Drawer open={open} setOpen={setOpen} />
            <div className='bg-gray-100 flex flex-col rounded-tl-[30px] flex-grow'>
                <NavbarIntegrated setOpen={setOpen} open={open} productsInCart={productsInCart} setProductsInCart={setProductsInCart} />
                <div className='flex   my-3 mx-6 flex-col xl:flex-row'>
                    <UserInformation />
                    <CheckOutSum productsInCart={productsInCart} />
                </div>

            </div>


        </div>
    )
}

export default Checkout