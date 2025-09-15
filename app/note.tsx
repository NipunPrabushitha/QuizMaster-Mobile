import { deleteNoteById, getNotesByUserId } from '@/service/noteService';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../contexts/AuthContext';
import { Note } from '../types/note';

const Notes = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loadingNotes, setLoadingNotes] = useState(true);

  const fetchNotes = useCallback(async () => {
    if (user?.uid) {
      try {
        setLoadingNotes(true);
        const userNotes = await getNotesByUserId(user.uid);
        setNotes(userNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        Alert.alert("Error", "Failed to load your notes.");
      } finally {
        setLoadingNotes(false);
      }
    }
  }, [user]);

  // useFocusEffect will re-fetch notes every time the screen comes into view
  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [fetchNotes])
  );

  if (isLoading || !user) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const handleDelete = (noteId: string) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to permanently delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            try {
              await deleteNoteById(noteId);
              // Remove note from state for immediate UI update
              setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
            } catch (error) {
              console.error("Failed to delete note:", error);
              Alert.alert("Error", "Failed to delete the note.");
            }
          }
        }
      ]
    );
  };

  const handleEdit = (noteId: string) => {
    router.push({
      pathname: '/(dashboard)/notes/[id]',
      params: { id: noteId },
    });
  };

  const handleView = (noteId: string) => {
    router.push({
      pathname: '/(dashboard)/notes/view/[id]',
      params: { id: noteId },
    });
  };

  const renderNoteItem = (note: Note, index: number) => {
    if (!note.id) return null;
    const date = note.createdAt?.toDate ? note.createdAt.toDate().toLocaleDateString() : '...';
    return (
      <Animated.View
        key={note.id}
        entering={FadeIn.delay(100 + index * 100).duration(500)}
        className="rounded-xl p-4 mb-4"
        style={{ backgroundColor: '#2a2a2a' }}
      >
        <View className="flex-row justify-between items-start mb-3">
          <Text className="text-lg font-semibold flex-1 mr-4" style={{ color: '#ffffff' }}>
            {note.title}
          </Text>
          <Text style={{ color: '#808080', fontSize: 12 }}>{date}</Text>
        </View>
        <Text style={{ color: '#b0b0b0', marginBottom: 16 }} numberOfLines={3}>
          {note.content}
        </Text>
        <View className="flex-row justify-end items-center gap-2 border-t border-gray-700 pt-3">
        <TouchableOpacity onPress={() => handleView(note.id!)} className="flex-row items-center p-2">
            <Icon name="eye-outline" size={20} color="#2196F3" />
            <Text style={{ color: '#2196F3', marginLeft: 6, fontWeight: '600' }}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEdit(note.id!)} className="flex-row items-center p-2">
            <Icon name="pencil-outline" size={20} color="#FFC107" />
            <Text style={{ color: '#FFC107', marginLeft: 6, fontWeight: '600' }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(note.id!)} className="flex-row items-center p-2">
            <Icon name="trash-can-outline" size={20} color="#F44336" />
            <Text style={{ color: '#F44336', marginLeft: 6, fontWeight: '600' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

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
          <TouchableOpacity onPress={() => router.push('/(dashboard)/notes')}>
            <View
              className="rounded-2xl p-4"
              style={{ backgroundColor: '#4CAF50' }}
            >
              <Text className="text-white text-xl font-bold text-center">+ Add New Note</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Categories Section - remains static */}
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
          
          {loadingNotes ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : notes.length > 0 ? (
            notes.map(renderNoteItem)
          ) : (
            <View className="items-center justify-center p-10 bg-gray-800/30 rounded-2xl">
              <Icon name="note-multiple-outline" size={48} color="#6b7280" />
              <Text style={{ color: '#9ca3af', textAlign: 'center', marginTop: 12, fontSize: 16 }}>You haven't created any notes yet.</Text>
              <Text style={{ color: '#6b7280', textAlign: 'center', marginTop: 4 }}>Click "+ Add New Note" to get started.</Text>
            </View>
          )}
        </Animated.View>

        {/* Footer spacing */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

export default Notes;
