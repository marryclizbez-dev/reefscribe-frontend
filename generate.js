const fs = require('fs');
const topojson = require('topojson-client');
const d3 = require('d3-geo');

const world = JSON.parse(fs.readFileSync('/tmp/world.json', 'utf8'));
const land = topojson.feature(world, world.objects.countries);

const width = 1440;
const height = 900;

const bounds = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [[
      [46, 31],
      [65, 31],
      [65, 21],
      [46, 21],
      [46, 31]
    ]]
  }
};

const projection = d3.geoEquirectangular()
  .fitSize([width, height], bounds)
  .clipExtent([[0, 0], [width, height]]);

const path = d3.geoPath(projection);
let svgPath = path(land);

fs.writeFileSync('path.txt', svgPath);
console.log('Path generated, length: ', svgPath.length);
