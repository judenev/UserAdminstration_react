import { createSlice } from "@reduxjs/toolkit";

const data = localStorage.getItem('token') ?? '';

console.log(localStorage.getItem('token'));
const parsedData = data ? JSON.parse(data) : null;
const initialState = {
    data: parsedData ?? {
        token:'',
    }
};

const authSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        setToken(state,action){
            localStorage.setItem(
                'token',
                JSON.stringify({
                    token:action.payload.token
                })
            )
          state.data= { token:action.payload.token }
        },
        deleteToken(state){
            state.data = {
                token:'',
            }
            localStorage.removeItem('token');
        }
    }
})

export const {setToken, deleteToken} = authSlice.actions;

export const selectUserAuth = (state)=> state.userAuth.data

export const userAuthReducer = authSlice.reducer;
