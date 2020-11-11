export default function handler(req, res) {
  let json = JSON.parse(req.body);
  let F = json.F;
  let a = json.a;
  let accelerations = [['x', 'Acceleration']];
  let speeds = [['x', 'Speed']];
  let vv = 0;
  for (let i = 0; i < 1_000_000; i++) {
    vv = vv + a / 1000;
    //Add current a and vv to results
    if(i % 1000 === 0) {
      accelerations.push([i/1000, a]);
      speeds.push([i/1000, vv]);
    }
    a = (F - json.Cd * json.p * (vv ** 2) * json.A / 2) / json.m2;
  }
  res.json({accelerations: accelerations, speeds: speeds});
  res.end(200);
}