import React from 'react';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import renderHTML from 'react-render-html';
import {Link} from 'react-router-dom';
import './Product.scss';

const product = (props) => {
    return (
        <Card className={['text-center', 'Product'].join(' ')}>
            <Link to={'products/'+props.product.id}>
            <CardImg top width="100%" src={props.product.images[0].src} alt="Card image cap" />
            </Link>
            <CardBody>
                <CardTitle>{props.product.name}</CardTitle>
                {props.product.on_sale?<span className='saleTag'>Sale!</span>:null}
                <CardSubtitle>{renderHTML(props.product.price_html)}</CardSubtitle>
                {!props.product.in_stock && !props.product.manage_stock?<span className='out-of-stock'>Out of stock!</span>:null}
                {props.product.type === 'grouped'?
                <Button color="primary">View products</Button>:
                props.product.type === 'variable'? 
                <Button color="primary">Select options</Button>:
                props.product.type === 'external'?<Button color="link" className='external-link' >{props.product.button_text}</Button>:
                <Button onClick={() => {props.addToCart({[props.product.id] : {count: 1, product: props.product}})}} color="primary">Add to cart</Button>}
            </CardBody>
        </Card>
    );
}

export default product;