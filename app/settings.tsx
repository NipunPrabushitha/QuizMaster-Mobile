import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  SlideInDown,
  SlideInLeft
} from 'react-native-reanimated';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [user, isLoading]);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const getUserInitials = (email: string) => {
    // Get first two characters from the email address
    return email.slice(0, 2).toUpperCase();
  };

  // Show loading or return null while checking auth
  if (isLoading || !user) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#ffffff', fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        {/* Logo Header */}
        <Animated.View 
          entering={FadeIn.delay(100).duration(600)}
          className="items-center pb-6"
          style={{ paddingTop: 60 }}
        >
          <Image
            source={require("../assets/images/ui/QUIZ-MASTER-8-31-2025(2).png")}
            style={{ width: 300, height: 120, resizeMode: 'contain' }}
          />
        </Animated.View>

        {/* Header Section */}
        <Animated.View 
          entering={SlideInDown.delay(200).duration(600)}
          className="px-6 mb-8"
        >
          <Text className="text-3xl font-bold text-center mb-2" style={{ color: '#ffffff' }}>
            Settings
          </Text>
          <Text className="text-lg text-center" style={{ color: '#b0b0b0' }}>
            Customize your Quiz Master experience
          </Text>
        </Animated.View>

        {/* Profile Section */}
        <Animated.View 
          entering={FadeIn.delay(300).duration(500)}
          className="px-6 mb-8"
        >
          <Animated.View 
            className="rounded-xl p-6" 
            style={{ backgroundColor: '#2a2a2a' }}
          >
            <View className="flex-row items-center">
              <View 
                className="w-16 h-16 rounded-full items-center justify-center mr-4" 
                style={{ backgroundColor: '#4CAF50' }}
              >
                <Text className="text-white text-2xl font-bold">
                  {user ? getUserInitials(user.email || '') : 'U'}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold" style={{ color: '#ffffff' }}>
                  {user ? user.email?.split('@')[0] : 'Quiz Master'}
                </Text>
                <Text style={{ color: '#b0b0b0' }}>
                  {user ? user.email : 'Level 5 • 1,250 Points'}
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={{ color: '#4CAF50', fontSize: 16, fontWeight: '600' }}>Edit</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>

        {/* App Settings */}
        <Animated.View 
          entering={SlideInLeft.delay(400).duration(600)}
          className="px-6 mb-8"
        >
          <Text className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>App Settings</Text>
          
          <View className="rounded-xl" style={{ backgroundColor: '#2a2a2a' }}>
            {/* Notifications */}
            <View className="flex-row items-center justify-between p-4 border-b" style={{ borderBottomColor: '#404040' }}>
              <View className="flex-row items-center flex-1">
                <Text className="text-2xl mr-3">🔔</Text>
                <View>
                  <Text className="text-lg font-medium" style={{ color: '#ffffff' }}>Notifications</Text>
                  <Text style={{ color: '#b0b0b0', fontSize: 14 }}>Get reminders and updates</Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#404040', true: '#4CAF50' }}
                thumbColor={notifications ? '#ffffff' : '#808080'}
              />
            </View>

            {/* Sound Effects */}
            <View className="flex-row items-center justify-between p-4 border-b" style={{ borderBottomColor: '#404040' }}>
              <View className="flex-row items-center flex-1">
                <Text className="text-2xl mr-3">🔊</Text>
                <View>
                  <Text className="text-lg font-medium" style={{ color: '#ffffff' }}>Sound Effects</Text>
                  <Text style={{ color: '#b0b0b0', fontSize: 14 }}>Play sounds for interactions</Text>
                </View>
              </View>
              <Switch
                value={soundEffects}
                onValueChange={setSoundEffects}
                trackColor={{ false: '#404040', true: '#4CAF50' }}
                thumbColor={soundEffects ? '#ffffff' : '#808080'}
              />
            </View>

            {/* Dark Mode */}
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center flex-1">
                <Text className="text-2xl mr-3">🌙</Text>
                <View>
                  <Text className="text-lg font-medium" style={{ color: '#ffffff' }}>Dark Mode</Text>
                  <Text style={{ color: '#b0b0b0', fontSize: 14 }}>Switch to dark theme</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#404040', true: '#4CAF50' }}
                thumbColor={darkMode ? '#ffffff' : '#808080'}
              />
            </View>
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View 
          entering={FadeIn.delay(500).duration(500)}
          className="px-6 mb-8"
        >
          <Text className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>Quick Actions</Text>
          
          <View className="rounded-xl" style={{ backgroundColor: '#2a2a2a' }}>
            <TouchableOpacity className="flex-row items-center p-4 border-b" style={{ borderBottomColor: '#404040' }}>
              <Text className="text-2xl mr-3">📊</Text>
              <View className="flex-1">
                <Text className="text-lg font-medium" style={{ color: '#ffffff' }}>View Statistics</Text>
                <Text style={{ color: '#b0b0b0', fontSize: 14 }}>Check your progress</Text>
              </View>
              <Text style={{ color: '#808080' }}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4 border-b" style={{ borderBottomColor: '#404040' }}>
              <Text className="text-2xl mr-3">❓</Text>
              <View className="flex-1">
                <Text className="text-lg font-medium" style={{ color: '#ffffff' }}>Help & Support</Text>
                <Text style={{ color: '#b0b0b0', fontSize: 14 }}>Get help when needed</Text>
              </View>
              <Text style={{ color: '#808080' }}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4">
              <Text className="text-2xl mr-3">ℹ️</Text>
              <View className="flex-1">
                <Text className="text-lg font-medium" style={{ color: '#ffffff' }}>About</Text>
                <Text style={{ color: '#b0b0b0', fontSize: 14 }}>App info and version</Text>
              </View>
              <Text style={{ color: '#808080' }}>›</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Logout Button */}
        <Animated.View 
          entering={FadeIn.delay(600).duration(500)}
          className="px-6 mb-8"
        >
          <TouchableOpacity onPress={handleLogout}>
            <View 
              className="rounded-2xl p-4"
              style={{ backgroundColor: '#FF5252' }}
            >
              <Text className="text-white text-xl font-bold text-center">Logout</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer */}
        <View className="items-center pb-6">
          <Text style={{ color: '#808080', fontSize: 14 }}>Developed by Prabu</Text>
          <Text style={{ color: '#606060', fontSize: 12, marginTop: 4 }}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
