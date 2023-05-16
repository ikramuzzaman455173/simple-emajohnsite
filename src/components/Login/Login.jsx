import React, { useContext, useState } from 'react';
import "./login.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../AuthProvider/AuthProvider';
const Login = () => {
  const [passwordToggle, setPasswordToggle] = useState(false)
  const {signInUser}=useContext(AuthContext)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location);
  const from=location.state?.from?.pathname||'/'
  const handleSignIn = (e) => {
    e.preventDefault()
    setError('')
    const form = event.target
    const email=form.email.value
    const password=form.password.value
    signInUser(email, password)
    .then(result => {
      console.log(result.user);
      navigate(from,{replace:true})
          }).catch(error => {
            console.log(`Error:`, error.message);
            setError(error.message)
          })


    e.target.reset()
    }
  const handlePassword = () => {
    setPasswordToggle(!passwordToggle)
  }
  return (
    <div className='form-container login'>
      <h2 className='form-title'>Login</h2>
      <form onSubmit={handleSignIn}>
        {/* <div className="form-control">
          <label htmlFor="">Your Name</label>
          <input type="text" name='userName' placeholder='Enter Your Name:' />
        </div> */}
        <div className="form-control">
          <label htmlFor="">Your Email</label>
          <input type="email" name='email' placeholder='Enter Your Email:' />
        </div>
        <div className="form-control">
          <label htmlFor="">Your Password</label>
          <input type={passwordToggle ? 'text' : 'password'} name='password' placeholder='Enter Your Password:' />
          <div onClick={handlePassword} className="password-toggle">
            {passwordToggle?<FaEye/>:<FaEyeSlash/>}
          </div>
        </div>
        <input type="submit" className='btn-submit' value="Login" />
          <p><small>Welcome to Ema-john! <Link to='/register'>Create a New Account</Link></small></p>
      </form>
      <p className='text-error'>{error}</p>
    </div>
  );
};

export default Login;