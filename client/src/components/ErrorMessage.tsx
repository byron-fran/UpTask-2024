import React from 'react'

const ErrorMessage = ({children} : { children :React.ReactNode} ) => {
  return (
    <div className='bg-red-600 text-white p-2 rounded-md'>
        {children}
    </div>
  )
}

export default ErrorMessage
