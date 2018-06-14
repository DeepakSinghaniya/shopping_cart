import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Bootstrap from './assets/scss/bootstrap.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Header/>
        <div className="content">
          <Container cssModule={Bootstrap}  >
            <Row cssModule={Bootstrap}>
              <Col cssModule={Bootstrap} xs={12}>

         
              </Col>
            </Row>
          </Container>
        </div>

        <Footer/>

      </div>
    );
  }
}


export default App;
