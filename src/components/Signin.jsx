import axios from 'axios';
import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';



const Signin = () => {
  // define the two hooks for capturing/storing the users input
  const[email, setEmail] = useState("");
  const[password, setPassword]= useState("");

  // declare the three additional hooks
  const [loading, setLoading] = useState("");
  const [success , setSuccess]=useState("");
  const [error, setError] = useState("");
  // below we have the useNavigate hook hook to redirect us to another page on success login/signin
  const navigate = useNavigate()

  // below is the function to handle the signin action
  const handlesubmit = async (e) => {
    // prevent site from reloading
    e.preventDefault();

    // update the loading hook with a message
    setLoading("Please wait while we authenticate your account...");
  

  try{ 
    // create a formData object that will hold the email and the password
    const data = new FormData()
    // 10. Insert/append the email and the password on the formData created.
    data.append("email",email);
    data.append("password",password);

    //  interact woth axios for the response
    
    const response =  await axios.post("https://paul-mungah001.alwaysdata.net/api/login",data);

    // set the loading hook back to default
    setLoading("");
    // check whether the user exists as part of your response from the API
    if(response.data){
      // if user is there , definitely the details enterd during signin are correct
      // setSuccess("login successfully") 
      // if it is successful, let a person get redirected another page
      navigate("/");
    }
    else{
      // user is not found , that means the credetial on the form are incorrect
      setError("Login failed. Please try again........");

    }
  }
  catch(error){
    // set loading back to default
    setLoading("");
    // update the error hook with a message
    setError("login failed.try again later......."); 

  }};
  return (
    <div className='row justify-content-center mt-4'>
      <div className='col-md-6 shadow p-4'>
        <h1 className='text-primary'>Sign In</h1>
        <h5 className='text-info'>{loading}</h5>
        <h3 className='text-success'>{success}</h3>
        <h4 className='text-danger'>{error}</h4>
        <form onSubmit={handlesubmit}>
          <input type="email" 
          placeholder='Enter the email address here....'className='form-control'
          required 
          value={email}
          onChange={(e)=> setEmail(e.target.value)}/> <br />

          {/* {email} */}

          <input type="password" 
          placeholder='Enter the password here....'className='form-control'
          required 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/> <br />

          <input type="submit"
          value="Signin"
         className='btn btn-primary'
          required /> <br />

          <p className='lest'>Create an account if one is not at disposal <Link to = {'/signup'} className='link'>Sign up</Link></p>



        </form>
      </div>
    </div>
  )
}

export default Signin ;