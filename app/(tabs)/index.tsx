import { StyleSheet, View, Text } from "react-native";

import React from "react";

import HomeScreen from "@/components/HomeScreen";

export default function App() {
  return (
    <>
      {/* Choose what show you want to view. You can get the show id from IMBD. It's in the URL and starts with 'tt' followed by numbers. */}
      <HomeScreen showId="tt0386676" />
    </>
  );
}
