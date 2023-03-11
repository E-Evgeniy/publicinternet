import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function PlacesList() {
    const [loading, setloading] = useState(true)
    const [loadedPlaces, setLoadedPlaces] = useState([])

    useEffect(() => {
        //Hit the server and get the places

        const apiEndpoint = "/api/places"

        fetch(apiEndpoint)
          .then(response => response.json())
          .then(data => {
                  console.log(data)
                  setLoadedPlaces(data["places"])
                  setloading(false)}
                );
    }, [])
    const headerClass = 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'
    const loadingSection = (<div>Loading...</div>)
    
    const dataSection = (
        <table>
          <thead>
            <tr>
              <th className={headerClass} >Name</th>
              <th className={headerClass} >City</th>
              <th className={headerClass} >Recent Upload Speed</th>
              <th className={headerClass} >Recent Upload Units</th>
              <th className={headerClass} >Number ofmeasurements</th>
            </tr>
          </thead>
          <tbody>
            {loadedPlaces.map((place, index) => {
              return (  
                  <tr key= {index}>
                    <td> {place.name} </td>
                    <td> {place.city} </td>
                    <td> {place.most_recent_download_speed} </td>
                    <td> {place.most_recent_speed_units} </td>
                    <td> {place.number_of_measurements} </td>
                  </tr>
              )
            })}
          </tbody>
        </table>      
    )

    if (loading) {
        return loadingSection
    } else {
        return dataSection
    }
}

// Add some javascript to replace the div where = 'places-list-container'
// with com=ntent render above

const placesList = ReactDOM.createRoot(document.getElementById("page-places"));
placesList.render(<PlacesList />);