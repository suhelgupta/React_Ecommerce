import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProducts = createAsyncThunk("products/setApiData", async () =>{
    const res = await axios.get('./allProduct.json');
        return res.data
})

const fetchUsers = createAsyncThunk("users/setApiData", async () =>{
    const res = await axios.get('./user.json');
        return res.data
})

export {fetchProducts,fetchUsers}