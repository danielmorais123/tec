import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { faCartShopping, faCircle } from '@fortawesome/free-solid-svg-icons'
import { Rating } from '@mui/material'
import { motion } from 'framer-motion'

import { supabase } from '../supabase/supabaseConfig'
import { useAuth } from '../auth/useAuth'


const ShoppingCard = (props) => {

    const [userSeller, setUserSeller] = useState()
    const [isInCart, setIsInCart] = useState(false)

    const { title, userSellerId, created_at, category, benefits, price, rating, image, id, } = props.product
    const { productsInCart, setProductsInCart } = props

    const { authUser } = useAuth()



    useEffect(() => {
        console.log("useeffect")
        supabase
            .from("users")
            .select("*")
            .eq("id", userSellerId).then((response) => setUserSeller(response.data[0]))

        supabase.from("cart").select("products").eq("id", authUser.id).then((products) => {

            setProductsInCart(productsInCart.filter(p => products.data[0].products.includes(p.id)))

            if (products.data[0].products.filter(p => p === id).length !== 0) {

                setIsInCart(true)
            }
        })
    }, [userSellerId, authUser])






    const removeItemFromCard = (e) => {

        e.preventDefault()
        let deleteItemFromCart = []
        productsInCart.forEach((element) => {
            if (element.id !== id) {
                deleteItemFromCart.push(element.id)
            }
        })

        supabase.from("cart").update({ products: deleteItemFromCart }).eq("id", authUser.id).then((value) => {
            setIsInCart(false)
            setProductsInCart(productsInCart.filter(item => item.id !== id))
        }
        )

    }



    const addItemToCart = (e) => {

        e.preventDefault()
        const copy = Array.from(productsInCart)
        copy.push(props.product)
        let saveItemsOnCart = []
        copy.forEach((element) => {
            saveItemsOnCart.push(element.id)
        })

        supabase.from("cart").update({ products: saveItemsOnCart }).eq("id", authUser.id).then((value) => {
            setIsInCart(true)
            setProductsInCart(copy)

        }
        )

    }


    return (
        <motion.div initial={{ x: -200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }} className='flex flex-col md:flex-row w-[90%] xl:w-[45%] bg-white     mx-auto border p-4 rounded-2xl shadow-xl my-5'>
            <motion.img initial={{ x: -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}

                transition={{ duration: 1.5 }} className='bg-gray-200 p-2 w-[95%] md:w-1/3 mx-auto rounded-2xl object-contain ' src={image[0]} />
            <div className='flex flex-col w-[95%] mx-auto md:p-2 md:justify-between'>
                <div>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-black font-medium tracking-wide p-2 '>{title}</h1>

                    </div>

                    <p className='text-xs px-2 mb-1'>{category}</p>
                    <Rating value={rating} readOnly precision={1} className="px-1 mb-1" />
                    <div className='flex flex-col ml-2 '>

                        {benefits && benefits.map((benefit, index) => (
                            <p key={index} className='text-gray-400 font-thin text-sm md:text-md flex items-center'>
                                <FontAwesomeIcon icon={faCircle} className="text-purple-400 mr-4 text-[0.4rem]" />
                                {benefit}
                            </p>
                        ))}

                    </div>
                </div>

                <div>
                    <p className='p-2 font-bold text-black'>{price}€</p>
                    <div className='flex items-center justify-between'>
                        {
                            !isInCart ? < button onClick={addItemToCart} className="ml-2 bg-blue-500 hover:bg-blue-600 w-fit  focus:ring-4 focus:ring-blue-300 focus:outline-none transition font-medium px-3 p-2 rounded-lg text-sm text-white">
                                <FontAwesomeIcon icon={faCartShopping} className="pr-2" />{'   '}
                                Add to Cart</button> : < button onClick={removeItemFromCard} className="ml-2 bg-red-500 hover:bg-red-600 w-fit  focus:ring-4 focus:ring-red-300 focus:outline-none transition font-medium px-3 p-2 rounded-lg text-sm text-white">
                                <FontAwesomeIcon icon={faCartShopping} className="pr-2" />{'   '}
                                Remove from Cart</button>
                        }



                    </div>

                </div>

            </div>
        </motion.div >
    )
}

export default ShoppingCard