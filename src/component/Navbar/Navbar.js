import { signOut } from 'firebase/auth';
import React from 'react';
import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
import './Navbar.css'
const Navbar = () => {
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);

    const [user, loading, error] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
      };

    return (
        <div className='navbar'>
            <h3>MY MID JOURNEY</h3>
           {user? <button onClick={logout} className='signout-btn'>Sign out</button> : <button onClick={() =>signInWithGoogle()} className='login-btn'>Login</button>}
        </div>
    );
};

export default Navbar;