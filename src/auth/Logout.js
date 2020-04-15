import React from 'react'
import { signOut } from '../firebase/Auth'

export const Logout = () => {
    return (
        <button onClick={signOut} className='btn btn-danger btn-lg btn-block logout bg-violet'>Logout</button>
    )
}
