import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, resetError } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = (props) => {
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    isAdmin: props.isAdmin,
  });

  const dispatch = useDispatch();
  
  const [submitClicked,setSubmitClicked] = useState(false)
  const [error,setError] = useState({isError:false,error:''})
  const state = useSelector((state) => state.user);
  // let {isError,error} = state
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
    dispatch(addUser(formState));
    setSubmitClicked(true)
  };

  useEffect(()=>{
    if (submitClicked) {
      if(!state.isError){
      setSubmitClicked(false)
        navigate('/login')
      }else{
        setError({isError:state.isError,error:state.error})
        setSubmitClicked(false)
      }
      dispatch(resetError());
      console.log(state);
    }
  },[submitClicked])

  return (
    <>
      <div class="container">
        <div class="row justify-content-center mt-5">
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="card shadow">
              <div class="card-title text-center border-bottom">
                <h2 class="p-3">
                  {!props.isAdmin ? "SignUp" : "Add Employee"}
                </h2>
              </div>
              <div class="card-body">
                <form onSubmit={(event)=>{handleSubmit(event)}}>
                  <div class="mb-4">
                    <label for="firstname" class="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="firstname"
                      onChange={handleInput}
                      id="firstname"
                      value={formState.firstname}
                      required='true'
                    />
                  </div>
                  <div class="mb-4">
                    <label for="lastname" class="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      name="lastname"
                      onChange={handleInput}
                      id="lastname"
                      value={formState.lastname}
                      required='true'
                    />
                  </div>
                  <div class="mb-4">
                    <label for="email" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      onChange={handleInput}
                      id="email"
                      required='true'
                      value={formState.email}
                    />
                  </div>
                  <div class="mb-4">
                    <label for="phone" class="form-label">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      maxLength={10}
                      name="phone"
                      onChange={handleInput}
                      id="phone"
                      value={formState.phone}
                      required='true'
                    />
                  </div>
                  <div class="mb-4">
                    <label for="password" class="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      onChange={handleInput}
                      id="password"
                      value={formState.password}
                      required='true'
                    />
                  </div>
                  <div class="d-grid">
                    <button
                      type="submit"
                      
                      class="btn btn-success text-light main-bg"
                    >
                      {!props.isAdmin ? "SignUp" : "Add Employee"}
                    </button>
                  </div>
                  {error.isError && <span>
                {error.error}
              </span>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
