import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../ApiCalls';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isUserLoggedIn:false,
        logedInUser:{},
        users: [],
        isError:false,
        error:""
    },
    reducers: {
        addUser : (state,action)=>{
            let  user = action.payload;
            let existingUser = state.users?.find((curUser) => curUser.email === user.email);
            if (existingUser) {
                return {
                    ...state, isError: true , error:"User Already Exist"
                };
            } else {
                return {
                    ...state, users : [...state.users,user],
                };
            }
    
        },
        login : (state,action)=>{
            let {email,password} = action.payload ;
            let user = state.users.find((user)=>user.email === email && user.password === password)
            if(user){
                return {...state,isUserLoggedIn:true,logedInUser:user}
            }else{
                return {...state,isError:true,error:'Email or Password is incorrect'}
            }

        },
        logOut : (state,action)=>{
            return {...state,isUserLoggedIn:false,user:{}}
        },
        resetError: (state,action)=>{
            return {...state,isError:false,error:''}
        }
    },
    extraReducers:{
        [fetchUsers.pending]:(state)=>{
          state.pending = true;
          state.isError = false;
        },
        [fetchUsers.fulfilled]:(state,action)=>{
          state.pending = false;
          state.isError = false;
          state.users = action.payload;
        },
        [fetchUsers.rejected]:(state,action)=>{
          state.pending = false;
          state.isError = true;
        }
      }
  })

export const {addUser,resetError,login,logOut} = userSlice.actions

export default userSlice