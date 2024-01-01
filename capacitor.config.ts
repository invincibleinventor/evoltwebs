import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.evolt",
  appName: "Evolt",
  webDir: "public",
  server: {
    androidScheme: "https",
  },
};

export default config;
