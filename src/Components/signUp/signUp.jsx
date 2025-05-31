import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router';

const signUp = () => {
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = e => {
        e.preventDefault()

        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;

        console.log(email, password, terms);

        //Reset default after clicked shows
        setSuccess(false);
        setErrorMessage('');
        if(!terms){
            setErrorMessage("Please accept our terms and conditions");
            return;
        }
        // password validate
        // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        // if(passwordRegex.test(password) === false){
        //     setErrorMessage('Password must have one lowercase one uppercase and minimum 6 characters long and one digit.')
        //     return; 
        // }
        if (/(?=.*\d)/.test(password) === false) {
            setErrorMessage("Password must include at least one digit")
            return;
        }
        if (!/[a-z]/.test(password)) {
            setErrorMessage("password must have one lowercase");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setErrorMessage("Password must have one uppercase");
            return;
        }
        if (password.length < 6) {
            setErrorMessage("Password must have 6 characters long");
            return;
        }
        setSuccess("");

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
               
                //email verification
                sendEmailVerification(result.user)
                .then(()=>{
                     setSuccess(true); //: UI success message
                     console.log("we sent you a email for verification")
                })
                
            })
            .catch(error => {
                console.log(error)
                setErrorMessage(error.message) //and UI error message
            })

    }

    return (

        <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl my-14">
            <h1 className="text-3xl font-bold">Please Sign up now!</h1>
            <div className="card-body">
                <form onSubmit={handleSignUp}>
                    <label className="label">Email</label>
                    <input type="email" name='email' className="input my-4" placeholder="Email" />
                    <label className="label">Password</label>
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            className="input"
                            placeholder="Password" />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className='btn btn-xs absolute top-2 right-6'>
                            {
                                showPassword ? <FaEyeSlash /> :
                                    <FaEye />

                            }
                        </button>
                    </div>
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <label className="label mt-2">
                        <input type="checkbox" name='terms' className="checkbox" />
                        Accept terms and conditions
                    </label>
                    <br />
                    <button className="btn btn-neutral mt-4">SignUp</button>
                </form>
                <p>Already have an account? Please <Link to='/login' className='text-blue-500 underline'>Login</Link>
                </p> 
                {
                    errorMessage && <p className='text-red-400'>{errorMessage}</p>
                }
                {
                    success && <p className='text-green-500'> User has created successfully !</p>
                }
                {/* {
                    success && <p className='text-green-500'>Password is valid !</p>
                } */}
            </div>
        </div>


    );
};

export default signUp;