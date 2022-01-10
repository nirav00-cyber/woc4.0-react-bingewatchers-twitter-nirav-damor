import React,{useState,useRef} from 'react'
import {useHistory} from 'react-router-dom'
import './LoginForm.css';
import { useAuth } from '../lib/AuthContext';

function LoginForm()
{
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    
    const { signup, login } = useAuth();
    const history = useHistory();

    async function submitHandler(e)
    {
        e.preventDefault();
        if (isLogin)
        {
            try
            {
                setIsLoading(true);
                await login(emailRef.current.value, passwordRef.current.value);
                setIsLoading(false);
                history.push('/');
            } catch (error)
            {
                setIsLoading(false);
                // console.log();
                setError("Error Occured : Enter Valid Email and password"); 
            }
        }
        else 
        {
        if (passwordConfirmRef.current.value !== passwordRef.current.value)
        {
            return setError("password did not match"); 
        }
        try
        {
            setError("")
            setIsLoading(true);
           await signup(emailRef.current.value, passwordRef.current.value)
           setIsLoading(false);
           history.push('/');
        } catch (error)
        {
            setIsLoading(false);
            setError('Error occured while sign Up : account may already exist try using different credentials')
            // console.log(error + '   signup Failed')
        }    
        }
        
    }

    const toggleLoginModeHandler = () =>
    {
        setIsLogin((prevState)=>!prevState);
    }
    return (
        <div className='container'>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            {error && <div className='error'>{error}</div>}

            <form onSubmit={submitHandler}>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text' id='email' placeholder='Enter Email' ref={emailRef}
                    required/>
 
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Enter Password' ref={passwordRef}
                    required/>

                </div>
                {!isLogin && <div className='form-control'>
                    <label htmlFor='confirm-password'>Confirm Password</label>
                    <input
                        type='password'
                        id='confirm-password'
                        placeholder='Enter Password' ref={passwordConfirmRef}
                        required />
                </div>}
                <button disabled={isLoading} type='submit' className='btn'>
                    {isLogin ? 'Login' : 'SignUp'}
                </button>

                <button disabled={isLoading} className='btn-link'
                    type='button'
                    onClick={toggleLoginModeHandler}>
                    {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
            </form>

            </div>
    
    )
}

export default LoginForm;