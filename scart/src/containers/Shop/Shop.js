import React, { Component, Fragment } from 'react';
import { initialLoadProducts, loadMore, setQuery, showLoadMore,addToCart } from '../../Store/Actions';
import { connect } from 'react-redux';
import { Row, Col, Button, Input } from 'reactstrap';
import { chunk } from '../../utility/utility';
import Product from '../../components/Product/Product';
import httpInstance from '../../http/http';
import withErrorHandler from '../../HOC/withHttpErrorHandler';
import Loader from '../../components/Loader/Loader';
import './Shop.scss';
import Filter from '../Filters/Filter';
import {PER_PAGE} from '../../utility/config';

class Shop extends Component {
    componentDidMount() {
        if(this.props.products.length < 1) {
            this.props.initProducts(this.props.offset);
        }
    }

    loadMore = () => {
        this.props.loadMore(this.props.offset);
    }
    short = (e) => {
        if(e.target.value === 'date') {
            this.props.setQuery({order: 'desc', orderby: 'date'});
        } else if(e.target.value === 'title') {
            this.props.setQuery({order: 'asc', orderby: 'title'});
        }
        this.props.showLoadMoreButton(true);
        this.props.initProducts(0);
        
    }
    render() {
        const layoutedProducts = chunk(this.props.products, 3);
        let productsList = <h2>No product found.</h2>;
        let loadMoreButton = null;
        if (this.props.products.length > 0) {
            productsList = layoutedProducts.map((productsRow, index) => {
                return (
                    <Row key={index}>
                        {productsRow.map(product => {
                            return (<Col md={4} key={product.id}><Product addToCart={this.props.addToCart} product = {product} /></Col>);
                        })}
                    </Row>
                );
            });

            loadMoreButton = (this.props.showLoadMore && this.props.products.length >= PER_PAGE ) ? <Button className='load-more-button' color="success" onClick={this.loadMore}>Load More</Button>: <Button className='load-more-button' color="secondary" desiable >No more product</Button>;
        }


        return (
            <Fragment>
                <Row className='secton-title'>
                    <Col>
                        <h1>Shop</h1>
                    </Col>
                </Row>
                <Row className="order-by">
                    <Col>
                        <Input type="select" onChange={this.short} defaultValue={this.props.filterQuery.orderby} name="orderby" >
                            <option value="date">Sort by newness</option>
                            <option value="title">Sort by name</option>
                        </Input>
                    </Col>
                </Row>
                <Row>


                    <Col md={9}>
                        {productsList}
                        {loadMoreButton}

                    </Col>

                    <Col md={3} className="fitler-siderbar">
                        <Filter />
                    </Col>

                </Row>
                <Loader show={this.props.loader} />
            </Fragment>
        );
    }
}

const mapStoreToProps = store => {
    return {
        products: store.shop.products,
        loader: store.shop.loader,
        offset: store.shop.offset,
        filterQuery: store.filter.query,
        showLoadMore: store.shop.showLoadMore
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initProducts: (offset) => dispatch(initialLoadProducts(offset)),
        loadMore: (offset) => dispatch(loadMore(offset)),
        setQuery: (query) => dispatch(setQuery(query)),
        showLoadMoreButton: (show) => dispatch(showLoadMore(show)),
        addToCart: (items) => dispatch(addToCart(items))
    }
}
export default withErrorHandler(connect(mapStoreToProps, mapDispatchToProps)(Shop), httpInstance);