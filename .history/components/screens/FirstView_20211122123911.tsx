import { View,StyleSheet, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { StackNavigationProp } from "@react-navigation/stack";
import { User } from "@supabase/gotrue-js";
 type Props = {
    navigation: StackNavigationProp<any>;
};

const FirstView = ({ navigation }:Props) => {
  const [userData, addUserData] = useState<User | {}>({})
  useEffect(() => {
    const user: User | null = supabase.auth.user()
    if (user) {
      addUserData(user)
      console.log
    } else {
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "LogIn" }],
      // });
      Alert.alert("ログインしてません")
    }
  })
    return(
        <View>

        </View>
    )
}

const styles = StyleSheet.create({

});

export default FirstView
