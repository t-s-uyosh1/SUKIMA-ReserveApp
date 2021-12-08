import Button from "../Button";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { StackNavigationProp } from "@react-navigation/stack";
import { User } from "@supabase/gotrue-js";
import ListItem from "../ListItem";
import ListHeader from "../ListHeader";
import "react-native-url-polyfill/auto";

type Props = {
  navigation: StackNavigationProp<any>;
};

type reserveList = {
  r_state: boolean;
  r_day: Date;
  id: number;
  r_name: string;
  r_nin: number;
  r_time: string;
}[];

const FirstView = ({ navigation }: Props) => {
  //古い順にソート
  const fetchrese = async () => {
    const { data: rese_list, error } = await supabase
      .from("rese_t")
      .select("*")
      .order("r_day", { ascending: false });
    if (error) {
      Alert.alert(error.message);
    }
    if (rese_list) {
      addList(rese_list);
    }
  };
  useEffect(() => {
    fetchrese();
  }, []);

  const [userData, addUserData] = useState<User | {}>({});
  const [listData, addList] = useState<reserveList | []>([]);
  useEffect(() => {
    const user: User | null = supabase.auth.user();
    if (user) {
      addUserData(user);
      //セレクト(今日の日付)
      //セレクトしたものを入れる
    } else {
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "LogIn" }],
      // });
      //Alert.alert("ログインしてません")
    }
  }, []);
  const handlePress = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LogInScreen" }],
    });
  };
  return (
    <ScrollView style={styles.container}>
      <ListHeader />
      {listData.map((item) => {
        return (
          <ListItem
            id={item.id}
            check={item.r_state}
            name={item.r_name}
            time={item.r_time}
            date={item.r_day}
            key={item.id}
          />
        );
      })}
      <View style={styles.button}>
        {/* <Button
          label="BACK"
          onPress={() => {
            handlePress();
          }}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderColor: "#dddddd",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  button: {
    width: 30,
    height: 30,
    position: "relative",
    bottom: 0,
    left: 0,
    display: "flex",
  },
});

export default FirstView;
