import { LinearGradient } from 'expo-linear-gradient';
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: number;
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(false);
            setShowLanding(true);
            return 100;
          }
          return prev + 3;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <LinearGradient
        colors={["#ffffffff", "#d49777ff"]}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-full items-center mt-8 mb-2">
            <LottieView
              source={require("../assets/images/ui/animations/Premium.json")}
              autoPlay
              loop
              style={{ width: 220, height: 220, marginBottom: 8 }}
            />
            <Image
              source={require("../assets/images/ui/QUIZ-MASTER-8-31-2025(2).png")}
              style={{ width: 480, height: 200, resizeMode: 'contain' }}
            />
          </View>
          <Text style={{ color: '#0404a5ff', fontWeight: 'bold', fontSize: 18, marginBottom: 24 }}>Loading...</Text>
          <View
            style={{ width: 340, height: 24, backgroundColor: '#e5e7eb', borderWidth: 2, borderColor: '#0404a5ff', borderRadius: 8, overflow: 'hidden', marginBottom: 4, position: 'relative', justifyContent: 'center' }}
          >
            <View
              style={{ width: `${progress}%`, backgroundColor: '#FFDA09', height: '100%', borderRadius: 6, position: 'absolute', left: 0, top: 0 }}
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
                  backgroundColor: '#0404a5ff',
                  opacity: 0.25,
                  borderRadius: 1,
                }}
              />
            ))}
          </View>
          <Text className="mt-2 text-sm text-gray-500">{progress}%</Text>
          {/* Developed by Prabu at the bottom */}
          <View style={{ position: 'absolute', bottom: 24, width: '100%', alignItems: 'center' }}>
            <Text style={{ color: '#563e2e', fontSize: 14, fontWeight: '600', opacity: 0.7 }}>Developed by Prabu</Text>
          </View>
        </View>
      </LinearGradient>
    );
  }

  if (showLanding) {
    return (
      <LinearGradient
        colors={["#ffffffff", "#d49777ff"]}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-center items-center">
          <View className="w-full items-center mt-8 mb-2">
            <Image
              source={require("../assets/images/ui/QUIZ-MASTER-8-31-2025(2).png")}
              style={{ width: 420, height: 160, resizeMode: 'contain', marginTop: 64 }}
            />
          </View>
          <View className="flex-1 w-full justify-center items-center rounded-3xl overflow-visible">
            <LottieView
              source={require("../assets/images/ui/animations/Quiz bump.json")}
              autoPlay
              loop
              style={{ width: 480, height: 480 }}
            />
          </View>
        </View>
        <View className="items-center mb-16">
          <LinearGradient
            colors={["#FFDA09", "#FF6100"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ 
              borderRadius: 9999, 
              paddingHorizontal: 32, 
              paddingVertical: 18, 
              shadowColor: '#000000', 
              shadowOffset: { width: 0, height: 8 }, 
              shadowOpacity: 0.25, 
              shadowRadius: 12, 
              alignItems: 'center', 
              borderWidth: 2, 
              borderColor: '#0404a5ff',
              elevation: 12,
              transform: [{ translateY: -4 }]
            }}
          >
            <TouchableOpacity
              onPress={() => setShowLanding(false)}
              style={{ borderRadius: 9999 }}
              activeOpacity={0.85}
            >
              <Text style={{ color: '#0404a5ff', fontSize: 20, fontWeight: 'bold', letterSpacing: 1, textShadowColor: '#ffffff', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>Get Started</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </LinearGradient>
    );
  }

  // Main content after Get Started
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-base text-gray-800">
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}


