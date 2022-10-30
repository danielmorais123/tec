import React, { useState } from 'react'

import NavbarIntegrated from '../components/NavbarIntegrated'
import ShopCards from '../components/ShopCards'
import { motion } from 'framer-motion'
import Drawer from '../components/Drawer'
import Sidebar from '../components/Sidebar'
const ShopPage = (props) => {

  const { productsInCart, setProductsInCart, setOpen, open, selected, setSelected } = props


  console.log({ shop: productsInCart })
  return (
    <div className="flex relative flex-row  min-h-screen">
      <Sidebar open={open} selected={selected} setSelected={setSelected} />
      <Drawer open={open} setOpen={setOpen} />
      <div className='bg-gray-100 flex flex-col rounded-tl-[30px] flex-grow'>
        <NavbarIntegrated setOpen={setOpen} open={open} productsInCart={productsInCart} setProductsInCart={setProductsInCart} />
        <ShopCards productsInCart={productsInCart} setProductsInCart={setProductsInCart} />

      </div>


    </div>
  )
}

export default ShopPage