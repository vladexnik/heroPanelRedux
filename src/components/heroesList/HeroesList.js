import {useHttp} from '../../hooks/http.hook';
import { useEffect,useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import { fetchHeroes } from '../../actions';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { heroDelete } from '../../actions';
import { createSelector } from '@reduxjs/toolkit';
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state.reducerHeroes);
    
    // const filteredHeroes=useSelector(state=>{
    //     if(state.reducerFilters.activeFilter === 'all'){
    //         console.log('all');
    //         return state.reducerHeroes.heroes;
    //     } else {
    //         return state.reducerHeroes.heroes.filter(item=> item.element===state.reducerFilters.activeFilter);
    //     }
    // })

    const filteredHeroesSelector = createSelector(
        (state) => state.reducerFilters.activeFilter,
        (state) => state.reducerHeroes.heroes,
        (filter, heroes) => {
            if (filter === 'all') {
                console.log('all');
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter)
            }
        }
    );
    const filteredHeroes=useSelector(filteredHeroesSelector);

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request))

        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {

        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDelete(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);



    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;