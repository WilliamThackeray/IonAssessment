import React from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  ImageBackground,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import { BASE_URL, RAPIDAPI_HOST, RAPIDAPI_KEY } from "@/env";

import EpisodeListItem from "./EpisodeListItem";

type EpisodeId = {
  id: string;
  bgImage: string;
};

type EpisodeItem = {
  id: string;
  ep: number;
  se: number;
};

type EpisodeData = {
  tconst: string;
  episodeNumber: number;
  seasonNumber: number;
};

export function EpisodeList(props: EpisodeId) {
  const [episodeList, setEpisodeList] = useState<EpisodeItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${BASE_URL}/titles/series/${props.id}`;
        const options = {
          method: "GET",
          headers: {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": RAPIDAPI_HOST,
          },
        };

        const response = await fetch(url, options);
        const seasonsData = await response.json();

        await listSetup(seasonsData.results);
      } catch (error) {
        console.error("Error fetching seasons:", error);
      }
    };

    fetchData();
  }, []);

  async function listSetup(episodes: EpisodeData[]) {
    let s: EpisodeItem[] = [];
    for (let episode of episodes) {
      s.push({
        id: episode.tconst,
        ep: episode.episodeNumber,
        se: episode.seasonNumber,
      });
    }
    setEpisodeList(s);
  }

  return (
    <View style={{ paddingBottom: 165 }}>
      <ImageBackground source={{ uri: props.bgImage }} style={styles.bgImage}>
        <FlatList
          data={episodeList}
          renderItem={({ item }) => (
            <EpisodeListItem id={item.id} se={item.se} ep={item.ep} />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  bgImage: {
    opacity: 1,
  },
  text: {
    backgroundColor: "#000000c0",
  },
});
