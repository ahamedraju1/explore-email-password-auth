import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../firebase.init';
import { Link } from 'react-router';

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const emailRef = useRef()
    
    const handleLogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        //Reset
        setSuccess(false);
        setErrorMessage('');

        //user 
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user)
            if(!result.user.emailVerified){
                alert("Please verify your email address!")
            }else{
                 setSuccess(true);
            }
           
        })
        .catch(error=>{
            console.log(error)
            setErrorMessage(error.message);
        })

    }
    const handleForgotPassword = ()=>{
        console.log(emailRef.current.value)
        const email = emailRef.current.value
         
        setErrorMessage('');
        //send email password reset
        sendPasswordResetEmail(auth, email)
        .then(()=> {
            alert("A Password reset email sent you.Please check the email.")

        })
        .catch((error)=>{
            setErrorMessage(error.message)
        })

    }

    return ( 
 
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-3xl font-bold text-center mt-12">Please Login!</h1>
            <div className="card-body">
                <form  
                onSubmit={handleLogin}
                 className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" name='email' ref={emailRef} className="input" placeholder="Email" />
                    <label className="label">Password</label>
                    <input type="password" name='password' className="input" placeholder="Password" />
                    <div><a onClick={handleForgotPassword}
                    className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p>New to this website? <Link to='/signUp' className='text-blue-500 underline'>sign up</Link></p>
                </form>
                {
                    errorMessage &&  <p className='text-red-500'>{errorMessage}</p>
                }
                {
                    success && <p className='text-green-500'>User logged in Successfully</p>
                }
            </div>
        </div>

    );
};

export default Login;