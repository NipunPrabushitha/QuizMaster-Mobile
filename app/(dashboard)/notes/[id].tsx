import { getNoteById, updateNote } from '@/service/noteService';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../../contexts/AuthContext';
import { Note } from '../../../types/note';

const EditNoteScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const fetchedNote = await getNoteById(id);
        if (fetchedNote) {
          // Ensure the note belongs to the current user
          if (fetchedNote.userId !== user?.uid) {
            Alert.alert("Access Denied", "You don't have permission to edit this note.");
            router.back();
            return;
          }
          setNote(fetchedNote);
          setTitle(fetchedNote.title);
          setContent(fetchedNote.content);
        } else {
          Alert.alert("Error", "Note not found.");
          router.back();
        }
      } catch (error) {
        console.error("Failed to fetch note:", error);
        Alert.alert("Error", "Failed to load the note.");
        router.back();
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id, user]);

  const handleUpdateNote = async () => {
    if (!id || !note) return;
    if (!title.trim() || !content.trim()) {
      Alert.alert('Incomplete', 'Please provide both a title and content.');
      return;
    }

    setIsSaving(true);
    try {
      await updateNote(id, {
        title: title.trim(),
        content: content.trim(),
      });
      router.back();
    } catch (error) {
      console.error('Failed to update note:', error);
      Alert.alert('Error', 'Failed to update the note. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: '#1a1a1a' }}
    >
      <View style={{ flex: 1, paddingTop: 60 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#2a2a2a' }}>
          <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginRight: 16 }}>
            <Icon name="arrow-left" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>
            Edit Note
          </Text>
        </View>

        {/* Form */}
        <View style={{ paddingHorizontal: 20, flex: 1, paddingTop: 20 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: '#b0b0b0', marginBottom: 8, fontSize: 16, fontWeight: '600' }}>Title</Text>
            <TextInput
              placeholder="Enter note title"
              placeholderTextColor="#808080"
              value={title}
              onChangeText={setTitle}
              style={{
                backgroundColor: '#2a2a2a',
                color: '#ffffff',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#404040',
                paddingHorizontal: 14,
                paddingVertical: 12,
                fontSize: 16
              }}
            />
          </View>

          <View style={{ marginBottom: 24, flex: 1 }}>
            <Text style={{ color: '#b0b0b0', marginBottom: 8, fontSize: 16, fontWeight: '600' }}>Content</Text>
            <TextInput
              placeholder="Write your thoughts here..."
              placeholderTextColor="#808080"
              value={content}
              onChangeText={setContent}
              multiline
              style={{
                flex: 1,
                backgroundColor: '#2a2a2a',
                color: '#ffffff',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#404040',
                paddingHorizontal: 14,
                paddingVertical: 12,
                textAlignVertical: 'top',
                fontSize: 16,
                lineHeight: 22
              }}
            />
          </View>

          <TouchableOpacity
            onPress={handleUpdateNote}
            disabled={isSaving || !title.trim() || !content.trim()}
            style={{
              backgroundColor: '#4CAF50',
              opacity: (isSaving || !title.trim() || !content.trim()) ? 0.6 : 1,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            {isSaving ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: '800' }}>
                Save Changes
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditNoteScreen;
