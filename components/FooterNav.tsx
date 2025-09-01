import { useRouter, useSegments } from "expo-router";
import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const tabs = [
  { label: "Home", path: "/home", icon: "home-variant-outline", activeIcon: "home-variant" },
  { label: "Notes", path: "/notes", icon: "notebook-outline", activeIcon: "notebook" },
  { label: "Settings", path: "/settings", icon: "cog-outline", activeIcon: "cog" },
] as const;

const FooterNav = () => {
  const router = useRouter();
  const segment = useSegments();
  const activeRouter = "/" + (segment[0] || "");
  const { width } = Dimensions.get("window");

  return (
    <View style={[styles.footer, { width }]}> 
      {tabs.map((tab, idx) => {
        const isActive = tab.path === activeRouter;
        return (
          <Pressable
            key={tab.path}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => router.push(tab.path)}
          >
            <Icon
              name={isActive ? tab.activeIcon : tab.icon}
              size={22}
              color={isActive ? "#ffffff" : "#808080"}
              style={{ marginBottom: 1 }}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    width: '85%',
    alignSelf: 'center',
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 15,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: "#404040",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 4,
    backgroundColor: "transparent",
  },
  activeTab: {
    backgroundColor: "#4CAF50",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
});

export default FooterNav;
