import React, { useState, useEffect } from "react";

import { ReactInternetSpeedMeter } from 'react-internet-meter'

export default function NewInternetSpeed() {
    const [testInProgress, setTestInProgress] = useState(false)
    const [downloadSpeeds, setDownloadSpeeds] = useState([])

    const onDownloadSpeedChange = (speed) => {
        const newDownloadSpeeds = downloadSpeeds.add(speed)
        // if there are now 5 measurements stored, we can stop the test
        setDownloadSpeeds(newDownloadSpeeds)
        if (newDownloadSpeeds.length > 5) {
            setTestInProgress(false)
        }
        setDownloadSpeeds(newDownloadSpeeds)
    }
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
                            callbackFunctionOnNetworkDown={(speed) => console.log(`callbackFunctionOnNetworkDown ${speed}`)}
                            callbackFunctionOnNetworkTest={(speed) => console.log(`callbackFunctionOnNetworkTest ${speed}`)}
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