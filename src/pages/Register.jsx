import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/features/UserAuthSlice';
import { useUserSignupMutation } from '../redux/services/UserApi';
import { Link } from 'react-router-dom';
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { firebaseAuth } from "./FirebaseConfig"
// import {setAlert, setAlertMsg} from '../redux/features/playerSlice';

const Register = () => {
  const dispatch = useDispatch();
  const [isfocus, setIsfocus] = useState(false);
  const [isError, setIsError] = useState(false);
  const nameRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const CpasswordRef = useRef(null);
  const [SignUPUser, { isLoading }] = useUserSignupMutation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const phoneNumber = phoneNumberRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const cpassword = CpasswordRef.current?.value;
    if(password === cpassword){
    SignUPUser({ phoneNumber, name, email, password })
      .unwrap()
      .then((data) => {
        if (data?.success === true) {
          setIsError(false)
          localStorage.setItem("token", data.authToken)
          dispatch(setUserDetails(data))
          window.location.href = 'https://assets.infinityadvt.com/'
        }
      })
      .catch((error) => {
        console.error('Error Authenicationg user',error);
        if ("user already exist" === error.data.error) {
          setIsError(true)
        }
      });

    }
    else{
        console.log("password and confirm password not matched")
    }

  }


//   const HandleGoogleSignUP = async () => {
//     const provider = new GoogleAuthProvider();

//     try {
//       const { user } = await signInWithPopup(firebaseAuth, provider);
//       console.log('User signed in:');
//       SignUPUser({ profileImage: user.reloadUserInfo.photoUrl, name: user.reloadUserInfo.displayName, email: user.reloadUserInfo.email, password: user.reloadUserInfo.providerUserInfo[0].rawId })
//         .unwrap()
//         .then((data) => {
//           if (data?.success === true) {
//             localStorage.setItem("token", data.authToken)
//             dispatch(setUserDetails(data))
//             window.location.href = 'https://music-rahul.netlify.app/'
//           } else {
//             console.log("user already exist hbjhbjhjjhnihik")
//           }
//         })
//         .catch((error) => {
//           console.error('Error Authenicationg user', error);
//           if ("user already exist" === error.data.error) {
//             dispatch(setAlert(true))
//             dispatch(setAlertMsg('user already exist SignIn instead'))
//           }
//         });
//     } catch (error) {
//       if (error.code === 'auth/cancelled-popup-request') {
//         console.log('User canceled the sign-in process.');
//       } else {
//         console.error('Error signing in:', error);
//       }
//     }
//   };

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
                    Create an account
                </h1>
                <form onSubmit={handleSignUp} autoComplete='true'>
                    <div className="mb-4">
                    <label className="flex py-2 text-sm font-medium text-white d-flex justify-start">Full Name</label>
                    <input minLength={3} required onFocus={() => { setIsfocus(true) }} onBlur={() => { setIsfocus(false) }} placeholder='Name' type="text" ref={nameRef} className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-[5px] px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
                    </div>
                    <div className="mb-4">
                    <label className="flex py-2 text-sm font-medium text-white d-flex justify-start">Email</label>
                    <input required onFocus={() => { setIsfocus(true) }} onBlur={() => { setIsfocus(false) }} placeholder='email' type="email" ref={emailRef} className={`${isError ? "border-[#ff0909]" : "border-[#E9EDF4]"} w-full border rounded-md bg-[#FCFDFE] py-[5px] px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none`} />
                    {isError ? <p className='text-red-600 text-sm font-[450]'>User already exist</p> : ""}
                    </div>
                    <div className="mb-4">
                    <label className="flex py-2 text-sm font-medium text-white d-flex justify-start">Phone number</label>
                    <input required onFocus={() => { setIsfocus(true) }} onBlur={() => { setIsfocus(false) }} placeholder='Phone number' type="number" ref={phoneNumberRef} className={`${isError ? "border-[#ff0909]" : "border-[#E9EDF4]"} w-full border rounded-md bg-[#FCFDFE] py-[5px] px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none`} />
                    {isError ? <p className='text-red-600 text-sm font-[450]'>User already exist</p> : ""}
                    </div>
                    <div className="mb-4">
                    <label className="flex py-2 text-sm font-medium text-white d-flex justify-start">Password</label>
                    <input minLength={8} required onFocus={() => { setIsfocus(true) }} onBlur={() => { setIsfocus(false) }} placeholder='create password' type='password' ref={passwordRef} className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-[5px] px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
                    </div>
                    <div className="mb-4">
                    <label className="flex py-2 text-sm font-medium text-white d-flex justify-start"> confirm Password</label>
                    <input minLength={8} required onFocus={() => { setIsfocus(true) }} onBlur={() => { setIsfocus(false) }} placeholder='create password' type='password' ref={CpasswordRef} className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-[5px] px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
                    </div>

                    <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md py-2 font-medium hover:from-green-600 hover:to-blue-600 focus:outline-none transition-colors"
                    >
                    Sign Up
                    </button>
                </form>
    <p className='text-white'><span className='ml-[14%]' >Did't have any account?<Link to='/login' className='cursor-pointer text-green-300'> Login here</Link></span></p>

            </div>
        </div>
    </div>
  </section>
  );
};

export default Register;





