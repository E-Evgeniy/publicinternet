import React, { useState, useEffect } from "react";

import { ReactInternetSpeedMeter } from 'react-internet-meter';
import { useNavigate } from "react-router-dom";


export default function NewInternetSpeed() {
    const [testInProgress, setTestInProgress] = useState(false)
    const [downloadSpeeds, setDownloadSpeeds] = useState([])
    const [latesDownloadSpeed, setlatesDownloadSpeed] = useState(null)
    const [placeName, setPlaceName] = useState("")
    const [placeCity, setPlaceCity] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if (latesDownloadSpeed) {
            const newDownloadSpeeds = [...downloadSpeeds, latesDownloadSpeed]
            // if there are now 5 measurements stored, we can stop the test
            console.log(`before: ${downloadSpeeds}, after: ${newDownloadSpeeds}`)
            setDownloadSpeeds(newDownloadSpeeds)
            const sufficientDataPoints = newDownloadSpeeds.length >= 5
            if (sufficientDataPoints) {
                // Send a pist request
                const apiEndpoint = `api/internet_speed`
                const data = {
                    "download_units": "mbps",
                    "download_speed": (1.0 * downloadSpeeds / downloadSpeeds.length),
                    "place_name": placeName,
                    "place_city": placeCity,

                }

                fetch(apiEndpoint, {
                    method: "POST", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then(_ => {
                        // Redirect to the home page
                        navigate("/")
                        console.log("Success");
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            }
        }
    }, [latesDownloadSpeed])

    return (
        <div className="bg-white p-8 rounded-md w-full">
            <div className=" flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-4xl text-gray-600 font-semibold">Log internet speed</h2>
                </div>
            </div>
            <div className="md:ml-2 mt-2 w-96">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                    Place Name
                </label>
                <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="placeName"
                    type="text"
                    placeholder="Place Name"
                    onChange={(e) => setPlaceName(e.target.value)}
                />
            </div>
            <div className="md:ml-2 mt-2 w-96">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                    City
                </label>
                <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="city"
                    type="text"
                    placeholder="City"
                    onChange={(e) => setPlaceCity(e.target.value)}
                />
            </div>
            <div className="md:ml-2 mt-4 w-96 text-center">
                {testInProgress &&
                    <div>
                        <div> Testing... </div>
                        <ReactInternetSpeedMeter
                            txtSubHeading="Internet is too slow"
                            outputType="alert"
                            customClassName={null}
                            txtMainHeading="Opps..."
                            pingInterval={1000} // milliseconds 
                            thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte" 
                            threshold={0}
                            imageUrl="https://cdn.speedcheck.org/images/reviews/google-speed-test-mobile.jpg"
                            downloadSize="157000" //bytes
                            callbackFunctionOnNetworkTest={(speed) => setlatesDownloadSpeed(speed)}
                        />
                    </div>
                }

                {!testInProgress && downloadSpeeds.length == 0 && (
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => setTestInProgress(true)}
                    >
                        Start speed test
                    </button>
                )}
            </div>



        </div>

    )
}