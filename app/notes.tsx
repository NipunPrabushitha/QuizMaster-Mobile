import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Notes = () => {
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
            My Notes
          </Text>
          <Text className="text-lg text-center text-gray-600">
            Keep track of your learning journey
          </Text>
        </View>

        {/* Add Note Button */}
        <View className="px-6 mb-6">
          <TouchableOpacity>
            <LinearGradient
              colors={["#FFDA09", "#FF6100"]}
              className="rounded-xl p-4"
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 }}
            >
              <Text className="text-white text-xl font-bold text-center">+ Add New Note</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Notes Categories */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-bold mb-4" style={{ color: '#0404a5ff' }}>Categories</Text>
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <Text style={{ color: '#0404a5ff' }}>📚 Study Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <Text style={{ color: '#0404a5ff' }}>🔍 Key Points</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <Text style={{ color: '#0404a5ff' }}>💡 Tips</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white rounded-lg px-4 py-2 shadow-sm">
              <Text style={{ color: '#0404a5ff' }}>❓ Questions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Notes */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-bold mb-4" style={{ color: '#0404a5ff' }}>Recent Notes</Text>
          
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-lg font-semibold flex-1" style={{ color: '#0404a5ff' }}>
                Math Formulas
              </Text>
              <Text className="text-gray-500 text-sm">2 days ago</Text>
            </View>
            <Text className="text-gray-600 mb-2">
              Important formulas for quadratic equations and derivatives...
            </Text>
            <View className="bg-blue-100 rounded-lg px-3 py-1 self-start">
              <Text className="text-sm" style={{ color: '#0404a5ff' }}>📚 Study Notes</Text>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-lg font-semibold flex-1" style={{ color: '#0404a5ff' }}>
                History Timeline
              </Text>
              <Text className="text-gray-500 text-sm">1 week ago</Text>
            </View>
            <Text className="text-gray-600 mb-2">
              Key dates and events from World War II...
            </Text>
            <View className="bg-yellow-100 rounded-lg px-3 py-1 self-start">
              <Text className="text-sm" style={{ color: '#FF6100' }}>🔍 Key Points</Text>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-lg font-semibold flex-1" style={{ color: '#0404a5ff' }}>
                Study Tips
              </Text>
              <Text className="text-gray-500 text-sm">2 weeks ago</Text>
            </View>
            <Text className="text-gray-600 mb-2">
              Effective memorization techniques for vocabulary...
            </Text>
            <View className="bg-green-100 rounded-lg px-3 py-1 self-start">
              <Text className="text-sm" style={{ color: '#16a34a' }}>💡 Tips</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Notes;
