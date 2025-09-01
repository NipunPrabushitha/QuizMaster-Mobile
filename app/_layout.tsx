
import FooterNav from "@/components/FooterNav";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { createContext, useContext, useState } from "react";
import { View } from "react-native";
import "./../global.css";

// Context to control footer visibility
const FooterContext = createContext({
  showFooter: false,
  setShowFooter: (val: boolean) => {},
});

export const useFooter = () => useContext(FooterContext);

const Layout = () => {
  const [showFooter, setShowFooter] = useState(false);

  return (
    <FooterContext.Provider value={{ showFooter, setShowFooter }}>
      <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
        <StatusBar style="light" backgroundColor="#1a1a1a" translucent={false} />
        <Slot />
        {/* Show footer only after Get Started is clicked */}
        {showFooter ? <FooterNav /> : null}
      </View>
    </FooterContext.Provider>
  );
};

export default Layout;

