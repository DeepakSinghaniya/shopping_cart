import React, { Component, Fragment } from 'react';
import { initialLoadProducts } from '../../Store/Actions';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import bootstrap from '../../assets/scss/bootstrap.scss';
import { chunk } from '../../utility/utility';
import Product from '../../components/Product/Product'

class Shop extends Component {
    componentDidMount() {
        console.log('didmount');
        this.props.initProducts();
    }
    render() {
        //console.log('this.props.products', this.props.products);
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

            </Fragment>
        );
    }
}
const mapStoreToProps = store => {
    return {
        products: store.shop.products
    }
}
const mapDispatchToProps = dispatch => {
    return {
        initProducts: () => dispatch(initialLoadProducts())
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(Shop);