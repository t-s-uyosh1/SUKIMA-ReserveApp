import { createClient } from "@supabase/supabase-js";
import AsyncStorage from '@react-native-async-storage/async-storage'
export const supabase = createClient(
  "https://sfzdciwgmlhzygxaqiia.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTczNTg1MiwiZXhwIjoxOTUxMzExODUyfQ.BMjw6un4s6drI0SlJXvBe462U2vAsahSe1Ke_-tue1w",
  {localStorage:AsyncStorage}
);
