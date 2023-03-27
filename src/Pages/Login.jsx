import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login, resetError } from "../redux/userSlice";

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [submitClicked,setSubmitClicked] = useState(false)
  const [error,setError] = useState({isError:false,error:''})
  const state = useSelector((state) => state.user);
  let navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name + ": " + value);
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formState);
    dispatch(login(formState));
    setSubmitClicked(true)
  };

  useEffect(()=>{
    if (submitClicked) {
      if(!state.isError){
        navigate('/home')
      }else{
        setError({isError:state.isError,error:state.error})
      }
      dispatch(resetError());
      setSubmitClicked(false)
      
    }
  },[submitClicked,dispatch,navigate,state.error,state.isError])

  return (
    <>
   <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card shadow">
          <div class="card-title text-center border-bottom">
            <h2 class="p-3">Login</h2>
          </div>
          <div class="card-body">
            <form onSubmit={(event)=>{handleSubmit(event)}}>
              <div class="mb-4">
                <label for="email" class="form-label">Email</label>
                <input type="text" class="form-control" onChange={handleInput} value={formState.email} name="email" id="email" />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" onChange={handleInput} value={formState.password} name="password" id="password" />
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-success text-light main-bg">Login</button>

              </div>
              {error.isError && <span>
                {error.error}
              </span>}
            </form>
            <br />
              <div class="card-title text-center ">
              <span className="text-center">
                 Need an Account? <NavLink to='/signup'>SIGNUP</NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default Login;
