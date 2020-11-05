import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { listLogEntries } from './API'
import LogEntryForm from './LogEntryForm'

// DONE: Solve 'Each child in a list should have a unique "key" prop.' - used React.Fragment 
// TODO: Update Denver Aquarium coordinates
const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.7,
    zoom: 3
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude ] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/aababber/ckh1bo9w80ppg19nmd77wylh7"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id}>
            <Marker
              latitude={entry.latitude}
              longitude={entry.longitude}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <div
                onClick={() => setShowPopup({
                  // ...showPopup,
                  [entry._id]: true
                })}
              >
                <svg
                  className="marker-existing"
                  style={{
                    width: `24px`,
                    height: `24px`
                  }}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            {/* TODO: Add missing fields to popup */}
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited On: {new Date(entry.visitDate).toLocaleDateString()}</small>
                    { entry.image && <img src={entry.image} alt={entry.title}/> }
                  </div>
                </Popup>
              ) : null
            }
          </React.Fragment>
        ))
      }
      {
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              offsetLeft={-12}
              offsetTop={-24}
            >
              <div>
                <svg
                  className="marker-added"
                  style={{
                    width: `24px`,
                    height: `24px`
                  }}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div className="popup">
                <LogEntryForm onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }} location={addEntryLocation} />
              </div>
            </Popup>
          </>
        ) : null
      }
    </ReactMapGL>
  );
}

export default App;
