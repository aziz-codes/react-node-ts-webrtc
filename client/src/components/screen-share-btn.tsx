import React from 'react'
import {ComputerDesktopIcon} from '@heroicons/react/24/outline'
const ScreenShareBtn:React.FC<{onClick:()=>void}> = ({onClick}) => {
  return (
 
        <button className='px-8 py-2 rounded-md bg-red-500 max-w-xs text-white  hover:bg-red-700' title='share screen' onClick={onClick}>
          <ComputerDesktopIcon className='h-6 w-6 cursor-pointer'/>
        </button>
     
  )
}

export default ScreenShareBtn