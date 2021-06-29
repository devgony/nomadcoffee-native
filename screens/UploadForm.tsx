import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { ScreenProps } from "../types/screen";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState } from "react";
import { useRef } from "react";

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 50px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
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
  const { register, handleSubmit, setValue } = useForm();
  const onValid = () => {};
  useEffect(() => {
    register("title");
  }, [register]);

  const mapViewRef = useRef<MapView>(null);
  const goToInitialLocation = (mapData: ImapData["region"]) => {
    let initialRegion = Object.assign({}, mapData);
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
  return (
    <DismissKeyboard>
      <Container>
        {route.params?.file && (
          <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        )}
        <CaptionContainer>
          <Title
            returnKeyType="done"
            placeholder="Title"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={text => setValue("title", text)}
          />
        </CaptionContainer>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details) => {
            // 'details' is provided when fetchDetails = true
            console.log(details);
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
        <MapView
          ref={mapViewRef}
          onMapReady={() => goToInitialLocation(mapData.region)}
          initialRegion={mapData.region}
          onRegionChangeComplete={onRegionChange}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          {...mapData}
        />
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
    width: Dimensions.get("window").width - 500,
    height: Dimensions.get("window").height - 400,
  },
});
