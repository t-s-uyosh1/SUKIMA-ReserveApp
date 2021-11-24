import { View,StyleSheet } from "react-native"
import React, { useEffect } from "react"
import { supabase } from "../../lib/supabase"
const FirstView = () => {
  useEffect(() => {
    const user = supabase.auth.user()
  })
    return(
        <View>

        </View>
    )
}

const styles = StyleSheet.create({

});

export default FirstView
