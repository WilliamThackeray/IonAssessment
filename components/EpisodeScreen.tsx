import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  useColorScheme,
  View,
  Image,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { BASE_URL, RAPIDAPI_HOST, RAPIDAPI_KEY } from "@/env";

type EpisodeScreenProps = {
  se: number;
  ep: number;
  id: string;
};

export default function EpisodeScreen(props: EpisodeScreenProps) {
  const isDarkMode = useColorScheme() === "dark";
  const [isLoading, setLoading] = useState(true);
  const [epData, setEpData] = useState({});

  const fetchData = async () => {
    // todo:  fetch episode data using the id
    try {
      const url = `${BASE_URL}/titles/episode/${props.id}?info=base_info`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-host": RAPIDAPI_HOST,
          "x-rapidapi-key": RAPIDAPI_KEY,
        },
      };

      const response = await fetch(url, options);
      const episodeData = await response.json();

      setEpData(episodeData.results);
    } catch (error) {
      console.error("Error fetching episode data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function month(num: number) {
    switch (num) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Invalid month";
    }
  }

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text
            style={[
              styles.heading,
              { color: isDarkMode ? Colors.white : Colors.black },
            ]}
          >
            Episode Name: {JSON.stringify(epData.titleText.text)}
          </Text>
          <Image
            style={{
              width: 300,
              height: 168.6,
            }}
            source={{ uri: epData.primaryImage.url }}
            resizeMode={"cover"}
          />
          <Text
            style={[
              styles.text,
              styles.info,
              { color: isDarkMode ? Colors.white : Colors.black },
            ]}
          >
            {epData.plot.plotText.plainText}
          </Text>
          <Text
            style={[
              styles.text,
              { color: isDarkMode ? Colors.white : Colors.black },
            ]}
          >
            Release Date: {month(epData.releaseDate.month)}{" "}
            {epData.releaseDate.day}, {epData.releaseDate.year}
          </Text>
          <Text
            style={[
              styles.text,
              { color: isDarkMode ? Colors.white : Colors.black },
            ]}
          >
            Runtime: {Math.floor(epData.runtime.seconds / 60)} minutes
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
  },
  info: {
    fontSize: 21,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
});
