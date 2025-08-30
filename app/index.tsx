import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-700 mb-6">Loading...</Text>
        <View style={{ width: 200, height: 16, backgroundColor: '#e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
          <View
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#6366F1',
              borderRadius: 8,
            }}
          />
        </View>
        <Text className="mt-2 text-sm text-gray-500">{progress}%</Text>
      </View>
    );
  }

  if (showLanding) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Welcome to Quiz Master!</Text>
        <TouchableOpacity
          className="bg-indigo-600 px-6 py-3 rounded-full"
          onPress={() => setShowLanding(false)}
        >
          <Text className="text-white text-lg font-semibold">Get Started</Text>
        </TouchableOpacity>
      </View>
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


