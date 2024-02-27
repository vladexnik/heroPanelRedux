import { createStore, combineReducers } from 'redux';
// import reducer from '../reducers';
import reducerFilters from '../reducers/filters';
import reducerHeroes from '../reducers/heroes';


// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore( combineReducers({
    reducerHeroes,reducerFilters
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;