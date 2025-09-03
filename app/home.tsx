import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
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
            Welcome Back, {user.name.split(' ')[0]}!
          </Text>
          <Text className="text-lg text-center" style={{ color: '#b0b0b0' }}>
            Ready to challenge your knowledge?
          </Text>
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View 
          entering={SlideInLeft.delay(300).duration(600)}
          className="flex-row justify-around px-6 mb-8"
        >
          <Animated.View 
            entering={FadeIn.delay(400).duration(500)}
            className="items-center rounded-xl p-4" 
            style={{ minWidth: 100, backgroundColor: '#2a2a2a' }}
          >
            <Text className="text-2xl font-bold" style={{ color: '#4CAF50' }}>42</Text>
            <Text style={{ color: '#b0b0b0' }}>Quizzes</Text>
          </Animated.View>
          <Animated.View 
            entering={FadeIn.delay(500).duration(500)}
            className="items-center rounded-xl p-4" 
            style={{ minWidth: 100, backgroundColor: '#2a2a2a' }}
          >
            <Text className="text-2xl font-bold" style={{ color: '#FF9800' }}>85%</Text>
            <Text style={{ color: '#b0b0b0' }}>Accuracy</Text>
          </Animated.View>
          <Animated.View 
            entering={FadeIn.delay(600).duration(500)}
            className="items-center rounded-xl p-4" 
            style={{ minWidth: 100, backgroundColor: '#2a2a2a' }}
          >
            <Text className="text-2xl font-bold" style={{ color: '#FFC107' }}>120</Text>
            <Text style={{ color: '#b0b0b0' }}>Points</Text>
          </Animated.View>
        </Animated.View>

        {/* Main Action Cards */}
        <Animated.View 
          entering={SlideInRight.delay(400).duration(600)}
          className="px-6 space-y-4"
        >
          {/* Start Quiz Card */}
          <Animated.View entering={FadeIn.delay(700).duration(500)}>
            <TouchableOpacity>
              <View 
                className="rounded-2xl p-6 mb-4 relative overflow-hidden"
                style={{ backgroundColor: '#2196F3' }}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-1 pr-4">
                    <Text className="text-white text-2xl font-bold mb-2">Start Quiz</Text>
                    <Text className="text-blue-100 text-base">
                      Test your knowledge with our exciting quizzes
                    </Text>
                  </View>
                  <View className="absolute top-2 right-2">
                    <Image
                      source={require("../assets/images/ui/icons/brain.png")}
                      style={{ width: 40, height: 40, resizeMode: 'contain' }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Top Players Card */}
          <Animated.View entering={FadeIn.delay(750).duration(500)}>
            <TouchableOpacity>
              <View 
                className="rounded-2xl p-6 mb-4 relative overflow-hidden"
                style={{ backgroundColor: '#FF9800' }}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-1 pr-4">
                    <Text className="text-white text-2xl font-bold mb-2">Top Players</Text>
                    <Text className="text-orange-100 text-base">
                      See who's leading the leaderboard
                    </Text>
                  </View>
                  <View className="absolute top-2 right-2">
                    <Image
                      source={require("../assets/images/ui/Astronaut_Duck_Illustration-removebg-preview.png")}
                      style={{ width: 50, height: 50, resizeMode: 'contain' }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Categories Card */}
          <Animated.View entering={FadeIn.delay(800).duration(500)}>
            <TouchableOpacity>
              <View 
                className="rounded-2xl p-6 mb-4 relative overflow-hidden"
                style={{ backgroundColor: '#4CAF50' }}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-1 pr-4">
                    <Text className="text-white text-2xl font-bold mb-2">Categories</Text>
                    <Text className="text-green-100 text-base">
                      Explore different quiz categories
                    </Text>
                  </View>
                  <View className="absolute top-2 right-2">
                    <Image
                      source={require("../assets/images/ui/icons/abc.png")}
                      style={{ width: 40, height: 40, resizeMode: 'contain' }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* Recent Activity */}
        <Animated.View 
          entering={SlideInDown.delay(500).duration(600)}
          className="px-6 mt-8 mb-6"
        >
          <Text className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>Recent Activity</Text>
          <Animated.View 
            entering={FadeIn.delay(900).duration(500)}
            className="rounded-xl p-4"
            style={{ backgroundColor: '#2a2a2a' }}
          >
            <Text style={{ color: '#b0b0b0' }}>🎯 Completed "Math Basics" - 90% score</Text>
            <Text style={{ color: '#808080', fontSize: 12, marginTop: 4 }}>2 hours ago</Text>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Home;
