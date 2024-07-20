import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips.
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, crafting custom itineraries to match your interests and budget.</p>
      </h1>

      <Link to='/create-trip'>
        <Button variant="black">Get Started, it's free</Button>
      </Link>
    </div>
  );
}

export default Hero;
