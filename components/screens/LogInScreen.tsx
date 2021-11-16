import { StackNavigationProp } from "@react-navigation/stack";
import Button from "../Button";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
  } from "react-native";
import React,{ useState } from "react";

  type Props = {
    navigation: StackNavigationProp<any>;
  };

const LogInScreen = ({navigation}:Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
    return(
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
          <Button label="Submit" onPress={()=>{}} />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Not registered?</Text>
            <TouchableOpacity
              onPress={() => {
                
              }}
            >
              <Text style={styles.fotterLink}>Sign up here!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>   
    )
}

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

export default LogInScreen