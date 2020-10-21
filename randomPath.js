const trackQuantity = 50;
let startPoints = [];
for(let i=0;i<trackQuantity;i++){
    //-93 to -82
    // +5 to -13
    let lat = 5 - 18 * Math.random();
    let lng = -93 + 11 * Math.random();
    startPoints.push({"lat":lat,"lng":lng});
    L.circle([lat,lng]).addTo(map)
}


let intermediatePoints = [];
for(let i=0;i<trackQuantity;i++){
    //-120 to -100
    // +10 to -10
    let lat = 10 - 20 * Math.random();
    let lng = -120 + 20 * Math.random();
    intermediatePoints.push({"lat":lat,"lng":lng});
    L.circle([lat,lng]).addTo(map)
}


let endPoints = [];
for(let i=0;i<trackQuantity;i++){
    //-117 to -106
    // +22 to +14
    let lat = 22 - 8 * Math.random();
    let lng = -117 + 11 * Math.random();
    endPoints.push({"lat":lat,"lng":lng});
    L.circle([lat,lng]).addTo(map)
}


let connectedPaths = [];
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
}


