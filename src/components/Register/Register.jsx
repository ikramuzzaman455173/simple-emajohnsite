import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('')
  const {createUser}=useContext(AuthContext)


  const handleRggisterSubmit = (e) => {
    e.preventDefault()
    setError('')
    const form = e.target
    const email=form.email.value
    const password=form.password.value
    const cPassword = form.cPassword.value
    if (password !== cPassword) {
      setError('Your Password Did Not Matched!')
      return
    } else if (password.length < 6) {
      setError('Password Must Be 6 Character Longer !')
      return
    }
    // console.log(`Your Email:${email} Your Password:${password} Confirm Password:${cPassword}`);
    createUser(email, password)
    .then(result => {
            console.log(result.user);
          }).catch(error => {
            console.log(`Error:`, error.message);
            setError(error.message)
          })
    e.target.reset()
    }


  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className='form-container register'>
      <h2 className='form-title'>Register</h2>
      <form onSubmit={handleRggisterSubmit}>
        {/* <div className="form-control">
          <label htmlFor="">Your Name</label>
          <input type="text" name='userName' placeholder='Enter Your Name:' />
        </div> */}
        <div className="form-control">
          <label htmlFor="">Your Email</label>
          <input type="email" name='email' placeholder='Enter Your Email:' required />
        </div>
        <div className="form-control">
          <label htmlFor="">Your Password</label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name='password'
              placeholder='Enter Your Password:' required
            />
            <div className="password-toggle" onClick={handlePasswordVisibility}>
              {passwordVisible ? (
                <FaEyeSlash className="eye-icon" />
              ) : (
                <FaEye className="eye-icon" />
              )}
            </div>
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="">Confirm Password</label>
          <div className="password-input-container">
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              name='cPassword'
              placeholder='Confirm Your Password:' required
            />
            <div className="password-toggle" onClick={handleConfirmPasswordVisibility}>
              {confirmPasswordVisible ? (
                <FaEyeSlash className="eye-icon" />
              ) : (
                <FaEye className="eye-icon" />
              )}
            </div>
          </div>
        </div>
        <input type="submit" className='btn-submit' value="Register" />
        <p>
          <small>
            Already have an account? <Link to='/login'>Login Now!</Link>
          </small>
        </p>
      </form>
      <p className='text-error'>{error}</p>
      {/* <p>My Name Is: <span className='text-error'>{user}</span></p> */}
    </div>
  );
};

export default Register;
