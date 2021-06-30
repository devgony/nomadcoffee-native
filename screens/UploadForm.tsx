import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { ScreenProps } from "../types/screen";
import MapView, {
  AnimatedRegion,
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { useState } from "react";
import { useRef } from "react";
import * as Location from "expo-location";

const Container = styled.View`
  background-color: black;
  justify-content: space-between;
`;
const InputContainer = styled.View`
  height: 200px;
  padding: 0px 50px;
  z-index: 1;
`;
const Photo = styled.Image`
  height: 50px;
`;
const TitleContainer = styled.View`
  margin-top: 30px;
  margin-bottom: 10px;
`;
const Title = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

interface ImapData {
  region: {
    latitudeDelta: number;
    longitudeDelta: number;
    latitude: number;
    longitude: number;
  };
  listViewDisplayed: boolean;
  address: string;
  showAddress?: boolean;
  search?: string;
  currentLat: string;
  currentLng: string;
  forceRefresh?: number;
}

export default function UploadForm({
  route,
  navigation,
}: ScreenProps<"UploadForm">) {
  const latitudeDelta = 0.025;
  const longitudeDelta = 0.025;
  const [marker, setMarker] = useState<Marker>();
  const [mapData, setMapData] = useState<ImapData>({
    region: {
      latitudeDelta,
      longitudeDelta,
      latitude: 12.840575,
      longitude: 77.651787,
    },
    listViewDisplayed: true,
    address: "",
    showAddress: false,
    search: "",
    currentLat: "",
    currentLng: "",
    forceRefresh: 0,
  });
  const { register, handleSubmit, setValue, getValues, watch } = useForm();
  const onValid = () => {};

  const mapViewRef = useRef<MapView>(null);
  const googlePlacesAutocomplete = useRef<GooglePlacesAutocompleteRef>(null);
  const goToInitialLocation = (region: ImapData["region"]) => {
    let initialRegion = Object.assign({}, region);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    mapViewRef.current?.animateToRegion(initialRegion, 2000);
  };
  const onRegionChange = (region: Region) => {
    setMapData(getCurrentAddress => ({
      ...region,
      forceRefresh: Math.floor(Math.random() * 100),
      ...getCurrentAddress, //callback
    }));
  };
  useEffect(() => {
    register("title");
  }, [register]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      await Location.installWebGeolocationPolyfill();
      // googlePlacesAutocomplete.current?.getCurrentPosition(location);
      setMapData(prev => ({
        ...prev,
        region: {
          ...prev.region,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      }));
    })();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     // await googlePlacesAutocomplete.current?.getCurrentLocation();
  //     console.log("workd");
  //   })();
  // }, [googlePlacesAutocomplete.current]);
  return (
    <DismissKeyboard>
      <Container>
        <InputContainer>
          {route.params?.file && (
            <Photo resizeMode="contain" source={{ uri: route.params.file }} />
          )}
          <TitleContainer>
            <Title
              returnKeyType="done"
              placeholder="Coffeshop name"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              onSubmitEditing={handleSubmit(onValid)}
              onChangeText={text => setValue("title", text)}
            />
          </TitleContainer>
          <GooglePlacesAutocomplete
            // currentLocation={true}
            ref={googlePlacesAutocomplete}
            styles={{
              listView: { position: "absolute", zIndex: 9999 },
            }}
            placeholder="Search"
            fetchDetails={true}
            onPress={(data, details) => {
              // 'details' is provided when fetchDetails = true
              setMapData({
                region: {
                  latitudeDelta,
                  longitudeDelta,
                  latitude: details?.geometry.location.lat as number,
                  longitude: details?.geometry.location.lng as number,
                },
                listViewDisplayed: false,
                address: data.description,
                currentLat: "" + details?.geometry.location.lat,
                currentLng: "" + details?.geometry.location.lng,
              });
            }}
            query={{
              key: "AIzaSyAmTLi1sfmKXS9Hvi6hi4_6G_eSrFSAbdo",
              language: "ko",
            }}
          />
        </InputContainer>
        <MapView style={styles.map} provider={PROVIDER_GOOGLE} {...mapData}>
          <Marker
            coordinate={{
              latitude: mapData.region.latitude,
              longitude: mapData.region.longitude,
            }}
            title={watch("title")}
            description={mapData.address}
          />
        </MapView>
      </Container>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
});
