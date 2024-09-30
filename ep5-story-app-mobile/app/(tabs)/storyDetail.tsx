import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Story } from '../types/Story';

const API_ROUTE = 'https://storyapi.serikozgetir.com/stories';

export default function StoryDetailScreen() {
    const { story: storyParam, index: indexParam } = useLocalSearchParams() as { story: string; index: string; };
    const [storyData, setStoryData] = useState<Story | null>(null);
    const [currentIndex, setCurrentIndex] = useState(parseInt(indexParam, 10));
    const [stories, setStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchStories();
    }, []);

    useEffect(() => {
        if (stories.length > 0 && currentIndex >= 0 && currentIndex < stories.length) {
            setStoryData(stories[currentIndex]);
        }
    }, [currentIndex, stories]);

    const fetchStories = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_ROUTE);
            const data = await response.json();
            setStories(data);
            if (data.length > currentIndex) {
                setStoryData(data[currentIndex]);
            }
        } catch (error) {
            console.error('Error fetching stories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#4A90E2" />
            </SafeAreaView>
        );
    }

    if (!storyData) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>No story data available.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#4A90E2" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Story Details</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>{storyData.title}</Text>
                <View style={styles.metaContainer}>
                    <View style={styles.metaItem}>
                        <Ionicons name="book" size={16} color="#4A90E2" />
                        <Text style={styles.metaText}>{storyData.genre}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Ionicons name="people" size={16} color="#E74C3C" />
                        <Text style={styles.metaText}>{storyData.target_age}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Ionicons name="color-palette" size={16} color="#27AE60" />
                        <Text style={styles.metaText}>{storyData.illustration_style}</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.content}>{storyData.content}</Text>
                </View>
            </ScrollView>
            <View style={styles.navigationContainer}>
                <TouchableOpacity
                    onPress={handlePrevious}
                    style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
                    disabled={currentIndex === 0}
                >
                    <Ionicons name="chevron-back" size={24} color={currentIndex === 0 ? "#A0A0A0" : "#4A90E2"} />
                    <Text style={[styles.navButtonText, currentIndex === 0 && styles.disabledButtonText]}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleNext}
                    style={[styles.navButton, currentIndex === stories.length - 1 && styles.disabledButton]}
                    disabled={currentIndex === stories.length - 1}
                >
                    <Text style={[styles.navButtonText, currentIndex === stories.length - 1 && styles.disabledButtonText]}>Next</Text>
                    <Ionicons name="chevron-forward" size={24} color={currentIndex === stories.length - 1 ? "#A0A0A0" : "#4A90E2"} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
        marginTop: 35,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 10,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#7F8C8D',
    },
    contentContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: '#34495E',
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navButtonText: {
        fontSize: 16,
        color: '#4A90E2',
        marginHorizontal: 8,
    },
    disabledButton: {
        opacity: 0.5,
    },
    disabledButtonText: {
        color: '#A0A0A0',
    },
});