import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Story } from '../types/Story';
import { useRouter } from 'expo-router';

const API_ROUTE = 'https://storyapi.serikozgetir.com/stories';

export default function StoryListingScreen() {
    const [stories, setStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasError, setHasError] = useState(false);
    const navigation = useNavigation();
    const router = useRouter();

    const fetchStories = useCallback(async () => {
        try {
            const response = await fetch(API_ROUTE);
            const data = await response.json();
            setStories(data);
            setHasError(false);
        } catch (error) {
            setHasError(true);
            console.error('Error fetching stories:', error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        fetchStories();
    }, [fetchStories]);

    const handleContentPress = (story: Story, index: number) => {
        router.push({
            pathname: './storyDetail',
            params: { story: JSON.stringify(story), index: index.toString() },
        });
    };

    const handleDeletePress = (storyId: number) => {
        Alert.alert(
            "Delete Story",
            "Are you sure you want to delete this story?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteStory(storyId)
                }
            ]
        );
    };

    const deleteStory = async (storyId: number) => {
        try {
            const response = await fetch(`${API_ROUTE}/${storyId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setStories(stories.filter(story => story.id !== storyId));
            } else {
                console.error('Failed to delete story');
            }
        } catch (error) {
            console.error('Error deleting story:', error);
        }
    };

    const handleCreatePress = () => {
        router.push('./createStory');
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading stories...</Text>
            </SafeAreaView>
        );
    }

    if (hasError) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Error loading stories.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Stories</Text>
                <TouchableOpacity onPress={handleCreatePress} style={styles.createButton}>
                    <Ionicons name="add-circle" size={24} color="#4A90E2" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={stories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={() => handleContentPress(item, index)}>
                                    <Ionicons name="book-outline" size={24} color="#4A90E2" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeletePress(item.id)}>
                                    <Ionicons name="trash-outline" size={24} color="#E74C3C" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.genre}>{item.genre}</Text>
                        <Text style={styles.ageGroup}>{item.target_age}</Text>
                        <Text style={styles.illustrationStyle}>{item.illustration_style}</Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        colors={["#4A90E2"]} // Android
                        tintColor="#4A90E2" // iOS
                    />
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
        marginTop: 30, // Add margin to the top
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        margin: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50',
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    genre: {
        fontSize: 14,
        color: '#E74C3C',
        marginBottom: 5,
    },
    ageGroup: {
        fontSize: 14,
        color: '#3498DB',
        marginBottom: 5,
    },
    illustrationStyle: {
        fontSize: 14,
        color: '#27AE60',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    createButton: {
        padding: 12, // Make the create button bigger by adding padding
    },
});