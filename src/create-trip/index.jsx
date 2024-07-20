import React from 'react';
import { useState } from 'react';
import OpenCageAutocomplete from '../components/OpenCageAutocomplete';
import { apiurl } from '../components/consant';
import { SelectBudgetOptions, SelectTravelsList } from '../components/constants/options';
import { Button } from '../components/ui/button';


export function InputDemo() {
    return <Input type="email" placeholder="Email" />
}


function CreateTrip() {
    const [place, setPlace] = useState();
    const handleSelect = (suggestion) => {
        console.log('Selected location:', suggestion);
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 '>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
            <p className='mt-3 text-gray-500 text-xl'>
                Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>

            <div className='mt-20 flex flex-col gap-10'>
                <div >
                    <h2 className='text-xl my-3 font-medium'>
                        What is your destination of choice?
                    </h2>
                    <OpenCageAutocomplete
                        apiKey={apiurl}
                        onSelect={handleSelect}
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); console.log(v) }
                        }}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <input placeholder='Ex.3' type="number" className="p-2 w-1/2 border border-gray-300 rounded" />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5 text-center'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index} className='p-4 border cursor-pointer rounded-lg hover:shadow-md'>
                                <h2 className='text-4xl '>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>The budget is exclusively allocated for activities and dining purposes.</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5 text-center'>
                        {SelectTravelsList.map((item, index) => (
                            <div key={index} className='p-4 border cursor-pointer rounded-lg hover:shadow-md'>
                                <h2 className='text-4xl '>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>

                    <div className='my-10 justify-end flex'>
                        <Button variant="black"> Generate Trip</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTrip;
