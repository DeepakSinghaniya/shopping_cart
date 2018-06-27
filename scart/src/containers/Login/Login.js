import React, { Component } from 'react';
import { FormGroup, Form, Label, Col, Input, Button } from 'reactstrap';

class Login extends Component {

    generateAuthCookie = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.generateAuthCookie}>
                <FormGroup row>
                    <Col sm={{ size: 4, offset: 4 }}>
                        <Label htmlFor="userName">User Name</Label>
                        <Input required type="text" name="email" id="userName" placeholder="User Name" />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col sm={{ size: 4, offset: 4 }}>
                        <Label for="Password">Password</Label>

                        <Input required type="password" name="password" id="Password" placeholder="Password" />
                    </Col>
                </FormGroup>

                <FormGroup check row>
                    <Col sm={{ size: 2, offset: 4 }}>
                        <Button style={{marginLeft: '-15px'}} color='primary' type='submit'>Login</Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default Login;