import { createReducer } from "@reduxjs/toolkit"
import {
    heroesFetched,
    heroesFetching,
    heroesFetchingError,
    heroAdd,
    heroDelete
} from '../actions';



const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
} 

const reducerHeroes=createReducer(initialState, {
    [heroesFetching]: state=> {state.heroesLoadingStatus='loading'},
    [heroesFetched]: (state, action)=>{
        state.heroesLoadingStatus='idle';
        state.heroes=action.payload
    },
    [heroesFetchingError]: (state)=>{
        state.heroesLoadingStatus='error'
    },
    [heroAdd]: (state, action)=>{
        state.heroes.push(action.payload)
    },
    [heroDelete]: (state, action)=>{
        state.heroes=state.heroes.filter(item => item.id !== action.payload);
        }
    },
    [],
    state=>state
)

// const reducerHeroes=createReducer(initialState, builder=>{
//     builder
//         .addCase(heroesFetching, state=>{
//             state.heroesLoadingStatus='loading'
//         })
//         .addCase(heroesFetched, (state, action)=>{
//             state.heroesLoadingStatus='idle';
//             state.heroes=action.payload
//         })
//         .addCase(heroesFetchingError, (state)=>{
//             state.heroesLoadingStatus='error'
//         })
//         .addCase(heroAdd, (state, action)=>{
//             state.heroes.push(action.payload)
//         })
//         .addCase(heroDelete, (state, action)=>{
//             state.heroes=state.heroes.filter(item => item.id !== action.payload);
//         })
//         .addDefaultCase(()=>{})
// })

const reducerHeroes2 = (state = initialState, action) => {
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


        default: return state
    }
}

export default reducerHeroes;