import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    filtersLoadingStatus:'idle',
    activeFilter: 'all',
}


export const fetchFilters=createAsyncThunk(
    'heroes/fetchFilters',
    async ()=>{
        const {request}=useHttp();
        return await request("http://localhost:3001/filters")
    }
)

const filtersSlice=createSlice({
    name: 'filters',
    initialState,
    reducers: {
        
        filtersFetching: state => { state.filtersLoadingStatus='loading' },
        filtersFetched: (state,action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle';
            
        },
        filtersFetchingError: state => { state.filtersLoadingStatus='error' },
        filtersChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder 
            .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus='loading' })
            .addCase(fetchFilters.fulfilled, (state,action) => {
                state.filters = action.payload;
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus='error'})
            .addDefaultCase(()=>{})
    }
})

const {reducer, actions}=filtersSlice;

export default reducer;

export const {
    filtersFetchingError,
    filtersFetching,
    filtersFetched,
    filtersChanged
}=actions;

