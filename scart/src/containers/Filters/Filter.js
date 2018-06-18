import React, { Component, Fragment } from 'react';
import { Form, Input } from 'reactstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';




class Filter extends Component {
    state= {
        value: { min: 0, max: 100 },

    }
    componentDidMount() {

    }
    render() {
        return (
            <Fragment>
                <Form >
                    <Input  placeholder="Search" />
                </Form>
                <InputRange maxValue={100}
                    minValue={0}
                    value={this.state.value}
                    onChange={value => this.setState({ value })} />  

            </Fragment>
        );
    }
}

export default Filter;