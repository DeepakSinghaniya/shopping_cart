import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import InputRange from 'react-input-range';
import { initialLoadCategories, initialLoadProducts, setQuery } from '../../Store/Actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-input-range/lib/css/index.css';
import './Filter.scss';
import { MAX_PRICE, MIN_PRICE } from '../../utility/config';


class Filter extends Component {
    state = {
        value: { min: MIN_PRICE, max: MAX_PRICE },
        sliderInit: {
            min_price: MIN_PRICE,
            max_price: MAX_PRICE
        },
        timeOutId: null
    }

    componentDidMount() {
        if (!this.props.cats.length) {
            this.props.loadCat();
        }
    }

    sliderChangeCompleteHandler = (value) => {
        this.props.setQuery({min_price: value.min, max_price: value.max});
        this.props.initProducts(0);
    }



    searchHandler = (e) => {
        this.props.setQuery({search: e.target.value});
        clearTimeout(this.state.timeOutId);
            this.setState({
                timeOutId: setTimeout(() => {
                    this.props.initProducts(0);
                }, 800)
            });
    }

    catFilterHandler = (e, id) => {
        e.stopPropagation();
        this.props.setQuery({category: id});
        this.props.initProducts(0);
    }



    render() {
        return (
            <div className="product-filter-sidebar">
                <div className="filter-widget">
                    <h4>Search Product</h4>
                    <Form>
                        <Input onChange={this.searchHandler} value={this.props.filterQuery.search} type="search" placeholder="Search" />
                    </Form>
                </div>
                <div className="filter-widget range-filter">
                    <h4>Filter by price</h4>
                    <InputRange
                        maxValue={this.state.sliderInit.max_price}
                        minValue={this.state.sliderInit.min_price}
                        value={this.state.value}
                        onChange={value => this.setState({ value })}
                        formatLabel={value => `₹${value}`}
                        onChangeComplete={this.sliderChangeCompleteHandler}
                    />
                </div>


                <div className="filter-widget">
                    <h4>Product categories</h4>
                    <ul className="product-categories">
                        <li className={this.props.filterQuery.category ? '' : 'active'} onClick={(e) => this.catFilterHandler(e, null)}><span>All</span></li>
                        {this.props.cats.map(cat => {
                            return ((cat.parent === 0) ? <li className={this.props.filterQuery.category === cat.id ? 'active' : ''} onClick={(e) => this.catFilterHandler(e, cat.id)} key={cat.id}><span>{cat.name}</span>
                                <ul>
                                    {this.props.cats.map(childCat => {
                                        return ((childCat.parent === cat.id) ? <li className={this.props.filterQuery.category === childCat.id ? 'active' : ''} onClick={(e) => this.catFilterHandler(e, childCat.id)} key={childCat.id}><span>{childCat.name}</span></li> : null);
                                    })}
                                </ul>
                            </li> : null);
                        })}
                    </ul>
                </div>

            </div>
        );
    }
}
const mapStoreToProps = (store) => {
    return {
        cats: store.filter.categories,
        filterQuery: store.filter.query
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadCat: () => dispatch(initialLoadCategories()),
        //filteredQuery: (query) => dispatch(filteredQuery(query)),
        initProducts: (offset) => dispatch(initialLoadProducts(offset)),
        setQuery: (query) => dispatch(setQuery(query))
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(Filter));