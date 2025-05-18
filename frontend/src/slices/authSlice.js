import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  _persistVersion: 1 
};

const authSlice=createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setCredentials: (state,action)=>{
          const { id, name, email } = action.payload;
          state.userInfo = { id, name, email };
            state._persistVersion=1;
        },
        setTriggerRefetch:(state)=>{
          state.refetchTrigger=Date.now()
        },
        clearCredentials: (state)=>{
            state.userInfo=null;
            state._persistVersion=0;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
          (action) => action.type === 'persist/REHYDRATE',
          (state, action) => {
            if (action.payload?.auth?._persistVersion !== 1) {
              return initialState;
            }
          }
        );
    }
});

export const {setCredentials,setTriggerRefetch,clearCredentials}=authSlice.actions;

export default authSlice.reducer