const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus:'idle',
    activeFilter: 'all',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }

        case 'HERO_ADD':
            let updatedHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: updatedHeroList,
               }

        case 'HERO_DELETE':         
            const newHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList,
                
            }

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
            const filtered=state.heroes.filter((item)=> item.element === action.payload )
            // console.log(filtered);
            
            return{
                ...state,
                activeFilter: action.payload,
               
            }

        default: return state
    }
}

export default reducer;