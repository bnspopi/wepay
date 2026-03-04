import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  state: string | null;
  error: string | null;
  loading: boolean;
}

interface LocationContextType extends LocationData {
  refreshLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationData>({
    latitude: null,
    longitude: null,
    address: null,
    state: null,
    error: null,
    loading: true,
  });

  const lastCoordsRef = useRef<{ lat: number; lon: number } | null>(null);
  const lastFetchTimeRef = useRef<number>(0);

  const reverseGeocode = async (lat: number, lon: number) => {
    // Throttling: only fetch if location changed significantly or 30 seconds passed
    const now = Date.now();
    if (lastCoordsRef.current) {
      const distanceMoved = Math.sqrt(
        Math.pow(lat - lastCoordsRef.current.lat, 2) + 
        Math.pow(lon - lastCoordsRef.current.lon, 2)
      );
      
      // If moved less than ~100m and less than 30s passed, return last values if available
      if (distanceMoved < 0.001 && (now - lastFetchTimeRef.current < 30000) && location.address) {
        return { address: location.address, state: location.state };
      }
    }

    try {
      lastFetchTimeRef.current = now;
      lastCoordsRef.current = { lat, lon };

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en' // Ensure consistent language for parsing
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const district = data.address.city_district || data.address.district || data.address.city || data.address.town || data.address.village;
      const state = data.address.state;
      const country = data.address.country;

      return {
        address: district && state && country ? `${district}, ${state}, ${country}` : (state && country ? `${state}, ${country}` : data.display_name || 'Unknown Location'),
        state: state || null
      };
    } catch (error) {
      console.warn('Reverse geocoding failed, using coordinates instead:', error);
      return { 
        address: `${lat.toFixed(4)}, ${lon.toFixed(4)}`, 
        state: null 
      };
    }
  };

  const updateLocation = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const { address, state } = await reverseGeocode(latitude, longitude);
    
    setLocation({
      latitude,
      longitude,
      address,
      state,
      error: null,
      loading: false,
    });
  };

  const handleError = (error: GeolocationPositionError) => {
    let errorMessage = 'Location access required for regional services';
    if (error.code === error.PERMISSION_DENIED) {
      errorMessage = 'Location access required for regional services';
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      errorMessage = 'Location information is unavailable';
    } else if (error.code === error.TIMEOUT) {
      errorMessage = 'Location request timed out';
    }

    setLocation(prev => ({
      ...prev,
      error: errorMessage,
      loading: false,
    }));
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(updateLocation, handleError, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    });

    return watchId;
  };

  useEffect(() => {
    const watchId = startTracking();
    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const refreshLocation = () => {
    setLocation(prev => ({ ...prev, loading: true }));
    navigator.geolocation.getCurrentPosition(updateLocation, handleError);
  };

  return (
    <LocationContext.Provider value={{ ...location, refreshLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
