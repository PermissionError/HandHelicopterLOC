import {Container, Row, Col, Button} from 'reactstrap';
import React from "react";

export default function HomePage() {
  return(
    <>
      <Container fluid={true} style={{height: '100vh'}}>
        <Row style={{height: '100vh'}}>
          <Col className={'d-flex justify-content-center align-items-center'}>
            <Button color={'primary'} outline={true} href={'/loc'}>Lift-Off Calculator</Button>
          </Col>
          <Col className={'d-flex justify-content-center align-items-center'}>
            <Button color={'primary'} outline={true} href={'/mhc'}>Maximum Height Calculator</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}