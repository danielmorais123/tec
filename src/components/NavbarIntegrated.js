import { faBell, faGear, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { supabase } from '../supabase/supabaseConfig';
import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import UserRounded from './UserRounded';
import NotificationTab from './NotificationTab';
import CartIcon from './CartIcon';

const NavbarIntegrated = ({ open, setOpen, productsInCart, setProductsInCart }) => {



    const { authUser, setAuthUser } = useAuth();
    const navigate = useNavigate()

    const logout = async (e) => {
        e.preventDefault();
        await supabase.auth.signOut();
        setAuthUser(null);
    };


    return (
        <div className='flex flex-row   z-10 bg-white xs:rounded-t-[30px]  p-4 justify-between items-center'>
            <div className='flex items-center'>
                <FontAwesomeIcon icon={faBars} className="cursor-pointer" onClick={() => setOpen(!open)} />
                <h1 className='ml-5 text-md xs:text-2xl text-red-400 font-bold tracking-wide'>Shop Astro</h1>
            </div>

            <div className='p-2 flex flex-row items-center'>


                <NotificationTab />
                <CartIcon productsInCart={productsInCart} setProductsInCart={setProductsInCart} />

                <UserRounded logout={logout} />

            </div>
        </div>
    )
}

export default NavbarIntegrated