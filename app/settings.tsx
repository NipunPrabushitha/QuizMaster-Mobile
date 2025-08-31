import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <LinearGradient
      colors={["#ffffffff", "#d49777ff"]}
      style={{ flex: 1 }}
    >
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        {/* Logo Header */}
        <View className="items-center pt-8 pb-6">
          <Image
            source={require("../assets/images/ui/QUIZ-MASTER-8-31-2025(2).png")}
            style={{ width: 300, height: 120, resizeMode: 'contain' }}
          />
        </View>

        {/* Header Section */}
        <View className="px-6 mb-8">
          <Text className="text-3xl font-bold text-center mb-2" style={{ color: '#0404a5ff' }}>
            Settings
          </Text>
          <Text className="text-lg text-center text-gray-600">
            Customize your Quiz Master experience
          </Text>
        </View>

        {/* Profile Section */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-bold mb-4" style={{ color: '#0404a5ff' }}>Profile</Text>
          <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <View className="flex-row items-center">
              <View className="w-16 h-16 rounded-full items-center justify-center mr-4" style={{ backgroundColor: '#0404a5ff' }}>
                <Text className="text-white text-2xl font-bold">U</Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold" style={{ color: '#0404a5ff' }}>Quiz Master</Text>
                <Text className="text-gray-600">Level 5 • 1,250 XP</Text>
              </View>
              <TouchableOpacity>
                <Text style={{ color: '#FF6100' }}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* App Settings */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-bold mb-4" style={{ color: '#0404a5ff' }}>App Settings</Text>
          
          <View className="bg-white rounded-xl shadow-sm">
            {/* Notifications */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center flex-1">
                <Text className="text-2xl mr-3">🔔</Text>
                <View>
                  <Text className="text-lg font-medium" style={{ color: '#0404a5ff' }}>Notifications</Text>
                  <Text className="text-gray-600 text-sm">Get reminders and updates</Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#e5e7eb', true: '#FFDA09' }}
                thumbColor={notifications ? '#0404a5ff' : '#9ca3af'}
              />
            </View>

            {/* Sound Effects */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center flex-1">
                <Text className="text-2xl mr-3">🔊</Text>
                <View>
                  <Text className="text-lg font-medium" style={{ color: '#0404a5ff' }}>Sound Effects</Text>
                  <Text className="text-gray-600 text-sm">Play sounds for interactions</Text>
                </View>
              </View>
              <Switch
                value={soundEffects}
                onValueChange={setSoundEffects}
                trackColor={{ false: '#e5e7eb', true: '#FFDA09' }}
                thumbColor={soundEffects ? '#0404a5ff' : '#9ca3af'}
              />
            </View>

            {/* Dark Mode */}
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center flex-1">
                <Text className="text-2xl mr-3">🌙</Text>
                <View>
                  <Text className="text-lg font-medium" style={{ color: '#0404a5ff' }}>Dark Mode</Text>
                  <Text className="text-gray-600 text-sm">Switch to dark theme</Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#e5e7eb', true: '#FFDA09' }}
                thumbColor={darkMode ? '#0404a5ff' : '#9ca3af'}
              />
            </View>
          </View>
        </View>

        {/* Other Options */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-bold mb-4" style={{ color: '#0404a5ff' }}>More</Text>
          
          <View className="bg-white rounded-xl shadow-sm">
            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
              <Text className="text-2xl mr-3">📊</Text>
              <View className="flex-1">
                <Text className="text-lg font-medium" style={{ color: '#0404a5ff' }}>Statistics</Text>
                <Text className="text-gray-600 text-sm">View your progress</Text>
              </View>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
              <Text className="text-2xl mr-3">❓</Text>
              <View className="flex-1">
                <Text className="text-lg font-medium" style={{ color: '#0404a5ff' }}>Help & Support</Text>
                <Text className="text-gray-600 text-sm">Get help and contact us</Text>
              </View>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
              <Text className="text-2xl mr-3">🔒</Text>
              <View className="flex-1">
                <Text className="text-lg font-medium" style={{ color: '#0404a5ff' }}>Privacy Policy</Text>
                <Text className="text-gray-600 text-sm">Read our privacy policy</Text>
              </View>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center p-4">
              <Text className="text-2xl mr-3">ℹ️</Text>
              <View className="flex-1">
                <Text className="text-lg font-medium" style={{ color: '#0404a5ff' }}>About</Text>
                <Text className="text-gray-600 text-sm">App version and info</Text>
              </View>
              <Text className="text-gray-400">›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <View className="px-6 mb-8">
          <TouchableOpacity>
            <LinearGradient
              colors={["#ef4444", "#dc2626"]}
              className="rounded-xl p-4"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
            >
              <Text className="text-white text-xl font-bold text-center">Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="items-center pb-6">
          <Text className="text-gray-500 text-sm">Developed by Prabu</Text>
          <Text className="text-gray-400 text-xs mt-1">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Settings;
