import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      router.replace('/home');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };  const handleRegister = () => {
    router.push('/(auth)/register');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      {/* Header with Register Button */}
      <View className="flex-row justify-between items-center px-6 pt-12 pb-4">
        <View />
        <TouchableOpacity
          onPress={handleRegister}
          activeOpacity={0.8}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#4CAF50'
          }}
        >
          <Text style={{ color: '#4CAF50', fontSize: 14, fontWeight: '600' }}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center px-6">
        {/* Logo Section */}
        <Animated.View 
          entering={FadeIn.duration(800)}
          className="items-center mb-12"
        >
          <Image
            source={require("../../assets/images/ui/QUIZ-MASTER-8-31-2025(2).png")}
            style={{ width: 300, height: 120, resizeMode: 'contain', marginBottom: 20 }}
          />
          <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
            Welcome Back!
          </Text>
          <Text style={{ color: '#b0b0b0', fontSize: 16, textAlign: 'center', marginTop: 8 }}>
            Sign in to continue your quiz journey
          </Text>
        </Animated.View>

        {/* Login Form */}
        <Animated.View 
          entering={SlideInDown.delay(300).duration(600)}
          className="w-full"
        >
          {/* Email Input */}
          <View className="mb-4">
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
              Email
            </Text>
            <View 
              className="flex-row items-center px-4 py-3 rounded-xl"
              style={{ backgroundColor: '#2a2a2a', borderWidth: 1, borderColor: '#404040' }}
            >
              <Icon name="email-outline" size={20} color="#808080" style={{ marginRight: 12 }} />
              <TextInput
                style={{ 
                  flex: 1, 
                  color: '#ffffff', 
                  fontSize: 16,
                  paddingVertical: 4
                }}
                placeholder="Enter your email"
                placeholderTextColor="#808080"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '600', marginBottom: 8 }}>
              Password
            </Text>
            <View 
              className="flex-row items-center px-4 py-3 rounded-xl"
              style={{ backgroundColor: '#2a2a2a', borderWidth: 1, borderColor: '#404040' }}
            >
              <Icon name="lock-outline" size={20} color="#808080" style={{ marginRight: 12 }} />
              <TextInput
                style={{ 
                  flex: 1, 
                  color: '#ffffff', 
                  fontSize: 16,
                  paddingVertical: 4
                }}
                placeholder="Enter your password"
                placeholderTextColor="#808080"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="#808080" 
                />
              </Pressable>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#4CAF50',
              paddingVertical: 16,
              borderRadius: 12,
              marginBottom: 20,
              opacity: isLoading ? 0.7 : 1
            }}
          >
            <Text style={{ 
              color: '#ffffff', 
              fontSize: 18, 
              fontWeight: 'bold', 
              textAlign: 'center' 
            }}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          {/* Demo Credentials */}
          <View 
            className="p-4 rounded-xl mb-4"
            style={{ backgroundColor: '#2a2a2a', borderWidth: 1, borderColor: '#404040' }}
          >
            <Text style={{ color: '#4CAF50', fontSize: 14, fontWeight: '600', marginBottom: 8 }}>
              Demo Credentials:
            </Text>
            <Text style={{ color: '#b0b0b0', fontSize: 13 }}>
              Email: test@gmail.com
            </Text>
            <Text style={{ color: '#b0b0b0', fontSize: 13 }}>
              Password: 123456
            </Text>
          </View>

          {/* Register Link */}
          <View className="flex-row justify-center items-center">
            <Text style={{ color: '#b0b0b0', fontSize: 14 }}>
              Don't have an account? 
            </Text>
            <TouchableOpacity onPress={handleRegister} activeOpacity={0.8}>
              <Text style={{ color: '#4CAF50', fontSize: 14, fontWeight: '600', marginLeft: 4 }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>

      {/* Footer */}
      <View className="items-center pb-6">
        <Text style={{ color: '#808080', fontSize: 14 }}>Developed by Prabu</Text>
        <Text style={{ color: '#606060', fontSize: 12, marginTop: 4 }}>Version 1.0.0</Text>
      </View>
    </View>
  );
}
