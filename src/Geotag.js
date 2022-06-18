import React, { Component } from 'react';
import { Text, View, StyleSheet, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
    Container: {
        'flex': 1,
        'justifyContent': 'center',
        'alignItems': 'center'
    },
    Label: {
        'fontSize': 24
    }
})



class CurrentPosition extends Component {
    constructor() {
        super()

        this.state = {
            latitude: null,
            longitude: null,
            altitude : null
        }
    }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Izin Lokasi",
                    message:
                        "Aplikasi ini meminta izin untuk mengakses lokasi",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.watchPosition(
                    position => {
                        const { latitude, longitude, altitude } = position.coords;
                        this.setState({
                            latitude: latitude,
                            longitude: longitude,
                            altitude : altitude
                        })
                    },
                    error => {
                        console.log(error.code, error.message);
                    },
                    {enableHighAccuracy : true, interval : 5000, distanceFilter : 5}
                    //{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            } else {
                console.log("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    componentDidMount() {
        this.requestLocationPermission()
    }

    render() {
        return (
            <View style={styles.Container}>
                {this.state.longitude ? (
                    <>
                        <Text style={styles.Label}>Latitude: {this.state.latitude}</Text>
                        <Text style={styles.Label}>Longitude: {this.state.longitude}</Text>
                        <Text style={styles.Label}>
                           Altitude :  {this.state.altitude}
                        </Text>
                    </>
                ) : (
                    <Text style={styles.Label}>Loading...</Text>
                )}
            </View>
        );
    }
};

export default CurrentPosition; 