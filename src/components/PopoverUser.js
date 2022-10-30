import { Button, Tooltip } from 'flowbite-react'
import React, { useState } from 'react'

const PopoverUser = () => {

    const [openUser, setOpenUser] = useState(false)
    return (
        <Tooltip
            content="<h3>Hello</h3>"
            style="dark"
        >
            <Button>
                Dark tooltip
            </Button>
        </Tooltip>
    )
}

export default PopoverUser