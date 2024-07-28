import React, { useState, useEffect } from 'react';
import OpenCageAutocomplete from '../components/OpenCageAutocomplete';
import { apiurl } from '../components/constant';
import { SelectBudgetOptions, SelectTravelsList } from '../components/constants/options';
import { Button } from '../components/ui/button';
import { toast } from "sonner";
import { chatSession } from "@/service/AiModal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";

const getAIPrompt = (formData) => `
  Generate a travel plan for Location: ${formData.location},
  for ${formData.numberOfDays} days for ${formData.traveler} with a ${formData.budget} budget.
  Provide hotel options with name, address, price, image URL, geo coordinates, and rating.
  Suggest an itinerary with placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, rating, and timeToTravel.
  Include a daily plan for ${formData.numberOfDays} days with the best time to visit in JSON format.
`;

function CreateTrip() {
    const [place, setPlace] = useState('');
    const [formData, setFormData] = useState({
        location: '',
        numberOfDays: '',
        budget: '',
        traveler: ''
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelect = (suggestion) => {
        setPlace(suggestion.formatted);
        handleInputChange('location', suggestion.formatted);
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            await GetUserProfile(tokenResponse.access_token);
        },
        onError: (error) => {
            console.error("Login Error:", error);
        }
    });

    const OnGenerateTrip = async () => {
        if (
            !formData.location ||
            !formData.numberOfDays ||
            !formData.budget ||
            !formData.traveler
        ) {
            toast("Please input data in all fields");
        } else {
            setIsLoading(true);
            setOpenDialog(true);
            const AI_PROMPT = getAIPrompt(formData);
            try {
                const result = await chatSession.sendMessage(AI_PROMPT);
                console.log(result.response.text());
                await saveAiTrip(result.response.text());
            } catch (error) {
                console.error("Error generating trip:", error);
                toast("Failed to generate trip. Please try again.");
            }
            setIsLoading(false);
            setOpenDialog(false);
        }
    };

    const saveAiTrip = async (TripData) => {
        setIsLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();

        let parsedTripData;

        try {
            parsedTripData = JSON.parse(TripData);
        } catch (error) {
            console.error("Error parsing trip data:", error);
            toast.error("Failed to parse trip data.");
            setIsLoading(false);
            return;
        }

        try {
            await setDoc(doc(db, "AITrips", docId), {
                userSelection: formData,
                tripData: parsedTripData,
                userEmail: user?.email,
                id: docId
            });
            navigate('/view-trip/' + docId);
        } catch (error) {
            console.error("Error saving trip data to Firebase:", error);
            toast.error("Failed to save trip data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const GetUserProfile = async (accessToken) => {
        try {
            const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: `application/json`
                }
            });
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            setOpenDialog(false);
            await OnGenerateTrip();
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast("Failed to fetch user profile. Please try again.");
            setOpenDialog(false); 
        }
    };

    return (
        <div className='flex flex-col items-center sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
            <p className='mt-3 text-gray-500 text-xl'>
                Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>

            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
                    <OpenCageAutocomplete
                        apiKey={apiurl}
                        onSelect={handleSelect}
                        selectProps={{
                            place: place,
                            onChange: (v) => {
                                setPlace(v);
                                handleInputChange('location', v);
                            }
                        }}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                    <input
                        placeholder='Ex. 3'
                        type="number"
                        className="p-2 w-1/2 border border-gray-300 rounded"
                        onChange={(e) => handleInputChange('numberOfDays', e.target.value)}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5 text-center'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                                    ${formData.budget === item.title ? 'border-2 border-black shadow-lg' : 'border-gray-300'}`}
                            >
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h3 className='font-bold text-lg'>{item.title}</h3>
                                <p className='text-sm text-gray-500'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5 text-center'>
                        {SelectTravelsList.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                                    ${formData.traveler === item.people ? 'border-2 shadow-lg border-black' : ''}`}
                            >
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <h3 className='font-bold text-lg'>{item.title}</h3>
                                <p className='text-sm text-gray-500'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="my-14 flex justify-end">
                <Button disabled={isLoading} onClick={login}>
                    <FcGoogle className='mr-2' />{isLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Sign In with Google"}
                </Button>
            </div>

            <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
                <DialogHeader>
                    <DialogTitle>Generating Your Trip...</DialogTitle>
                    <DialogDescription>
                        We are currently creating a custom travel itinerary for you. Please wait a moment.
                    </DialogDescription>
                </DialogHeader>
                <DialogContent>
                    <div className="flex justify-center">
                        {isLoading ? <AiOutlineLoading3Quarters className="animate-spin text-4xl" /> : null}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateTrip;
