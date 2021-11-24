import { View,StyleSheet } from "react-native"
import React, { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import { StackNavigationProp } from "@react-navigation/stack";
 type Props = {
    navigation: StackNavigationProp<any>;
};

const FirstView = ({ navigation }:Props) => {
  const [userData,addUserData] = useState({})
  useEffect(() => {
    const user = supabase.auth.user()
    if (user) {
      addUserData(user)
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "LogIn" }],
      });
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
