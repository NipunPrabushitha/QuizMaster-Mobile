import { useRouter } from 'expo-router';
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  SlideInDown,
  SlideInUp
} from 'react-native-reanimated';
import { useAuth } from '../contexts/AuthContext';
import { useFooter } from './_layout';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setShowFooter } = useFooter();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let interval: number;
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            // Check auth state after loading
            setTimeout(() => {
              if (!authLoading) {
                if (user) {
                  setShowFooter(true);
                  router.replace('/home');
                } else {
                  setShowLanding(true);
                }
              }
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [loading, authLoading, user]);

  // Wait for auth loading to complete
  useEffect(() => {
    if (!authLoading && !loading) {
      if (user) {
        setShowFooter(true);
        router.replace('/home');
      } else {
        setShowLanding(true);
      }
    }
  }, [authLoading, user, loading]);

  if (loading || authLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
        <View className="flex-1 justify-center items-center px-6" style={{ paddingTop: 30 }}>
          {/* Logo Section */}
          <View className="w-full items-center mb-8">
            <LottieView
              source={require("../assets/images/ui/animations/Premium.json")}
              autoPlay
              loop
              style={{ width: 200, height: 200, marginBottom: 20 }}
            />
            <Image
              source={require("../assets/images/ui/QUIZ-MASTER-8-31-2025(2).png")}
              style={{ width: 350, height: 140, resizeMode: 'contain' }}
            />
          </View>

          {/* Loading Text */}
          <View className="items-center mb-8">
            <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>
              Getting Ready...
            </Text>
            <Text style={{ color: '#b0b0b0', fontSize: 16, textAlign: 'center' }}>
              Preparing your quiz experience
            </Text>
          </View>

          {/* Progress Bar */}
          <View className="w-full items-center mb-4">
            <View
              style={{ 
                width: 340, 
                height: 24, 
                backgroundColor: '#404040', 
                borderWidth: 2, 
                borderColor: '#4CAF50', 
                borderRadius: 8, 
                overflow: 'hidden', 
                marginBottom: 4, 
                position: 'relative', 
                justifyContent: 'center' 
              }}
            >
              <View
                style={{ 
                  width: `${progress}%`, 
                  backgroundColor: '#4CAF50', 
                  height: '100%', 
                  borderRadius: 6, 
                  position: 'absolute', 
                  left: 0, 
                  top: 0 
                }}
              />
              {/* Small bars */}
              {Array.from({ length: 17 }).map((_, i) => (
                <View
                  key={i}
                  style={{
                    position: 'absolute',
                    left: (i * 20),
                    top: 4,
                    width: 2,
                    height: 16,
                    backgroundColor: '#1a1a1a',
                    opacity: 0.8,
                    borderRadius: 1,
                  }}
                />
              ))}
            </View>
            <Text style={{ color: '#4CAF50', fontSize: 16, fontWeight: '600' }}>
              {progress}%
            </Text>
          </View>

          {/* Footer */}
          <View style={{ position: 'absolute', bottom: 30, alignItems: 'center' }}>
            <Text style={{ color: '#808080', fontSize: 14 }}>Developed by Prabu</Text>
            <Text style={{ color: '#606060', fontSize: 12, marginTop: 4 }}>Version 1.0.0</Text>
          </View>
        </View>
      </View>
    );
  }

  if (showLanding) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
        <View className="flex-1 justify-center items-center px-6" style={{ paddingTop: 30 }}>
          {/* Logo Section */}
          <Animated.View 
            entering={FadeIn.duration(800)}
            className="items-center mb-8"
            style={{ marginTop: 50 }}  // Added to lower the logo position
          >
            <Image
              source={require("../assets/images/ui/QUIZ-MASTER-8-31-2025(2).png")}
              style={{ width: 350, height: 140, resizeMode: 'contain', marginBottom: 20 }}
            />
          </Animated.View>

          {/* Welcome Content */}
          <Animated.View 
            entering={SlideInDown.delay(300).duration(600)}
            className="items-center mb-8"
          >
            <Text style={{ color: '#ffffff', fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }}>
              Welcome to Quiz Master!
            </Text>
            <Text style={{ color: '#b0b0b0', fontSize: 18, textAlign: 'center', lineHeight: 26 }}>
              Test your knowledge, track your progress, and become a quiz champion
            </Text>
          </Animated.View>

          {/* Animation */}
          <Animated.View 
            entering={SlideInUp.delay(500).duration(600)}
            className="flex-1 justify-center items-center"
          >
            <LottieView
              source={require("../assets/images/ui/animations/Quiz bump.json")}
              autoPlay
              loop
              style={{ width: 300, height: 300 }}
            />
          </Animated.View>

          {/* Features Cards */}
          <Animated.View 
            entering={SlideInUp.delay(700).duration(600)}
            className="w-full mb-8"
          >
            <View className="flex-row justify-around">
              <View className="items-center flex-1 mx-2">
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: '#2196F3' }}
                >
                  <Text className="text-white text-lg">🧠</Text>
                </View>
                <Text style={{ color: '#ffffff', fontSize: 12, textAlign: 'center' }}>Smart Quizzes</Text>
              </View>
              <View className="items-center flex-1 mx-2">
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: '#FF9800' }}
                >
                  <Text className="text-white text-lg">📊</Text>
                </View>
                <Text style={{ color: '#ffffff', fontSize: 12, textAlign: 'center' }}>Track Progress</Text>
              </View>
              <View className="items-center flex-1 mx-2">
                <View 
                  className="w-12 h-12 rounded-full items-center justify-center mb-2"
                  style={{ backgroundColor: '#4CAF50' }}
                >
                  <Text className="text-white text-lg">🏆</Text>
                </View>
                <Text style={{ color: '#ffffff', fontSize: 12, textAlign: 'center' }}>Compete</Text>
              </View>
            </View>
          </Animated.View>

          {/* Get Started Button */}
          <Animated.View 
            entering={SlideInUp.delay(900).duration(600)}
            className="w-full px-6 mb-8"
          >
            <TouchableOpacity
              onPress={() => {
                router.push('/login');
              }}
              activeOpacity={0.8}
            >
              <View 
                className="rounded-2xl p-4"
                style={{ backgroundColor: '#4CAF50' }}
              >
                <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                  Get Started
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <View className="items-center pb-6">
            <Text style={{ color: '#808080', fontSize: 14 }}>Developed by Prabu</Text>
            <Text style={{ color: '#606060', fontSize: 12, marginTop: 4 }}>Version 1.0.0</Text>
          </View>
        </View>
      </View>
    );
  }

  // Fallback (this shouldn't be reached)
  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#ffffff', fontSize: 18 }}>
        Loading Quiz Master...
      </Text>
    </View>
  );
}


