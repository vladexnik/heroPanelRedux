import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import reducer from '../reducers';
import reducerFilters from '../reducers/filters';
import reducerHeroes from '../reducers/heroes';

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



const stringMiddleware=(store)=>(next)=>(action)=>{
    
    if(typeof action ==='string'){
        return next({
            type: action
        })
    }
    return next(action)
}



// so that we can dispatch('HEROES_FETCHING') from action, wtf?
const enhancer=(createStore)=>(...args)=>{
    const store=createStore(...args);

    const oldDispatch=store.dispatch; // orig dispatch that keeps object
    store.dispatch=(action)=>{
        if(typeof action ==='string'){
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }
    return store;
}

const store = createStore( 
    combineReducers({reducerHeroes,reducerFilters}),
    compose(
        applyMiddleware(stringMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    
    // compose(
    //     enhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )
);


window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
export default store;