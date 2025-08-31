
import FooterNav from "@/components/FooterNav";
import { Slot } from "expo-router";
import React, { createContext, useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
      <SafeAreaView className="flex-1">
        <Slot />
        {/* Show footer only after Get Started is clicked */}
        {showFooter ? <FooterNav /> : null}
      </SafeAreaView>
    </FooterContext.Provider>
  );
};

export default Layout;

