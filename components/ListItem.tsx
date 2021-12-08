import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";

type Reserve = {
  name: string;
  date: Date;
  check: boolean;
  time: string;
  id: number;
};

const ListItem = ({ name, check, time, date, id }: Reserve) => {
  const [state, changeState] = useState<boolean>(check);
  const toggleCheckbox = async () => {
    const { data, error } = await supabase
      .from("rese_t")
      .update({ r_state: !state })
      .match({ id });
    if (data) {
      changeState(!state);
    }
    if (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.listContainer}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => {
          //supabaseのstateの値を書き換える処理
          toggleCheckbox();
        }}
      >
        {state && <AntDesign name="check" size={20} color="black" />}
      </TouchableOpacity>
      <View style={styles.nameBox}>
        <Text style={styles.textFont}>{name}</Text>
      </View>
      <View style={styles.timeBox}>
        <Text style={styles.textFont}>{time}</Text>
      </View>
      <View style={styles.dateBox}>
        <Text style={styles.textFont}>{date}</Text>
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
  textFont: {
    fontSize: 18,
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
  },
  dateBox: {
    flex: 1,
  },
});

export default ListItem;
