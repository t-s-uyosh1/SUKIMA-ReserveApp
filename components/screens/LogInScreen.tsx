import { StackNavigationProp } from "@react-navigation/stack";
import Button from "../Button";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import * as ScreenOrientation from "expo-screen-orientation";

type Props = {
  navigation: StackNavigationProp<any>;
};

const LogInScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "FirstView" }],
      });
    }
    async function unlockOrientation() {
      await ScreenOrientation.unlockAsync();
    }
    unlockOrientation();
  }, []);
  const handlePress = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "FirstView" }],
      });
    }
    if (error) {
      console.log(error.message);
      console.log(error.status);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "FirstView" }],
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <TextInput
          value={password}
          style={styles.input}
          onChangeText={(text) => {
            setPassword(text);
          }}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <Button
          label="Submit"
          onPress={() => {
            handlePress();
          }}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <Text
            style={styles.fotterLink}
            onPress={() => {
              Linking.openURL("https://sukimaform.vercel.app/form");
            }}
          >
            Sign up here!
          </Text>
        </View>
      </View>
    </View>
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

  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  fotterLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467fd3",
  },
  footer: {
    flexDirection: "row",
  },
});

export default LogInScreen;
