import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Map() {
  const mapContainerRef = useRef(null);
  const [directionInfo, setDirectionInfo] = useState([]);
  const [render, setRender] = useState(false);
  const [renderOne, setRenderOne] = useState(false);
  const [mapToken, setMapToken] = useState({});
  const [lat, setLat] = useState("");

  mapboxgl.accessToken = mapToken;

  // console.log(mapboxgl.accessToken);

  const [returnRender, setReturnRender] = useState(false);

  const latitude = useSelector((state) => state.lat);
  const longitude = useSelector((state) => state.lng);

  useEffect(() => {
    axios.get('/api/user/mapBoxToken').then((res) => {
      setMapToken(res.data.Token);
      setRender(true);
    });

    const map = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/mapbox/streets-v11",
      center: [75.3704, 11.8745],
      zoom: 10,
    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
      showUserLocation: true,
      showAccuracyCircle: true,
    });
    map.addControl(geolocate);
    map.on("load", function() {
      geolocate.trigger(); // add this if you want to fire it by code instead of the button
    });
    geolocate.on("geolocate", locateUser);

    function locateUser(e) {
      // console.log("A geolocate event has occurred.");
      // console.log("lng:" + e.coords.longitude + ", lat:" + e.coords.latitude);

      const marker1 = new mapboxgl.Marker({
        draggable: false,
      })
        .setLngLat([e.coords.longitude, e.coords.latitude])
        .addTo(map);

      axios
        .get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${e.coords.longitude},${e.coords.latitude};${longitude},${latitude}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
        )
        .then((res) => {
          // console.log(res.data);
          setDirectionInfo(res.data.routes[0].geometry.coordinates);
          setRenderOne(true);
        });
    }

    const marker2 = new mapboxgl.Marker({
      draggable: false,
    })
      .setLngLat([longitude, latitude])
      .addTo(map);

    // add navigation control (the +/- zoom buttons)
    map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: true,
      })
    );

    map.on("load", () => {
      // console.log("loading")
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: directionInfo,
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#0000FF",
          "line-width": 8,
        },
      });
    });

    return () => {
      setReturnRender(true);
    };
  }, [render, renderOne]);

  return (
    <div>
      <br />
      <br />
      <br />
      <div
        style={{
          width: "100%",
          height: "90vh",
          position: "relative",
          backgroundColor: "white",
        }}
      >
        <div
          className="map-container"
          ref={mapContainerRef}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        ></div>
      </div>
    </div>
  );
}

export default Map;
