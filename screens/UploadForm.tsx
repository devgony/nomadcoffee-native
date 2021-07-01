import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { useState } from "react";
import { useRef } from "react";
import * as Location from "expo-location";
import { gql, MutationUpdaterFn, useMutation } from "@apollo/client";
import {
  createCoffeeShop,
  createCoffeeShopVariables,
} from "../__generated__/createCoffeeShop";
import { ReactNativeFile } from "apollo-upload-client";

const CREATE_COFFEE_SHOP = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $photos: [Upload]
    $categories: [String]!
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photos: $photos
      categories: $categories
    ) {
      ok
      error
      id
    }
  }
`;

const Container = styled.View`
  background-color: black;
  justify-content: space-between;
`;
const InputContainer = styled.View`
  height: 230px;
  padding: 0px 50px;
  z-index: 1;
`;
const Photo = styled.Image`
  height: 50px;
`;
const TitleContainer = styled.View`
  margin-top: 30px;
`;
const Title = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
  margin-bottom: 10px;
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

interface IForm {
  title: string;
  category: string;
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
  const updateCreateCoffeeShop: MutationUpdaterFn<createCoffeeShop> = (
    cache,
    result
  ) => {
    if (result.data?.createCoffeeShop?.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev) {
            return [result.data?.createCoffeeShop, ...prev];
          },
        },
      });
      navigation.navigate("Home");
    }
  };
  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<IForm>();
  const [createCoffeeShop, { data, loading, error }] = useMutation<
    createCoffeeShop,
    createCoffeeShopVariables
  >(CREATE_COFFEE_SHOP, {
    update: updateCreateCoffeeShop,
  });
  const onValid: SubmitHandler<IForm> = data => {
    const file = new ReactNativeFile({
      uri: route.params?.file,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    createCoffeeShop({
      variables: {
        name: data.title,
        latitude: "" + mapData.region.latitude,
        longitude: "" + mapData.region.longitude,
        photos: [file],
        categories: [data.category],
      },
    });
  };
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  useEffect(() => {
    console.log(watch("title"), watch("category"));
    if (watch("title") && watch("category")) {
      navigation.setOptions({
        headerRight: loading ? HeaderRightLoading : HeaderRight,
        ...(loading && { headerLeft: () => null }),
      });
    } else {
      navigation.setOptions({
        headerRight: undefined,
      });
    }
  }, [watch("title") && watch("category"), loading]);
  const categoryRef = useRef(null);
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
    register("title", { required: true });
    register("category", { required: true });
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
  const onNext = (nextOne: React.RefObject<any>) => {
    nextOne?.current?.focus();
  };
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  return (
    <DismissKeyboard>
      <Container>
        <InputContainer>
          {route.params?.file && (
            <Photo resizeMode="contain" source={{ uri: route.params.file }} />
          )}
          <TitleContainer>
            <Title
              autoCapitalize="none"
              returnKeyType="next"
              placeholder="Coffeshop name"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              onSubmitEditing={() => onNext(categoryRef)}
              onChangeText={text => setValue("title", text)}
            />
            <Title
              autoCapitalize="none"
              ref={categoryRef}
              returnKeyType="done"
              placeholder="category"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              onSubmitEditing={handleSubmit(onValid)}
              onChangeText={text => setValue("category", text)}
            />
          </TitleContainer>
          <GooglePlacesAutocomplete
            // currentLocation={true}
            ref={googlePlacesAutocomplete}
            styles={{
              listView: { position: "absolute", zIndex: 9999, top: 50 },
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
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
});
