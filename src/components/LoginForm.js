import React,{useState,useRef} from 'react'
import './LoginForm.css';
import { useAuth } from '../context/AuthContext';

function LoginForm()
{
    const [isLogin, setIsLogin] = useState(true);
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();

    async function submitHandler(e)
    {
        e.preventDefault();
        if (passwordConfirmRef.current.value !== passwordRef.current.value)
        {
            console.log("erorr password didnt match")      
        }
        try
        {
           await signup(emailRef.current.value, passwordRef.current.value)
        } catch (error)
        {
            console.log(error + '   signin Failed')
        }
    }

    const toggleLoginModeHandler = () =>
    {
        setIsLogin((prevState)=>!prevState);
    }
    return (
        <div className='container'>
               <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
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
                <button type='submit' className='btn'>
                    {isLogin ? 'Login' : 'SignUp'}
                </button>

                <button className='btn-link'
                    type='button'
                    onClick={toggleLoginModeHandler}>
                    {isLogin ? 'Create new account' : 'Login with existing account'}
                </button>
            </form>

            </div>
    
    )
}

export default LoginForm;