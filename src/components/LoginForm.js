import React,{useState} from 'react'
import './LoginForm.css';
function LoginForm()
{
    const [isLogin, setIsLogin] = useState(true);

    const toggleLoginModeHandler = () =>
    {
        setIsLogin((prevState)=>!prevState);
    }
    return (
        <div className='container'>
               <h2>Login/SignUp</h2>
            <form>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text' id='email' placeholder='Enter Email'
                    required/>
 
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Enter Password'
                    required/>

                </div>

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