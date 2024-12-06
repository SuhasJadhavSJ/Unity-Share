import React, { useState } from 'react'

const MapComponent = () => {

    const [latitude,setLatitude] = useState();
    const [longitude,setLongitude] = useState();

    const geo = navigator.geolocation

    // Get user current location
    geo.getCurrentPosition(userCoords);

    function userCoords(position){
        let userLatitude = position.coords.latitude
        let userLongitude = position.coords.longitude
        console.log("Lat :",userLatitude," Lon :",userLongitude);
    }

  return (
    <div className='map-container'>
      
    </div>
  )
}

export default MapComponent
