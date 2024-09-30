import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const API_ROUTE = 'https://storyapi.serikozgetir.com/stories';

export default function CreateStoryScreen() {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('Macera');
    const [targetAge, setTargetAge] = useState('0-3 Yaş');
    const [illustrationStyle, setIllustrationStyle] = useState('Anime');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const clearForm = () => {
        setTitle('');
        setGenre('Macera');
        setTargetAge('0-3 Yaş');
        setIllustrationStyle('Anime');
    };

    const handleSubmit = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const response = await fetch(API_ROUTE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    genre,
                    target_age: targetAge,
                    illustration_style: illustrationStyle,
                }),
            });

            if (response.ok) {
                clearForm(); // Clear the form after successful creation
                router.push('/storyListing');
            } else {
                console.error('Failed to create story');
                // You might want to show an error message to the user here
            }
        } catch (error) {
            console.error('Error creating story:', error);
            // You might want to show an error message to the user here
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoBack = () => {
        router.push('/storyListing');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#4A90E2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create New Story</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={genre}
                        onValueChange={(itemValue: string) => setGenre(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Macera" value="Macera" />
                        <Picker.Item label="Fantastik" value="Fantastik" />
                        <Picker.Item label="Bilim Kurgu" value="Bilim Kurgu" />
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={targetAge}
                        onValueChange={(itemValue: string) => setTargetAge(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="0-3 Yaş" value="0-3 Yaş" />
                        <Picker.Item label="4-6 Yaş" value="4-6 Yaş" />
                        <Picker.Item label="7-9 Yaş" value="7-9 Yaş" />
                        <Picker.Item label="10-12 Yaş" value="10-12 Yaş" />
                    </Picker>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={illustrationStyle}
                        onValueChange={(itemValue: string) => setIllustrationStyle(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Anime" value="Anime" />
                        <Picker.Item label="Karikatür" value="Karikatür" />
                        <Picker.Item label="Gerçekçi" value="Gerçekçi" />
                    </Picker>
                </View>
                <TouchableOpacity
                    style={[styles.submitButton, isLoading && styles.disabledButton]}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>Create Story 📖</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
        marginTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginLeft: 16,
    },
    scrollContainer: {
        padding: 20,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    pickerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    submitButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#A0C4E2',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});