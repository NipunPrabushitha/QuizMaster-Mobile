import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
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

        {/* Welcome Section */}
        <View className="px-6 mb-8">
          <Text className="text-3xl font-bold text-center mb-2" style={{ color: '#0404a5ff' }}>
            Welcome Back!
          </Text>
          <Text className="text-lg text-center text-gray-600">
            Ready to challenge your knowledge?
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-around px-6 mb-8">
          <View className="items-center bg-white rounded-xl p-4 shadow-lg" style={{ minWidth: 100 }}>
            <Text className="text-2xl font-bold" style={{ color: '#0404a5ff' }}>42</Text>
            <Text className="text-gray-600">Quizzes</Text>
          </View>
          <View className="items-center bg-white rounded-xl p-4 shadow-lg" style={{ minWidth: 100 }}>
            <Text className="text-2xl font-bold" style={{ color: '#FF6100' }}>85%</Text>
            <Text className="text-gray-600">Accuracy</Text>
          </View>
          <View className="items-center bg-white rounded-xl p-4 shadow-lg" style={{ minWidth: 100 }}>
            <Text className="text-2xl font-bold" style={{ color: '#FFDA09' }}>12</Text>
            <Text className="text-gray-600">Streak</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-6 space-y-4">
          <TouchableOpacity>
            <LinearGradient
              colors={["#0404a5ff", "#6366f1"]}
              className="rounded-xl p-4 mb-4"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
            >
              <Text className="text-white text-xl font-bold text-center">Start New Quiz</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity>
            <LinearGradient
              colors={["#FFDA09", "#FF6100"]}
              className="rounded-xl p-4 mb-4"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
            >
              <Text className="text-white text-xl font-bold text-center">Continue Learning</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="bg-white rounded-xl p-4 border-2" style={{ borderColor: '#0404a5ff' }}>
              <Text className="text-xl font-bold text-center" style={{ color: '#0404a5ff' }}>View Progress</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View className="px-6 mt-8 mb-6">
          <Text className="text-xl font-bold mb-4" style={{ color: '#0404a5ff' }}>Recent Activity</Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <Text className="text-gray-600">🎯 Completed "Math Basics" - 90% score</Text>
            <Text className="text-gray-500 text-sm mt-1">2 hours ago</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Home;
