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

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const success = await register(name, email, password);
    setIsLoading(false);

    if (success) {
      router.replace('/home');
    } else {
      Alert.alert('Error', 'Email already exists. Please use a different email.');
    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      {/* Header with Back Button */}
      <View className="flex-row justify-between items-center px-6 pt-12 pb-4">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          style={{
            padding: 8,
            borderRadius: 12,
            backgroundColor: '#2a2a2a'
          }}
        >
          <Icon name="arrow-left" size={20} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
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
            Sign In
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center px-6">
        {/* Logo Section */}
        <Animated.View 
          entering={FadeIn.duration(800)}
          className="items-center mb-8"
        >
          <Image
            source={require("../../assets/images/ui/QUIZ-MASTER-8-31-2025(2).png")}
            style={{ width: 280, height: 110, resizeMode: 'contain', marginBottom: 16 }}
          />
          <Text style={{ color: '#ffffff', fontSize: 26, fontWeight: 'bold', textAlign: 'center' }}>
            Create Account
          </Text>
          <Text style={{ color: '#b0b0b0', fontSize: 15, textAlign: 'center', marginTop: 6 }}>
            Join Quiz Master and start your journey
          </Text>
        </Animated.View>

        {/* Register Form */}
        <Animated.View 
          entering={SlideInDown.delay(300).duration(600)}
          className="w-full"
        >
          {/* Name Input */}
          <View className="mb-4">
            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '600', marginBottom: 6 }}>
              Full Name
            </Text>
            <View 
              className="flex-row items-center px-4 py-3 rounded-xl"
              style={{ backgroundColor: '#2a2a2a', borderWidth: 1, borderColor: '#404040' }}
            >
              <Icon name="account-outline" size={18} color="#808080" style={{ marginRight: 10 }} />
              <TextInput
                style={{ 
                  flex: 1, 
                  color: '#ffffff', 
                  fontSize: 15,
                  paddingVertical: 2
                }}
                placeholder="Enter your full name"
                placeholderTextColor="#808080"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Email Input */}
          <View className="mb-4">
            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '600', marginBottom: 6 }}>
              Email
            </Text>
            <View 
              className="flex-row items-center px-4 py-3 rounded-xl"
              style={{ backgroundColor: '#2a2a2a', borderWidth: 1, borderColor: '#404040' }}
            >
              <Icon name="email-outline" size={18} color="#808080" style={{ marginRight: 10 }} />
              <TextInput
                style={{ 
                  flex: 1, 
                  color: '#ffffff', 
                  fontSize: 15,
                  paddingVertical: 2
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
          <View className="mb-4">
            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '600', marginBottom: 6 }}>
              Password
            </Text>
            <View 
              className="flex-row items-center px-4 py-3 rounded-xl"
              style={{ backgroundColor: '#2a2a2a', borderWidth: 1, borderColor: '#404040' }}
            >
              <Icon name="lock-outline" size={18} color="#808080" style={{ marginRight: 10 }} />
              <TextInput
                style={{ 
                  flex: 1, 
                  color: '#ffffff', 
                  fontSize: 15,
                  paddingVertical: 2
                }}
                placeholder="Create a password"
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
                  size={18} 
                  color="#808080" 
                />
              </Pressable>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className="mb-6">
            <Text style={{ color: '#ffffff', fontSize: 15, fontWeight: '600', marginBottom: 6 }}>
              Confirm Password
            </Text>
            <View 
              className="flex-row items-center px-4 py-3 rounded-xl"
              style={{ backgroundColor: '#2a2a2a', borderWidth: 1, borderColor: '#404040' }}
            >
              <Icon name="lock-check-outline" size={18} color="#808080" style={{ marginRight: 10 }} />
              <TextInput
                style={{ 
                  flex: 1, 
                  color: '#ffffff', 
                  fontSize: 15,
                  paddingVertical: 2
                }}
                placeholder="Confirm your password"
                placeholderTextColor="#808080"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={18} 
                  color="#808080" 
                />
              </Pressable>
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            onPress={handleRegister}
            disabled={isLoading}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#4CAF50',
              paddingVertical: 15,
              borderRadius: 12,
              marginBottom: 16,
              opacity: isLoading ? 0.7 : 1
            }}
          >
            <Text style={{ 
              color: '#ffffff', 
              fontSize: 17, 
              fontWeight: 'bold', 
              textAlign: 'center' 
            }}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center items-center">
            <Text style={{ color: '#b0b0b0', fontSize: 14 }}>
              Already have an account? 
            </Text>
            <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
              <Text style={{ color: '#4CAF50', fontSize: 14, fontWeight: '600', marginLeft: 4 }}>
                Sign In
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
