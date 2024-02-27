
import { useEffect } from "react";
import {useHttp} from '../../hooks/http.hook'
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import { activeFilterChanged, filtersFetched, filtersFetching, filtersFetchingError } from "../../actions";
import classNames from "classnames";



const HeroesFilters = () => {

    const {request} = useHttp();
    const dispatch=useDispatch();
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.reducerFilters);

    useEffect(()=>{
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            // .then(res=>console.log(res))
            .then(data=> dispatch(filtersFetched(data)))
            .catch(()=> dispatch(filtersFetchingError()))

    },[])

    if(filtersLoadingStatus==='loading'){
        return <Spinner/>;
    } else if(filtersLoadingStatus==='error'){
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }


    const renderFilters=(filters)=>{
        if (filters.length===0){
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return filters.map(({name,label,className})=>{
            const btnClass=classNames('btn',className,
                {'active' : name === activeFilter }
            )

            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(name))}
                        >{label}</button>

        })

        
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                   {renderFilters(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;