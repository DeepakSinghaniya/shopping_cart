import React, { Component, Fragment } from 'react';
import { initialLoadProducts } from '../../Store/Actions';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import bootstrap from '../../assets/scss/bootstrap.scss';
import { chunk } from '../../utility/utility';
import Product from '../../components/Product/Product';
import httpInstance from '../../http/http';
import withErrorHandler from '../../HOC/withHttpErrorHandler'; 
import Loader from '../../components/Loader/Loader';

class Shop extends Component {
    componentDidMount() {
        this.props.initProducts(this.props.offset);
    }
	loadMore = () => {
		this.props.initProducts(this.props.offset);
	}
    render() {
        const layoutedProducts = chunk(this.props.products, 3);
        return (
            <Fragment>
                <h1>Shop</h1>
                {layoutedProducts.map((productsRow, index) => {
                    return (
                        <Row key={index} cssModule={bootstrap}>
                            {productsRow.map(product => {
                                return (<Col key={product.id} cssModule={bootstrap}><Product {...product} /></Col>);
                            })}
                        </Row>
                    );
                })}
				
				<Button color="success" onClick={this.loadMore} cssModule={bootstrap}>Load More</Button>
				{<Loader show={this.props.loader} />}
            </Fragment>
        );
    }
}
const mapStoreToProps = store => {
    return {
        products: store.shop.products,
        loader: store.shop.loader,
		offset: store.shop.offset
    }
}
const mapDispatchToProps = dispatch => {
    return {
        initProducts: (offset) => dispatch(initialLoadProducts(offset))
    }
}
export default withErrorHandler(connect(mapStoreToProps, mapDispatchToProps)(Shop),httpInstance);