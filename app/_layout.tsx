
import FooterNav from "@/components/FooterNav";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Slot, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { createContext, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import "./../global.css";

// Context to control footer visibility
const FooterContext = createContext({
  showFooter: false,
  setShowFooter: (val: boolean) => {},
});

export const useFooter = () => useContext(FooterContext);

const LayoutContent = () => {
  const [showFooter, setShowFooter] = useState(false);
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  
  // Define routes where footer should be shown
  const footerRoutes = ['home', 'notes', 'settings'];
  const currentRoute = segments[0] || '';

  // Show footer only on authenticated pages and specific routes
  useEffect(() => {
    const shouldShowFooter = !isLoading && !!user && footerRoutes.includes(currentRoute);
    setShowFooter(shouldShowFooter);
  }, [user, isLoading, currentRoute]);

  return (
    <FooterContext.Provider value={{ showFooter, setShowFooter }}>
      <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
        <StatusBar style="light" backgroundColor="#1a1a1a" translucent={false} />
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
        {/* Show footer only on specific authenticated routes */}
        {showFooter && <FooterNav />}
      </View>
    </FooterContext.Provider>
  );
};

const Layout = () => {
  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
};

export default Layout;

