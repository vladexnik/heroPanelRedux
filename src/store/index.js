import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filtersSlice';
import heroes from '../components/heroesList/heroesSlice';
// import { thunk } from 'redux-thunk'



const stringMiddleware=(store)=>(next)=>(action)=>{
    
    if(typeof action ==='string'){
        return next({
            type: action
        })
    }
    return next(action)
}

const store=configureStore({
    reducer: { heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    
})



// so that we can dispatch('HEROES_FETCHING') from action, wtf?
// const enhancer=(createStore)=>(...args)=>{
//     const store=createStore(...args);

//     const oldDispatch=store.dispatch; // orig dispatch that keeps object
//     store.dispatch=(action)=>{
//         if(typeof action ==='string'){
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store;
// }

// const store = createStore( 
//     combineReducers({reducerHeroes,reducerFilters}),
//     compose(
//         applyMiddleware(thunk, stringMiddleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//     // compose(
//     //     enhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     // )
// );
  
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


export default store;