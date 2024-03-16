import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import './CurrentLocation.css'

function GetLocation() {
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            })
        } else {
            console.log("Geolocation is not available")
        }
    }, [])

    return <>
        {position.latitude && position.longitude ? (
            <MapContainer center={[position.latitude, position.longitude]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[position.latitude, position.longitude]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        ) : (
            <p>Loading...</p>
        )}
    </>
}

export default GetLocation