import { getNoteById } from '@/service/noteService';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Note } from '@/types/note';

export default function NoteDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const fetchedNote = await getNoteById(id);
        if (fetchedNote) {
          setNote(fetchedNote);
        } else {
          // Handle note not found
          console.log("Note not found");
        }
      } catch (error) {
        console.error("Failed to fetch note:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!note) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#ffffff', fontSize: 18 }}>Note not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
          <Text style={{ color: '#4CAF50', fontSize: 16 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const date = note.createdAt?.toDate ? note.createdAt.toDate().toLocaleString() : 'No date';

  return (
    <View style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 80 }}>
        {/* Header with Back Button */}
        <Animated.View entering={FadeIn.delay(200).duration(500)} className="absolute top-12 left-6 z-10">
            <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            style={{
                padding: 8,
                borderRadius: 12,
                backgroundColor: '#2a2a2a'
            }}
            >
            <Icon name="arrow-left" size={24} color="#ffffff" />
            </TouchableOpacity>
        </Animated.View>
        
        <Animated.View entering={SlideInDown.delay(200).duration(600)}>
          <Text className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>
            {note.title}
          </Text>
          <View className="flex-row items-center mb-6">
            <Icon name="calendar-clock" size={16} color="#808080" />
            <Text style={{ color: '#808080', fontSize: 14, marginLeft: 8 }}>
              {date}
            </Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(400).duration(600)}>
          <Text style={{ color: '#d0d0d0', fontSize: 17, lineHeight: 28 }}>
            {note.content}
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
