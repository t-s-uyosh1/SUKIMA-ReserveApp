import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const ListHeader = () => {
  return (
    <View style={styles.listContainer}>
      <View style={styles.checkbox}></View>
      <View style={styles.nameBox}>
        <Text style={styles.text}>名前</Text>
      </View>
      <View style={styles.timeBox}>
        <Text style={styles.text}>時間</Text>
      </View>
      <View style={styles.dateBox}>
        <Text style={styles.text}>日付</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderBottomWidth: 2,
    height: 50,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 32,
    textAlign: "center",
  },
  checkbox: {
    width: 30,
    alignItems: "center",
  },
  nameBox: {
    flex: 1,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#111111",
  },
  timeBox: {
    flex: 1,
    borderRightWidth: 2,
    borderColor: "#111111",
  },
  dateBox: {
    flex: 1,
  },
});

export default ListHeader;
