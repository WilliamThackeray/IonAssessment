import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  useColorScheme,
  ActivityIndicator,
  Image,
} from "react-native";

import React, { useEffect, useState } from "react";

import Section from "@/components/Section";
import { EpisodeList } from "@/components/EpisodeList";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { BASE_URL, RAPIDAPI_HOST, RAPIDAPI_KEY } from "@/env";

type HomeScreenProps = {
  showId: string;
};

export default function HomeScreen(props: HomeScreenProps) {
  const [isLoading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(true);
  const [showTitle, setShowTitle] = useState("");

  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const url = `${BASE_URL}/titles/${props.showId}?info=image`;
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": RAPIDAPI_HOST,
          },
        };

        const response = await fetch(url, options);
        const results = await response.json();

        setShowImage(results.results);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchShowData = async () => {
      try {
        const url = `${BASE_URL}/titles/${props.showId}?info=mini_info`;
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": RAPIDAPI_HOST,
          },
        };

        const response = await fetch(url, options);
        const results = await response.json();

        setShowTitle(results.results.titleText.text);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageData();
    fetchShowData();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <StatusBar
            barStyle={isDarkMode ? "light-content" : "dark-content"}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Section title={`${showTitle} Wiki`}></Section>
          <EpisodeList id={props.showId} bgImage={showImage.primaryImage.url} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});
