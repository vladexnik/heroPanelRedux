const initialState = {
    filters: [],
    filtersLoadingStatus:'idle',
    activeFilter: 'all',
}

const reducerFilters = (state = initialState, action) => {
    switch (action.type) {

        //filters
        case 'FILTERS_FETCHING':
        return {
            ...state,
            filtersLoadingStatus: 'loading'
        }

        case 'FILTERS_FETCHING_ERROR':
            return{
                ...state,
                filtersLoadingStatus: 'error'
            }

        case 'FILTERS_FETCHED':
            return{
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }

        case 'ACTIVE_FILTER_CHANGED':
        
            return{
                ...state,
                activeFilter: action.payload,
               
            }

        default: return state
    }
}

export default reducerFilters;