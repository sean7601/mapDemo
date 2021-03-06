    //build map of the world
    var map = L.map('map',{worldCopyJump:false,
        maxBoundsViscosity: 1,
        contextmenu: true,
      contextmenuWidth: 140,
	      contextmenuItems: [{
		      text: 'Center map here',
		      callback: centerMap
	      }, 
          ]
    }).setView([43, 0], 2);
    map.setMaxBounds(  [[-90,-720],   [90,720]]  )
    
    function centerMap (e) {
        map.panTo(e.latlng);
    }


    //draw landmasses
    var theGrid = L.vectorGrid.slicer(largeWorld, {
        vectorTileLayerStyles: {
            sliced:{
                weight: 0,
                    fillColor: '#9bc2c4',
                    fillOpacity: 1,
                    color: "black",
                    stroke: true,
                    fill: true}
        }
    }).addTo(map);

    var myStyle = {
        "color": "#ff7800",
        "weight": 1,
        "opacity": .4
    };
        //draw bathy data
        //var oceanContours = L.geoJSON(bathy,{style:myStyle}).addTo(map);


    
    map.on('click',function(e){
        console.log(e)
        console.log(e.latlng)
    });

    //add corner readouts
    L.Control.textbox = L.Control.extend({
		onAdd: function(map) {
			
		var text = L.DomUtil.create('div');
		text.id = "latLongReadout";
		return text;
		},

		onRemove: function(map) {
			// Nothing to do here
		}
	});
	L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
    L.control.textbox({ position: 'bottomleft' }).addTo(map);


L.Control.textbox = L.Control.extend({
		onAdd: function(map) {
			
		var text = L.DomUtil.create('div');
		text.id = "pdReadout";
		return text;
		},

		onRemove: function(map) {
			// Nothing to do here
		}
	});
	L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
    L.control.textbox({ position: 'bottomright' }).addTo(map);


    $('#map').css('cursor','default');



