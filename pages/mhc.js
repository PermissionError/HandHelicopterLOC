import {Button, Container, Form, FormGroup, Input, Row, Alert} from "reactstrap";
import React, {useState} from "react";
import Cookies from "cookie-cutter";
import Chart from "react-google-charts";
import {useRouter} from "next/router";

export default function MHC() {
  const [accChart, setAccChart] = useState();
  const [speedChart, setSpeedChart] = useState();

  const router = useRouter();

  const home = () => {
    router.push('/');
  }
  const reset = () => {
    document.getElementById('result').hidden = true;
    document.getElementById('form').reset();
    Cookies.set('maxHeight', 'expired', { expires: new Date(0) });
  }
  const calculate = (event) => {
    event.preventDefault();
    if (event.target.r.value <= 0) {
      event.target.r.className = event.target.r.className + ' is-invalid';
      return;
    }
    document.getElementById('calculating').hidden = false;
    const G = 6.674 * (10 ** -11);
    // Fnet = Cl × ρ x v^2 x A / 2 - G (m1×m2) / r^2
    let F = event.target.cl.value * event.target.p.value * (event.target.v.value ** 2) * event.target.A.value / 2 - G * event.target.m1.value * event.target.m2.value / (event.target.r.value ** 2);
    let a = F / event.target.m2.value;

    fetch('/api/graph', {method: 'POST', body: JSON.stringify({F: F, a: a, Cd: event.target.Cd.value, p: event.target.p.value, A: event.target.A.value, m2: event.target.m2.value})}).then(r => {
      r.json().then(data => {
        setAccChart(
          <Chart
            width={'100%'}
            height={'50vh'}
            chartType={'LineChart'}
            options={{
              title: 'Hand Helicopter Acceleration',
              hAxis: {
                title: 'Time (s)'
              },
              vAxis: {
                title: 'Acceleration (m/s/s)',
              }
            }}
            loading={<h3>Loading...</h3>}
            series={{
              0: {
                //curveType: 'function'
              }
            }}
            data={data.accelerations}
          />
        );
        setSpeedChart(
          <Chart
            width={'100%'}
            height={'50vh'}
            chartType={'LineChart'}
            options={{
              title: 'Hand Helicopter Speed',
              hAxis: {
                title: 'Time (s)'
              },
              vAxis: {
                title: 'Speed (m/s)',
              },
              0: {
                //curveType: 'function'
              }
            }}
            loader={<h3>Loading...</h3>}
            data={data.speeds}
          />
        );
        document.getElementById('result').hidden = false;
        document.getElementById('calculating').hidden = true;
        //TODO
        Cookies.set('maxHeight', null);
      });
    })
  }
  return (
    <>
      <Container fluid={true} className={'d-flex justify-content-center align-items-center mt-2'}>
        <Alert color={'primary'} hidden={true} id={'calculating'}>
          Calculating...
        </Alert>
        <Form style={{borderStyle: 'double', borderColor: '#007bff'}} className={'col-md-10 py-2'} onSubmit={calculate} id={'form'}>
          <Button color={'primary'} outline={true} onClick={home} className={'float-right'}>Back</Button>
          <h3>The Equation</h3>
          <div id={'result'} hidden={true}>
            <hr/>
            <h3>Result</h3>
            {accChart}
            {speedChart}
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
              <Input id={'cl'} type={'number'} required={true} step={'any'}/>
            </FormGroup>
            <FormGroup className={'col-5 px-0 ml-auto'}>
              <label htmlFor={'A'}>Total Blade Area (A) (m<sup>2</sup>)</label>
              <Input id={'A'} type={'number'} required={true} step={'any'}/>
            </FormGroup>
          </Row>
          <Row className={'mx-1'}>
            <FormGroup className={'col-5 px-0'}>
              <label htmlFor={'p'}>Atmospheric Density (ρ) (kg m<sup>-3</sup>)</label>
              <Input id={'p'} type={'number'} required={true} step={'any'}/>
            </FormGroup>
            <FormGroup className={'col-5 px-0 ml-auto'}>
              <label htmlFor={'m1'}>Mass of the Celestial Body (m<sub>1</sub>) (kg)</label>
              <Input id={'m1'} type={'number'} required={true} step={'any'}/>
            </FormGroup>
          </Row>
          <Row className={'mx-1'}>
            <FormGroup className={'col-5 px-0'}>
              <label htmlFor={'v'}>Blade Velocity (v) (m s<sup>-1</sup>)</label>
              <Input id={'v'} type={'number'} required={true} step={'any'}/>
            </FormGroup>
            <FormGroup className={'col-5 px-0 ml-auto'}>
              <label htmlFor={'m2'}>Mass of the Hand Helicopter (m<sub>2</sub>) (kg)</label>
              <Input id={'m2'} type={'number'} required={true} step={'any'}/>
            </FormGroup>
          </Row>
          <FormGroup className={'col-5 px-0'}>
            <label htmlFor={'Cd'}>Drag Coefficient (C<sub>D</sub>)</label>
            <Input id={'Cd'} type={'number'} required={true} step={'any'}/>
          </FormGroup>
          <FormGroup>
            <label htmlFor={'r'}>Distance between the centre of m<sub>1</sub> and m<sub>2</sub> (r) (m)</label>
            <Input id={'r'} type={'number'} required={true} step={'any'}/>
          </FormGroup>
          <Button color={'primary'} outline={true} type={'submit'}>Calculate!</Button>
        </Form>
      </Container>
    </>
  );
}