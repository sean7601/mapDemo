function llFromDistance(latitude, longitude, distance, bearing) {
    // taken from: https://stackoverflow.com/a/46410871/13549 
    // distance in KM, bearing in degrees
    distance *= 1.852;//converts to KM
    const R = 6378.1; // Radius of the Earth
    const brng = bearing * Math.PI / 180; // Convert bearing to radian
    let lat = latitude * Math.PI / 180; // Current coords to radians
    let lon = longitude * Math.PI / 180;
  
    // Do the math magic
    lat = Math.asin(Math.sin(lat) * Math.cos(distance / R) + Math.cos(lat) * Math.sin(distance / R) * Math.cos(brng));
    lon += Math.atan2(Math.sin(brng) * Math.sin(distance / R) * Math.cos(lat), Math.cos(distance / R) - Math.sin(lat) * Math.sin(lat));
  
    // Coords back to degrees and return
    return [(lat * 180 / Math.PI), (lon * 180 / Math.PI)];
  }


const trackQuantity = 50;
let startPoints = [];
for(let i=0;i<trackQuantity;i++){
    //-93 to -82
    // +5 to -13
    let lat = 5 - 18 * Math.random();
    let lng = -93 + 11 * Math.random();
    startPoints.push({"lat":lat,"lng":lng});
    L.circle([lat,lng],{color:"green"}).addTo(map)
}


let intermediatePoints = [];
for(let i=0;i<trackQuantity;i++){
    //-120 to -100
    // +10 to -10
    let lat = 10 - 20 * Math.random();
    let lng = -120 + 20 * Math.random();
    intermediatePoints.push({"lat":lat,"lng":lng});
    L.circle([lat,lng],{color:"orange"}).addTo(map)
}


let endPoints = [];
for(let i=0;i<trackQuantity;i++){
    //-117 to -106
    // +22 to +14
    let lat = 22 - 8 * Math.random();
    let lng = -117 + 11 * Math.random();
    endPoints.push({"lat":lat,"lng":lng});
    L.circle([lat,lng],{color:"blue"}).addTo(map)
}


let historicalPaths = [];
for(let i=0;i<trackQuantity;i++){
    let start = {x:startPoints[i].lng,y:startPoints[i].lat}
    let intermediate = {x:intermediatePoints[i].lng,y:intermediatePoints[i].lat}
    let end = {x:endPoints[i].lng,y:endPoints[i].lat}

    let firstGenerator = new arc.GreatCircle(start, intermediate, {'name': i+"first"});
    let secondGenerator = new arc.GreatCircle(intermediate, end, {'name': i+"second"});
    let firstLine = firstGenerator.Arc(10);
    let secondLine = secondGenerator.Arc(10);
    let result = []
    for(var ii=0;ii<firstLine.geometries[0].coords.length;ii++){
        let coord = firstLine.geometries[0].coords[ii];
        result.push([coord[1],coord[0]]);
    }
    for(var ii=0;ii<secondLine.geometries[0].coords.length;ii++){
        let coord = secondLine.geometries[0].coords[ii];
        result.push([coord[1],coord[0]]);
    }

    L.polyline(result, {color: 'red',weight:.3}).addTo(map);
    historicalPaths.push(result)
}


console.log(historicalPaths)



//-105 to -90
// +10 to -13
let lat = 10 - 23 * Math.random();
let lng = -105 + 15 * Math.random();
let trackStart = [lat,lng]
L.circle(trackStart,{color:"black"}).addTo(map)

let trackEnd = llFromDistance(lat, lng, 50 + Math.random() * 100, 220 + Math.random() * 100)
L.circle(trackEnd,{color:"purple"}).addTo(map)

let start = {x:trackStart[1],y:trackStart[0]};
let end = {x:trackEnd[1],y:trackEnd[0]};
let trackGenerator = new arc.GreatCircle(start, end, {'name': "track"});
let trackLine = trackGenerator.Arc(10);

let observedTrack = [];
for(var i=0;i<trackLine.geometries[0].coords.length;i++){
    let coord = trackLine.geometries[0].coords[i];
    observedTrack.push([coord[1],coord[0]]);
}

L.polyline(observedTrack, {color: 'magenta',weight:1}).addTo(map);

console.log(observedTrack)


