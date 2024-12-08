import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./constants";

export const login = createAsyncThunk("login",async({email,password},{rejectWithValue})=>{    
    try{
    const res = await axios.post(BASE_URL+'/login',{email,password},{withCredentials:true});
    return res.data;
    }catch(err){        
       return rejectWithValue(err.response.data);
    }
})

export const register = createAsyncThunk("register",async({email,password,firstName,lastName},{rejectWithValue})=>{    
    try{
    const res = await axios.post(BASE_URL+'/signup',{email,password,firstName,lastName},{withCredentials:true});
    return res.data;
    }catch(err){        
       return rejectWithValue(err.response.data);
    }
})

export const logout = createAsyncThunk("logout",async()=>{    
    try{
    const res = await axios.post(BASE_URL+'/logout',{withCredentials:true});
    return res.data;
    }catch(err){        
       return rejectWithValue(err.response.data);
    }
})

export const profile = createAsyncThunk("profile",async()=>{        
    try{
    const res = await axios.get(BASE_URL+'/profile/view',{withCredentials:true});
    return res.data;
    }catch(err){        
       return rejectWithValue(err.response.data);
    }
})

export const editProfile = createAsyncThunk("editProfile",async({data})=>{        
    try{
    const res = await axios.post(BASE_URL+'/profile/edit',data,{withCredentials:true});
    return res.data;
    }catch(err){        
       return rejectWithValue(err.response.data);
    }
})


export const clearErrorWithTimeout = () => (dispatch) => {
    setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 3000); 
  };
  
const userSlice= createSlice({
    name:'user',
    initialState:{
        userData:null,
        error:null,
        isLoading:false
    },
    reducers :{
        clearErrorMessage(state){
            state.error = '';            
        },
        removeUser(state){
            state.userData = null,
            state.error=null
        }
    },
    extraReducers:(builder)=>{
        //login
        builder.addCase(login.pending , (state)=>{
            state.isLoading= true;
            state.error = null
        });
        builder.addCase(login.fulfilled,(state,action)=>{
            console.log(action);
            
            state.isLoading= false,
             state.error = null,
            state.userData= action.payload.data
        });
        builder.addCase(login.rejected,(state,action)=>{
            state.error= action.payload,
            state.isLoading= false
        });
        //register
        builder.addCase(register.pending , (state)=>{
            state.isLoading= true;
            state.error = null
        });
        builder.addCase(register.fulfilled,(state,action)=>{
            state.isLoading= false,
             state.error = null,
            state.userData= action.payload.data
        });
        builder.addCase(register.rejected,(state,action)=>{
            state.error= action.payload,
            state.isLoading= false
        });
        //logout
        builder.addCase(logout.rejected,(state,action)=>{
            state.error= action.payload,
            state.isLoading= false
        });
        //profile view
        builder.addCase(profile.pending , (state)=>{
            state.isLoading= true;
            state.error = null
        });
        builder.addCase(profile.fulfilled,(state,action)=>{            
            state.isLoading= false,
             state.error = null,
            state.userData= action.payload.data
        });
        builder.addCase(profile.rejected,(state,action)=>{
            state.error= action.payload,
            state.isLoading= false
        });
        //profile edit 
        builder.addCase(editProfile.pending , (state)=>{
            state.isLoading= true;
            state.error = null
        });
        builder.addCase(editProfile.fulfilled,(state,action)=>{            
            state.isLoading= false,
             state.error = null,
            state.userData= action.payload.data
        });
        builder.addCase(editProfile.rejected,(state,action)=>{
            state.error= action.payload,
            state.isLoading= false
        });
       
    }
})

export default userSlice.reducer;
export const {clearErrorMessage,removeUser} = userSlice.actions