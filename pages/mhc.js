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
  const [horiVelChart, setHoriVelChart] = useState();
  const [vertVelChart, setVertVelChart] = useState();
  const [displacementChart, setDisplacementChart] = useState();


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

    fetch('/api/graph', {
      method: 'POST', body: JSON.stringify({Cl: event.target.Cl.value})}).then(r => {
        r.json().then(data => {
          let vhs = [['x', 'y']];
          let accs = [['x', 'y']];
          let vvs = [['x', 'y']];
          let ss = [['x', 'y']];
          for(let i = 0; i < 10000; i++) {
            let millisec = i / 1000;
            vhs.push([millisec, data.vh[i]]);
            accs.push([millisec, data.a[i]]);
            vvs.push([millisec, data.vv[i]]);
            ss.push([millisec, data.s[i]]);
          }
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
              data={accs}
            />
          );
          setHoriVelChart(
            <Chart
              width={'100%'}
              height={'50vh'}
              chartType={'LineChart'}
              options={{
                title: 'Hand Helicopter Horizontal Velocity',
                hAxis: {
                  title: 'Time (s)'
                },
                vAxis: {
                  title: 'Velocity (m/s)',
                },
                0: {
                  //curveType: 'function'
                }
              }}
              loader={<h3>Loading...</h3>}
              data={vhs}
            />
          );
          setVertVelChart(
            <Chart
              width={'100%'}
              height={'50vh'}
              chartType={'LineChart'}
              options={{
                title: 'Hand Helicopter Vertical Velocity',
                hAxis: {
                  title: 'Time (s)'
                },
                vAxis: {
                  title: 'Velocity (m/s)',
                  viewWindow: {
                    min: -5,
                    max: 3
                  }
                },
                0: {
                  //curveType: 'function'
                }
              }}
              loader={<h3>Loading...</h3>}
              data={vvs}
            />
          );
          setDisplacementChart(
            <Chart
              width={'100%'}
              height={'50vh'}
              chartType={'LineChart'}
              options={{
                title: 'Hand Helicopter Displacement',
                hAxis: {
                  title: 'Time (s)'
                },
                vAxis: {
                  title: 'Metres (m)',
                  viewWindow: {
                    min: -0.1,
                    max: 5
                  }
                },
                0: {
                  //curveType: 'function'
                }
              }}
              loader={<h3>Loading...</h3>}
              data={ss}
            />
          );
          document.getElementById('result').hidden = false;
          document.getElementById('calculating').hidden = true;
        });
      });
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
            {vertVelChart}
            {horiVelChart}
            {displacementChart}
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