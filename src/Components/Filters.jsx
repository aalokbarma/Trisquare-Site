import React from 'react';
import '../css/Filters.css';
import { useDispatch, connect } from "react-redux"
import reducer from '../reducer';

function Filters() {
    const dispatch = useDispatch(reducer)
    return (
        <div className="filters">
            <h1 className="filters__heading">Filters</h1>
            <div className="filters__options">
                <div className="filters__label">
                    Sort By-
                </div>
                <div classname="filters__optionGroup"><input className="filters__checkBox" type="checkbox" /><p className="filter__para">Prices Low to High</p></div>
                <div classname="filters__optionGroup"><input className="filters__checkBox" type="checkbox" /><p className="filter__para">Prices High to Low</p></div>
                <div classname="filters__optionGroup"><input className="filters__checkBox" type="checkbox" /><p className="filter__para">Ending Soon</p></div>
                <div classname="filters__optionGroup"><input className="filters__checkBox" type="checkbox" /><p className="filter__para">Most Units Sold</p></div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}

export default connect(mapStateToProps)(Filters);
