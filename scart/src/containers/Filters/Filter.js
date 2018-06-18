import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import InputRange from 'react-input-range';
import { initialLoadCategories } from '../../Store/Actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import { stringify } from 'query-string';
import 'react-input-range/lib/css/index.css';
import './Filter.scss';

/*
this.props.push({
    pathname: this.props.location.pathname,
    search: stringifyQuery(Object.assign({}, parseQueryString(this.props.location.search), { foo: "bar" }))
  });
*/
class Filter extends Component {
    state = {
        value: { min: 0, max: 100 },
        queryString: {
            search: '',
            category: '',
            min_price: '',
            max_price: ''
        }

    }
    componentDidMount() {
        if (!this.props.cats.length) {
            this.props.loatCat();
        }
    }
    searchHandler = (e) => {
        this.setState({ queryString: { ...this.state.queryString, search: e.target.value } });

        /*const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        console.log(this.props);
        console.log(stringify({ ...this.state.queryString }));
        //const foo = params.get('foo');*/


        /*this.props.history.push({
            pathname: this.props.location.pathname,
            search:  stringify({ ...this.state.queryString })
        });*/
    }
    render() {
        return (
            <div className="product-filter-sidebar">
                <div className="filter-widget">
                    <h4>Search Product</h4>
                    <Form>
                        <Input onChange={this.searchHandler} value={this.state.queryString.search} type="search" placeholder="Search" />
                    </Form>
                </div>
                <div className="filter-widget">
                    <h4>Filter by price</h4>
                    <InputRange maxValue={100}
                        minValue={0}
                        value={this.state.value}
                        onChange={value => this.setState({ value })} />
                </div>

                <div className="filter-widget">
                    <h4>Product categories</h4>
                    <ul className="product-categories">
                        {this.props.cats.map(cat => {
                            return ((cat.parent === 0) ? <li key={cat.id}><a>{cat.name}</a>
                                <ul>
                                    {this.props.cats.map(childCat => {
                                        return ((childCat.parent === cat.id) ? <li key={childCat.id}><a>{childCat.name}</a></li> : null);
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
        cats: store.filter.categories
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        loatCat: () => dispatch(initialLoadCategories())
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(withRouter(Filter));