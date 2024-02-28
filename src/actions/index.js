// import { ActionCreator, createAction } from "@reduxjs/toolkit";
import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/heroesSlice";
import { filtersFetched, filtersFetchingError, filtersFetching } from "../components/heroesFilters/filtersSlice";

export const fetchHeroes=(request)=> (dispatch)=>{
    dispatch(heroesFetching()); 
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
} // thunk

export const fetchFilters=(request)=>(dispatch)=>{
    dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            // .then(res=>console.log(res))
            .then(data=> dispatch(filtersFetched(data)))
            .catch(()=> dispatch(filtersFetchingError()))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetching=createAction('HEROES_FETCHING');


// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetched = createAction('HEROES_FETCHED');


// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroesFetchingError=createAction('HEROES_FETCHING_ERROR');


// export const heroAdd = (hero) => {
//     return {
//         type: 'HERO_ADD',
//         payload: hero
//     }
// }

// export const heroAdd=createAction('HERO_ADD')


// export const heroDelete = (id) => {
//     return {
//         type: 'HERO_DELETE',
//         payload: id
//     }
// }

// export const heroDelete=createAction('HERO_DELETE')


// filters
// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }

// export const activeFilterChanged = (filter) => {
//     // console.log(id);
//     return {
//         type: 'ACTIVE_FILTER_CHANGED',
//         payload: filter
//     }
// }

// export const activeFilterChanged = (id) => (dispatch) => {
//     // console.log(id);
//     setTimeout(() => {
//         dispatch({
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: id
//         })
//     }, 600);
// }