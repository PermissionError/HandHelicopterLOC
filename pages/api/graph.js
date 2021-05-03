export default function handler(req, res) {
  let mb = 0.001;
  let p = 1.225
  let A = 0.005344;
  let cl = req.body.Cl;
  let a = 0;
  let vv = 0;
  let s = 0;
  //TODO This is not right
  let vh = 9.51;
  let collection = [vh];
  for(let i = 1; i < 10000; i++) {
    vh = vh - (1/1000) * 0.09426816 * vh**2;

    a = a + (1/1000) * ( (cl * p * vh**2 * A / (2 - 9.81 * mb)) / mb);
    vv = vv + (1/1000) * a;
    s = s + (1/1000) * vv;
    collection[i] = vh;
  }

  res.end('bruh');
}