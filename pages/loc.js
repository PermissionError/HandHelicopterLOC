import React, {useState} from 'react';
import {useRouter} from "next/router";
import {Container, Form, FormGroup, Button, Row, Input} from 'reactstrap';

export default function LOC() {
  const [netForce, setNetForce] = useState();
  const router = useRouter();

  const calculate = (event) => {
    event.preventDefault();
    const G = 6.674 * (10**-11);
    // Fnet = Cl × ρ x v^2 x A / 2 - G (m1×m2) / r^2
    let F = event.target.cl.value * event.target.p.value * (event.target.v.value ** 2) * event.target.A.value / 2 - G * event.target.m1.value * event.target.m2.value / (event.target.r.value ** 2);
    setNetForce(F);
    document.getElementById('result').hidden = false;
  }

  const reset = () => {
    document.getElementById('result').hidden = true;
    document.getElementById('form').reset();
  }

  const home = () => {
    router.push('/');
  }

  return (
    <>
      <Container fluid={true} className={'d-flex justify-content-center align-items-center mt-2'}>
        <Form style={{borderStyle: 'double', borderColor: '#007bff'}} className={'col-md-10 py-2'} onSubmit={calculate} id={'form'}>
          <Button color={'primary'} outline={true} onClick={home} className={'float-right'}>Back</Button>
          <h3>The Equation</h3>
          <p>To lift off, <code>Cl × ρ x v<sup>2</sup> x A / 2 > G (m<sub>1</sub>×m<sub>2</sub>) / r<sup>2</sup></code> must be true.<br/>
          It can then be rearranged to <code>F<sub>net</sub> = Cl × ρ x v<sup>2</sup> x A / 2 - G (m<sub>1</sub>×m<sub>2</sub>) / r<sup>2</sup></code> to calculate the net force when taking off.
          </p>
          <div id={'result'} hidden={true}>
            <hr/>
            <h3>Result</h3>
            With the provided parameters, the Hand Helicopter <b>{netForce > 0 ? 'can' : 'cannot'}</b> take off.<br/>
            The net force is <code>{Math.abs(netForce)}N</code> {netForce > 0 ? 'upward' : (netForce < 0 ? 'downward' : '(hovering)')}.<br/>
            <Button color={'danger'} outline={true} onClick={reset}>Reset</Button>
          </div>
          <hr/>
          <h3>Parameters</h3>
          <FormGroup className={'px-0'}>
            <label htmlFor={'G'}>Gravitational Constant (G)</label>
            <p id={'G'}><code>G = 6.674×10<sup>−11</sup> m<sup>3</sup>/(kg s<sup>2</sup>)</code></p>
          </FormGroup>
          <Row className={'mx-1'}>
            <FormGroup className={'col-5 px-0'}>
              <label htmlFor={'cl'}>Lift Coefficient (Cl)</label>
              <Input id={'cl'} type={'number'} required={true}/>
            </FormGroup>
            <FormGroup className={'col-5 px-0 ml-auto'}>
              <label htmlFor={'A'}>Total Blade Area (A) (m<sup>2</sup>)</label>
              <Input id={'A'} type={'number'} required={true}/>
            </FormGroup>
          </Row>
          <Row className={'mx-1'}>
            <FormGroup className={'col-5 px-0'}>
              <label htmlFor={'p'}>Atmospheric Density (ρ) (kg m<sup>-3</sup>)</label>
              <Input id={'p'} type={'number'} required={true}/>
            </FormGroup>
            <FormGroup className={'col-5 px-0 ml-auto'}>
              <label htmlFor={'m1'}>Mass of the Celestial Body (m<sub>1</sub>) (kg)</label>
              <Input id={'m1'} type={'number'} required={true}/>
            </FormGroup>
          </Row>
          <Row className={'mx-1'}>
            <FormGroup className={'col-5 px-0'}>
              <label htmlFor={'v'}>Blade Velocity (v) (m s<sup>-1</sup>)</label>
              <Input id={'v'} type={'number'} required={true}/>
            </FormGroup>
            <FormGroup className={'col-5 px-0 ml-auto'}>
              <label htmlFor={'m2'}>Mass of the Hand Helicopter (m<sub>2</sub>) (kg)</label>
              <Input id={'m2'} type={'number'} required={true}/>
            </FormGroup>
          </Row>
          <FormGroup>
            <label htmlFor={'r'}>Distance between the Centre of the Celestial Body and the Hand Helicopter (r) (m)</label>
            <Input id={'r'} type={'number'} required={true} onInput={(event) => {if(event.value <= 0) event.target.value = 0;}}/>
          </FormGroup>
          <Button color={'primary'} outline={true} type={'submit'}>Calculate!</Button>
        </Form>
      </Container>
    </>
  );
}