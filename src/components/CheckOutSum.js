import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const CheckOutSum = ({ productsInCart }) => {


  return (
    <div className='bg-white p-7 mt-3 rounded-2xl w-full xl:w-[30%] xl:ml-6 h-fit'>

      <div className="  p-2 rounded-lg">
        <h1 className='ml-2  text-lg tracking-wider'>Cart Summary</h1>
      </div>
      <div class="overflow-x-auto relative bg-transparent sm:rounded-lg mt-2 p-2" >
        <table class="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-transparent dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Image
              </th>
              <th scope="col" class="py-3 px-6">
                Product
              </th>

              <th scope="col" class="py-3 px-6">
                Price
              </th>

            </tr>

          </thead>

          <tbody>

          { /* productsInCart.map((product) => (


              <tr key={product.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                <td class="p-4 w-32 ">
                  <img src={product.image[0]} alt="Product" className='bg-gray-100 p-2 rounded-lg' />
                </td>
                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </td>

                <td class="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  €{product.price}
                </td>
                <td class="py-4 px-6">
                  <FontAwesomeIcon icon={faTrash} className="text-red-400" />
                </td>
              </tr>



          )) */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CheckOutSum