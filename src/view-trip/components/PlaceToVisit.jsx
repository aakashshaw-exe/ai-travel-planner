import React, { useEffect } from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlaceToVisit({ trip }) {
    useEffect(() => {
        console.log("Trip Data:", trip);
    }, [trip]);

    const itinerary = trip?.tripData?.itinerary || [];

    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Places to Visit</h2>
            <div>
                {itinerary.length > 0 ? (
                    itinerary.map((item, index) => (
                        <div key={index}>
                            <div className='mt-5'>
                                <h2 className='font-medium text-lg'>Day {item.day}</h2>
                                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5">
                                    {item.plan?.map((place, index) => (
                                        <div key={index}>
                                            <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
                                            <PlaceCardItem place={place} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No itinerary data available.</p>
                )}
            </div>
        </div>
    );
}

export default PlaceToVisit;
