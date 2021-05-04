export default function handler(req, res) {
  req.body = JSON.parse(req.body);
  let mb = 0.002;
  let p = 1.225
  let A = 0.005344;
  let cl = parseFloat(req.body.Cl);
  let a = 0;
  let vv = 0;
  let s = 0;
  //TODO This is not right
  let vh = 12.174;
  let horivelocities = [vh];
  let accelerations = [a];
  let displacements = [s];
  let vertvelocities = [vv];
  //0.09426816
  for(let i = 1; i < 10000; i++) {
    vh = vh - ((1/1000) * 0.1178352 * vh**2);

    a = ( ((cl * p * (vh**2) * A / 2) - (9.81 * mb)) / mb);
    vv = vv + (1/1000) * a;
    s = s + (1/1000) * vv;
    horivelocities[i] = vh;
    accelerations[i] = a;
    displacements[i] = s;
    vertvelocities[i] = vv;
  }
  res.end(JSON.stringify({vh: horivelocities, vv: vertvelocities, s: displacements, a: accelerations}));
}