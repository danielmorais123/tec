import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faMap } from '@fortawesome/free-solid-svg-icons'

const SelectInput = ({ value, setValue }) => {
    return (
        <div className={`w-full lg:w-1/3`}>
            <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faMap} />
                <label for="countries" class="block  text-sm font-medium text-gray-900 dark:text-gray-400 my-auto ml-1">Select an option</label>
            </div>

            <select defaultValue={value} onChange={(e) => setValue(e.target.value)} value={value} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 lg:w-[95%] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option >Portugal</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
            </select>
        </div>
    )
}

export default SelectInput