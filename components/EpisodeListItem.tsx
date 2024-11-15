import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  useColorScheme,
  Modal,
  Pressable,
  View,
  Alert,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import SeasonsScreen from "./EpisodeScreen";

type SeasonsListItemProps = {
  id: string;
  se: number;
  ep: number;
};

function EpisodeListItem(props: SeasonsListItemProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, backgroundStyle]}>
            <View style={styles.closeButton}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>{"<"} Home</Text>
              </Pressable>
            </View>
            <View style={{ marginTop: 90 }}>
              <SeasonsScreen se={props.se} ep={props.ep} id={props.id} />
            </View>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text
          style={[
            styles.item,
            {
              color: isDarkMode ? Colors.white : Colors.black,
              backgroundColor: isDarkMode ? "#000000c0" : "#ffffffc0",
            },
          ]}
        >
          Seasons {props.se}, Episode {props.ep}
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    borderBlockColor: "#1f1f1f",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#000000c0",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    marginBottom: 0,
    width: "100%",
    height: "92%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: "1f1f1f",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    padding: 10,
  },
});

export default EpisodeListItem;
