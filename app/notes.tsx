import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { useAuth } from '../contexts/AuthContext';

const Notes = () => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [user, isLoading]);  useEffect(() => {
    opacity.value = withTiming(1, { duration: 600 });
    translateY.value = withSpring(0, { damping: 12 });
  }, []);

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
            My Notes
          </Text>
          <Text className="text-lg text-center" style={{ color: '#b0b0b0' }}>
            Keep track of your learning journey
          </Text>
        </Animated.View>

        {/* Add Note Button */}
        <Animated.View 
          entering={FadeIn.delay(300).duration(600)}
          className="px-6 mb-8"
        >
          <TouchableOpacity>
            <View 
              className="rounded-2xl p-4"
              style={{ backgroundColor: '#4CAF50' }}
            >
              <Text className="text-white text-xl font-bold text-center">+ Add New Note</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Notes Categories */}
        <Animated.View 
          entering={SlideInLeft.delay(400).duration(600)}
          className="px-6 mb-8"
        >
          <Text className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>Categories</Text>
          <View className="flex-row flex-wrap gap-3">
            <Animated.View entering={FadeIn.delay(500).duration(400)}>
              <TouchableOpacity 
                className="rounded-lg px-4 py-3"
                style={{ backgroundColor: '#2196F3' }}
              >
                <Text className="text-white font-medium">Study Notes</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View entering={FadeIn.delay(600).duration(400)}>
              <TouchableOpacity 
                className="rounded-lg px-4 py-3"
                style={{ backgroundColor: '#FF9800' }}
              >
                <Text className="text-white font-medium">Key Points</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View entering={FadeIn.delay(700).duration(400)}>
              <TouchableOpacity 
                className="rounded-lg px-4 py-3"
                style={{ backgroundColor: '#9C27B0' }}
              >
                <Text className="text-white font-medium">Tips</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View entering={FadeIn.delay(800).duration(400)}>
              <TouchableOpacity 
                className="rounded-lg px-4 py-3"
                style={{ backgroundColor: '#F44336' }}
              >
                <Text className="text-white font-medium">Questions</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>

        {/* Recent Notes */}
        <Animated.View 
          entering={SlideInRight.delay(500).duration(600)}
          className="px-6 mb-6"
        >
          <Text className="text-xl font-bold mb-4" style={{ color: '#ffffff' }}>Recent Notes</Text>
          
          <Animated.View 
            entering={FadeIn.delay(600).duration(500)}
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: '#2a2a2a' }}
          >
            <View className="flex-row justify-between items-start mb-3">
              <Text className="text-lg font-semibold flex-1" style={{ color: '#ffffff' }}>
                Math Formulas
              </Text>
              <Text style={{ color: '#808080', fontSize: 12 }}>2 days ago</Text>
            </View>
            <Text style={{ color: '#b0b0b0', marginBottom: 12 }}>
              Important formulas for quadratic equations and derivatives...
            </Text>
            <View 
              className="rounded-lg px-3 py-1 self-start"
              style={{ backgroundColor: '#2196F3' }}
            >
              <Text className="text-white text-sm font-medium">Study Notes</Text>
            </View>
          </Animated.View>

          <Animated.View 
            entering={FadeIn.delay(700).duration(500)}
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: '#2a2a2a' }}
          >
            <View className="flex-row justify-between items-start mb-3">
              <Text className="text-lg font-semibold flex-1" style={{ color: '#ffffff' }}>
                History Timeline
              </Text>
              <Text style={{ color: '#808080', fontSize: 12 }}>1 week ago</Text>
            </View>
            <Text style={{ color: '#b0b0b0', marginBottom: 12 }}>
              Key dates and events from World War II...
            </Text>
            <View 
              className="rounded-lg px-3 py-1 self-start"
              style={{ backgroundColor: '#FF9800' }}
            >
              <Text className="text-white text-sm font-medium">Key Points</Text>
            </View>
          </Animated.View>

          <Animated.View 
            entering={FadeIn.delay(800).duration(500)}
            className="rounded-xl p-4 mb-4"
            style={{ backgroundColor: '#2a2a2a' }}
          >
            <View className="flex-row justify-between items-start mb-3">
              <Text className="text-lg font-semibold flex-1" style={{ color: '#ffffff' }}>
                Study Tips
              </Text>
              <Text style={{ color: '#808080', fontSize: 12 }}>2 weeks ago</Text>
            </View>
            <Text style={{ color: '#b0b0b0', marginBottom: 12 }}>
              Effective memorization techniques for vocabulary...
            </Text>
            <View 
              className="rounded-lg px-3 py-1 self-start"
              style={{ backgroundColor: '#9C27B0' }}
            >
              <Text className="text-white text-sm font-medium">Tips</Text>
            </View>
          </Animated.View>

          <Animated.View 
            entering={FadeIn.delay(900).duration(500)}
            className="rounded-xl p-4"
            style={{ backgroundColor: '#2a2a2a' }}
          >
            <View className="flex-row justify-between items-start mb-3">
              <Text className="text-lg font-semibold flex-1" style={{ color: '#ffffff' }}>
                Practice Questions
              </Text>
              <Text style={{ color: '#808080', fontSize: 12 }}>3 weeks ago</Text>
            </View>
            <Text style={{ color: '#b0b0b0', marginBottom: 12 }}>
              Collection of practice problems for upcoming exam...
            </Text>
            <View 
              className="rounded-lg px-3 py-1 self-start"
              style={{ backgroundColor: '#F44336' }}
            >
              <Text className="text-white text-sm font-medium">Questions</Text>
            </View>
          </Animated.View>
        </Animated.View>

        {/* Footer spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

export default Notes;
