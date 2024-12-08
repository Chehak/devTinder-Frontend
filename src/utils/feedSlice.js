import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./constants";


export const feed = createAsyncThunk("feed",async()=>{        
    try{
    const res = await axios.get(BASE_URL+'/feed?page=1&limit=10',{withCredentials:true});
    return res.data;
    }catch(err){        
       return rejectWithValue(err.response.data);
    }
})


export const sendConnectionRequest = createAsyncThunk("sendConnectionRequest",async(data)=>{     
    console.log(data,"data");
           
    try{
    const res = await axios.post(BASE_URL+`/request/send/${data.status}/${data.userId}`, {},{withCredentials:true});
    return res.data;
    }catch(err){        
       return rejectWithValue(err.response.data);
    }
})

const feedSlice = createSlice({
    name:'feed',
    initialState:{
        feed:null,
        error:null,
        loading:false
    },
    reducers:{
        clearErrorMessage(state){
            state.error = null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(feed.pending,(state)=>{
            state.loading = true,
            state.error = null
        });
        builder.addCase(feed.fulfilled,(state,action)=>{
            state.feed = action.payload.data;
            state.error= null;
            state.loading= false
        });
        builder.addCase(feed.rejected,(state,action)=>{
            state.error= action.payload,
            state.loading= false
        });

        builder.addCase(sendConnectionRequest.pending,(state)=>{
            state.loading = true,
            state.error = null
        });
        builder.addCase(sendConnectionRequest.fulfilled,(state,action)=>{
            console.log(action.payload)
            const newFeed = state.feed.filter(items=>items?._id !== action.payload.data.toUserId);
            console.log(newFeed);
            
            state.feed = newFeed
            state.error= null;
            state.loading= false
        });
        builder.addCase(sendConnectionRequest.rejected,(state,action)=>{
            state.error= action.payload,
            state.loading= false
        })
    }
})

export default feedSlice.reducer;
export const {clearErrorMessage} = feedSlice.actions;