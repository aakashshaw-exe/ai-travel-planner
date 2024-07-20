// src/components/OpenCageAutocomplete.jsx
import React, { useState } from 'react';
import axios from 'axios';


function OpenCageAutocomplete({ apiKey, onSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  console.log(apiKey)
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
   

    if (value.length > 2) {
      try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
          params: {
            q: value,
            key: apiKey, // Ensure this key is valid
            limit: 5,
          },
        });

        // Check if the API returned results
        if (response.data && response.data.results) {
          setSuggestions(response.data.results);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
        setSuggestions([]); // Clear suggestions on error
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.formatted);
    setSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter a location"
        className="p-2 w-1/2 border border-gray-300 rounded"
      />
      {suggestions.length > 0 && (
        <ul className="border border-gray-300 rounded mt-2">
          {suggestions.map((suggestion) => (
            <li
              key={`${suggestion.geometry.lat}-${suggestion.geometry.lng}`}
              onClick={() => handleSelect(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OpenCageAutocomplete;

