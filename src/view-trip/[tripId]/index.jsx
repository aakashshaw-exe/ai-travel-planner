import Hotels from "../components/Hotels";
import InfoSection from "../components/InfoSection";
import PlaceToVisit from "../components/PlaceToVisit";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState({}); // Initialize as an object

  const getTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("document", docSnap.data());
        setTrip(docSnap.data());
      } else {
        toast.error('No Trip Found!');
      }
    } catch (error) {
      console.error("Error fetching trip data: ", error);
      toast.error('Error fetching trip data');
    }
  };

  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Daily Plan */}
      <PlaceToVisit trip={trip} />

    </div>
  );
}

export default ViewTrip;
