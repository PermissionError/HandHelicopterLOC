import {Button, Container, Form, FormGroup, Input, Row, Alert} from "reactstrap";
import React, {useState} from "react";
import Cookies from "cookie-cutter";
import Chart from "react-google-charts";
import {useRouter} from "next/router";

export default function MHC() {
  /*
  a) Change v to vh
b) Write vh decreasing over time
c) In the for loop, have a reset every time, since vh will be changing this will mean that a, the rate of change vv, will change
d) Change the scale on time
   */
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
    document.getElementById('calculating').hidden = false;

    fetch('/api/graph', {method: 'POST', body: JSON.stringify({Cl: event.target.Cl.value}).then(r => {
      r.json().then(data => {
        /*setAccChart(
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
        Cookies.set('maxHeight', null);*/
        data.
      });
    })
  });
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
          <FormGroup className={'col-5 px-0'}>
            <label htmlFor={'Cl'}>Lift Coefficient (C<sub>L</sub>)</label>
            <Input id={'Cl'} type={'number'} required={true} step={'any'}/>
          </FormGroup>
          <Button color={'primary'} outline={true} type={'submit'}>Calculate!</Button>
        </Form>
      </Container>
    </>
  );
}