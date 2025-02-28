import React, { useRef, useState } from 'react';
// import google from '../assets/google.svg'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/features/UserAuthSlice';
import { useUserLoginMutation } from '../redux/services/UserApi';
import { Link } from 'react-router-dom';
// import IconLoading from '../assets/my-loader.svg'
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { firebaseAuth } from "./FirebaseConfig"
// import {setAlert, setAlertMsg} from '../redux/features/playerSlice';


const Login = ({ showPopup, handleTogglePopup, handleTogglePopupOut }) => {
    const dispatch = useDispatch();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [isfocus, setIsfocus] = useState(false);
    const [SignInUser, { isLoading }] = useUserLoginMutation();
    const [isError, setIsError] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        SignInUser({ email, password })
            .unwrap()
            .then((data) => {
                if (data?.success === true) {
                    setIsError(false)
                    localStorage.setItem("token", data.authToken)
                    dispatch(setUserDetails(data))
                    window.location.href = process.env.REACT_APP_CLIENT_URL
                }
            })
            .catch((error) => {
                console.error('Error Authenicationg user');
                if ("user does not exist" === error.data.error) {
                    setIsError(true)
                }
            });
    }

    // const HandleGoolelogin = async () => {
    //     const provider = new GoogleAuthProvider();
    //     try {
    //         const { user } = await signInWithPopup(firebaseAuth, provider);
    //         console.log('User signed in:');
    //         SignInUser({ email: user.reloadUserInfo.email, password: user.reloadUserInfo.providerUserInfo[0].rawId })
    //             .unwrap()
    //             .then((data) => {
    //                 if (data?.success === true) {
    //                     setIsError(false)
    //                     localStorage.setItem("token", data.authToken)
    //                     dispatch(setUserDetails(data))
    //                     window.location.href = 'https://music-rahul.netlify.app/'
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error('Error Authenicationg user');
    //                 if ("user does not exist" === error.data.error) {
    //                     dispatch(setAlert(true))
    //                     dispatch(setAlertMsg("User does not exist"))
    //                 }
    //             });


    //     } catch (error) {
    //         if (error.code === 'auth/cancelled-popup-request') {
    //             console.log('User canceled the sign-in process.');
    //         } else {
    //             console.error('Error signing in:', error);
    //         }
    //     }

    // }

    return (
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
            Asset Management    
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Login an account
                </h1>
    
    <form onSubmit={handleLogin} autoComplete='true' autoFocus>
    <div className="mb-4">
        <label className="flex py-2 justify-start text-sm font-medium text-white">Username</label>
    
        <input
            required
            onInput={() => { setIsError(false) }}
            type="email"
            ref={emailRef}
            onFocus={() => { setIsfocus(true) }}
            onBlur={() => { setIsfocus(false) }}
            placeholder="Email or Username"
            className={`${isError ? "border-[#ff0909]" : "border-[#E9EDF4]"} w-full rounded-md border bg-[#FCFDFE] py-2 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none`}
        />
        {isError ? <p className='text-red-600 text-sm font-[450]'>Invalid credentials</p> : ""}
    </div>
    <div className="mb-4">
        <label className="flex py-2 justify-start text-sm font-medium text-white">Password</label>
        <input required minLength={8} onInput={() => { setIsError(false) }} onBlur={() => { setIsfocus(false) }} onFocus={() => { setIsfocus(true) }} type="password" ref={passwordRef} placeholder='password' className={`${isError ? "border-[#ff0909]" : "border-[#E9EDF4]"} w-full rounded-md border bg-[#FCFDFE] py-2 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none`} />
        {isError ? <p className='text-red-600 text-sm font-[450]'>Invalid credentials</p> : ""}
    </div>
    <button
        type="submit"
        className="w-full bg-gradient-to-r mt-5 mb-0 from-purple-500 to-pink-500 text-white rounded-md py-2 font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none transition-colors"
    >
        Sign In
    </button>
    </form>
    <p className='text-white'><span className='ml-[14%]' >Did't have any account?<Link to='/register' className='cursor-pointer text-green-300'> Register here</Link></span></p>
    
    </div>
            </div>
        </div>
      </section>
    )
}

export default Login;




