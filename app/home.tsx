import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  SlideInDown,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [user, isLoading]);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800 });
    translateY.value = withSpring(0, { damping: 15 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

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

        {/* Welcome Section */}
        <Animated.View 
          entering={SlideInDown.delay(200).duration(600)}
          className="px-6 mb-8"
        >
          <Text className="text-3xl font-bold text-center mb-2" style={{ color: '#ffffff' }}>
            Welcome Back, {user.email?.split('@')[0]}!
          </Text>
          <Text className="text-lg text-center" style={{ color: '#b0b0b0' }}>
            Ready to challenge your knowledge?
          </Text>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View entering={FadeIn.delay(400).duration(600)} className="px-6 mb-8">
          <View className="flex-row justify-around bg-gray-800/50 p-4 rounded-2xl">
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">12</Text>
              <Text className="text-gray-400 text-sm">Quizzes Taken</Text>
            </View>
            <View className="items-center">
              <Text className="text-white text-2xl font-bold">87%</Text>
              <Text className="text-gray-400 text-sm">Accuracy</Text>
            </View>
          </View>
        </Animated.View>

        {/* Main Menu */}
        <Animated.View entering={SlideInUp.delay(500).duration(600)} className="px-6">
          <Text className="text-xl font-bold text-white mb-4">Get Started</Text>
          
          {/* Start Quiz Button */}
          <TouchableOpacity 
            onPress={() => router.push('/(dashboard)/quiz')}
            className="flex-row items-center bg-gray-800 p-4 rounded-2xl mb-4"
          >
            <Icon name="play-circle-outline" size={28} color="#4CAF50" />
            <View className="ml-4">
              <Text className="text-lg font-semibold text-white">Start Quiz</Text>
              <Text className="text-gray-400">Test your knowledge with our exciting quizzes</Text>
            </View>
          </TouchableOpacity>

          {/* Notes Button */}
          <TouchableOpacity 
            onPress={() => router.push('/note')}
            className="flex-row items-center bg-gray-800 p-4 rounded-2xl"
          >
            <Icon name="notebook-edit-outline" size={28} color="#FFC107" />
            <View className="ml-4">
              <Text className="text-lg font-semibold text-white">My Notes</Text>
              <Text className="text-gray-400">Review your study materials</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

export default Home;
