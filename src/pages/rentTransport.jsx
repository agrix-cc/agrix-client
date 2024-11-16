import {APIProvider, Map, useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import React, {useEffect, useRef, useState} from "react";
import MobileNav from "../components/mobileNav";
import {TimelineConnector, TimelineContent, TimelineItem, TimelineRoot} from "../components/ui/timeline";
import {FaRegCheckCircle, FaRegDotCircle} from "react-icons/fa";
import {useLocation, useNavigate} from "react-router-dom";

const RentTransport = () => {

    const location = useLocation();
    const {price_per_km, listing} = location.state;

    const defaultCenter = {lat: 7.4, lng: 80.4};
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [routes, setRoutes] = useState(null);
    const [total, setTotal] = useState(null);
    const [averageDistance, setAverageDistance] = useState(null);
    const [locations, setLocations] = useState(null);

    useEffect(() => {
        if (!routes) return;
        let distance = 0;
        routes.forEach(route => {
            distance += route.legs[0].distance.value;
        })
        setAverageDistance(distance / routes.length);
        setLocations({
            start: {
                address: routes[0].legs[0].start_address,
                geoCodes: {
                    lat: origin.geometry.location.lat(),
                    lng: origin.geometry.location.lng(),
                },
            },
            end: {
                address: routes[0].legs[0].end_address,
                geoCodes: {
                    lat: destination.geometry.location.lat(),
                    lng: destination.geometry.location.lng(),
                },
            }
        });
    }, [routes, origin, destination])

    useEffect(() => {
        if (!averageDistance) return
        setTotal((averageDistance / 1000).toFixed(2) * price_per_km)
    }, [averageDistance, price_per_km, listing])

    return (
        <div className="h-dvh w-full">
            <MobileNav/>

            <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <div
                    className="w-full bg-white shadow-lg absolute top-16 z-10 grid gap-4 p-4 md:max-w-sm md:rounded-xl md:left-1/2 md:-translate-x-1/2">

                    <TimelineRoot>
                        <TimelineItem>
                            <TimelineConnector>
                                <FaRegDotCircle/>
                            </TimelineConnector>
                            <TimelineContent>
                                <PlaceAutocomplete label="Pickup" onPlaceSelect={setOrigin}/>
                            </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                            <TimelineConnector>
                                <FaRegCheckCircle/>
                            </TimelineConnector>
                            <TimelineContent>
                                <PlaceAutocomplete label="Destination" onPlaceSelect={setDestination}/>
                            </TimelineContent>
                        </TimelineItem>
                    </TimelineRoot>

                </div>
                <Map
                    defaultCenter={defaultCenter}
                    defaultZoom={9}
                    disableDefaultUI={true}
                >
                    {origin && destination &&
                        <Directions origin={origin} destination={destination} onDirectionChange={setRoutes}/>
                    }
                </Map>
                {routes && total && averageDistance && locations &&
                    <FloatingContainer
                        total={total}
                        distance={averageDistance}
                        priceRate={price_per_km}
                        locations={locations}
                        listing={listing}/>
                }
            </APIProvider>
        </div>
    )
}

const Directions = (props) => {

    const {origin, destination, onDirectionChange} = props;

    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");

    const [directionService, setDirectionService] = useState();
    const [directionRenderer, setDirectionRenderer] = useState();

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionService(new routesLibrary.DirectionsService());
        setDirectionRenderer(new routesLibrary.DirectionsRenderer({map}));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionService || !directionRenderer) return;

        directionRenderer.setDirections({routes: []});

        directionService.route({
            origin: {
                lat: origin.geometry.location.lat(),
                lng: origin.geometry.location.lng(),
            },
            destination: {
                lat: destination.geometry.location.lat(),
                lng: destination.geometry.location.lng(),
            },
            travelMode: window.google.maps.TravelMode.DRIVING
        }).then(res => {
            directionRenderer.setDirections(res);
            onDirectionChange(res.routes);
        })
    }, [directionService, directionRenderer, origin, destination, onDirectionChange]);
}

const PlaceAutocomplete = (props) => {

    const {onPlaceSelect, label} = props;

    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary("places");

    useEffect(() => {
        if (!places || !inputRef.current) return;
        const options = {
            fields: ["geometry", "name", "formatted_address"],
        };
        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        if (!placeAutocomplete) return;
        placeAutocomplete.addListener("place_changed", () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete]);
    return (
        <div className="w-full">
            <p className="pb-1">{label}</p>
            <input ref={inputRef} className="w-full px-4 py-2 rounded-lg outline-none border border-gray-400"/>
        </div>
    );
};

const FloatingContainer = (props) => {

    const navigate = useNavigate();

    const {total, priceRate, distance, listing, locations} = props;

    return (
        <div
            className="duration-300 transition-all fixed bottom-16 md:bottom-0 left-0 w-full md:max-w-md md:left-1/2 md:-translate-x-1/2">
            <div className="bg-lime-green rounded-xl shadow-lg flex justify-between items-center p-4 m-4">
                <div>
                    <p className="text-2xl font-medium text-white">Rs. {total.toFixed(2)}</p>
                    <p className="text-white font-light">Price per km: <span
                        className="font-medium">Rs. {priceRate.toFixed(2)}</span></p>
                    <p className="text-white font-light">Average Distance: <span
                        className="font-medium">{(distance / 1000).toFixed(2)} km</span></p>
                </div>
                {/* TODO handle transport order processing */}
                <button
                    onClick={() => {
                        navigate('/checkout', {
                            state: {
                                ...listing.listing,
                                image: listing.images[0],
                                distance: distance,
                                total: total,
                                locations: locations,
                                selectedDate: listing.selectedDate,
                            }
                        })
                    }}
                    className="font-medium bg-white rounded-lg px-4 py-2 text-lime-green shadow-lg active:shadow-md active:translate-y-0.5 duration-300 transition-all">
                    Rent now
                </button>
            </div>
        </div>
    )
}

export default RentTransport;