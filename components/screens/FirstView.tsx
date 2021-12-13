import Button from "../Button";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { StackNavigationProp } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import { User } from "@supabase/gotrue-js";
import ListItem from "../ListItem";
import ListHeader from "../ListHeader";
import "react-native-url-polyfill/auto";
import { NavigationContainer } from "@react-navigation/native";

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
  const getDatetime = (dt: Date) => {
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth() + 1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    return y + "-" + m + "-" + d;
  };

  const fetchrese = async () => {
    const { data: rese_list, error } = await supabase
      .from("rese_t")
      .select("*")
      //古い順にソート
      .order("r_day", { ascending: false });
    if (error) {
      Alert.alert(error.message);
    }
    if (rese_list) {
      addList(rese_list);
    }
  };
  //セレクト(今日の日付)
  const todaysfecth = async () => {
    const { data: resetodayslist, error } = await supabase
      .from("rese_t")
      .select("*")
      .order("r_day", { ascending: false })
      .eq("r_day", getDatetime(new Date()));
    //セレクトしたものを入れる
    if (resetodayslist) {
      // console.log("-------------------------------");
      // console.log(resetodayslist);
      addList(resetodayslist);
    }
    if (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchrese();
    todaysfecth();
  }, []);

  const [userData, addUserData] = useState<User | {}>({});
  const [listData, addList] = useState<reserveList | []>([]);
  useEffect(() => {
    const user: User | null = supabase.auth.user();
    if (user) {
      addUserData(user);
      todaysfecth();
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "LogIn" }],
      });
      //Alert.alert());
    }
  }, []);
  const handlePress = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LogIn" }],
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
      <View style={styles.buttonPositon}>
        <Button
          label="BACK"
          onPress={() => {
            handlePress();
          }}
        />
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
  buttonPositon: {
    padding: 10,
    position: "relative",
    left: 0,
    bottom: 0,
  },
});

export default FirstView;
