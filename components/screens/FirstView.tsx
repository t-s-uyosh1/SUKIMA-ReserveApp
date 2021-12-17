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
import React, { useEffect, useState, useCallback } from "react";
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
  shop_id: string;
}[];

const sleep = (msec: any) =>
  new Promise((resolve) => setTimeout(resolve, msec));

const FirstView = ({ navigation }: Props) => {
  //supabaseからデータ習得行う処理
  const fetchrese = async () => {
    const { data: rese_list, error } = await supabase
      .from("rese_t")
      .select("*")
      .order("r_day", { ascending: false });
    if (rese_list) {
      addList(rese_list);
    }
    if (error) {
      Alert.alert(error.message);
    }
  };

  //今日日付を取得する
  const getDatetime = (dt: Date) => {
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth() + 1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    return y + "-" + m + "-" + d;
  };

  // リロード処理　更新処理を行っているかどうか
  const [refreshing, setRefreshing] = useState(false);
  // 任意の更新処理
  const anyFunction = useCallback(async () => {
    setRefreshing(true);
    // 非同期処理(実際にはここでデータの更新を行う)
    await sleep(1000);
    setRefreshing(false);
    //再取得をおこなう
    //todaysfecth();
    fetchrese();
  }, []);

  // useEffect(() => {
  // fetchrese();
  // }, []);

  const [userData, addUserData] = useState<User | {}>({});
  const [listData, addList] = useState<reserveList | []>([]);
  useEffect(() => {
    const user: User | null = supabase.auth.user();
    if (user) {
      addUserData(user);
      //セレクト(今日の日付)
      const todaysfecth = async () => {
        const { data: resetodayslist, error } = await supabase
          .from("rese_t")
          .select("*")
          .match({ shop_id: user.id })
          .eq("r_day", getDatetime(new Date()))
          .order("r_day", { ascending: false });
        //セレクトしたものをリストに入れる
        if (resetodayslist) {
          //console.log(resetodayslist);
          addList(resetodayslist);
        }
        if (error) {
          console.log(error.message);
        }
      };
      todaysfecth();
      // console.log("----------------");
      // console.log(user.id);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "LogIn" }],
      });
      //Alert.alert("ログインできていません");
    }
  }, []);

  //ボタンを押したらの処理
  const handlePress = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LogIn" }],
    });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={anyFunction} />
      }
    >
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
      <Text>下に引っ張るとリロードするよ</Text>
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
