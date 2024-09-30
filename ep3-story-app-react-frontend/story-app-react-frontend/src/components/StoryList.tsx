import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Toaster, toast } from 'react-hot-toast';

interface Story {
    id: number;
    title: string;
    content: string;
    genre: string;
    target_age: string;
    illustration_style: string;
    created_at: string;
    updated_at: string;
}

interface NewStory {
    title: string;
    genre: string;
    target_age: string;
    illustration_style: string;
}

const API_BASE_URL = 'http://127.0.0.1:8000';

const genreOptions = ['Macera', 'Fantastik', 'Bilim Kurgu'];
const targetAgeOptions = ['0-3 Yaş', '4-6 Yaş', '7-9 Yaş', '10-12 Yaş'];
const illustrationStyleOptions = ['Anime', 'Karikatür', 'Gerçekçi'];

function StoryList() {
    const [stories, setStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newStory, setNewStory] = useState<NewStory>({
        title: '',
        genre: '',
        target_age: '',
        illustration_style: '',
    });
    const { theme } = useTheme();
    const [isNarrating, setIsNarrating] = useState(false);
    const synthRef = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        fetchStories();
    }, []);

    useEffect(() => {
        synthRef.current = window.speechSynthesis;
        return () => {
            if (synthRef.current) {
                synthRef.current.cancel();
            }
        };
    }, []);

    async function fetchStories() {
        try {
            const response = await fetch(`${API_BASE_URL}/stories`);
            if (!response.ok) throw new Error('Failed to fetch stories');
            const data = await response.json();
            setStories(data);
        } catch (err) {
            setError('Failed to load stories. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteStory(id: number) {
        if (!confirm('Are you sure you want to delete this story?')) return;

        try {
            const response = await fetch(`${API_BASE_URL}/stories/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete story');
            setStories(stories.filter((story) => story.id !== id));
        } catch (err) {
            setError('Failed to delete story. Please try again.');
        }
    }

    function viewStory(story: Story) {
        setSelectedStory(story);
    }

    function closeModal() {
        setSelectedStory(null);
        setIsCreateModalOpen(false);
        stopNarration();
    }

    function handleInputChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setNewStory((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/stories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStory),
            });
            if (!response.ok) throw new Error('Failed to create story');
            const createdStory = await response.json();
            setStories((prev) => [...prev, createdStory]);
            setIsCreateModalOpen(false);
            setNewStory({
                title: '',
                genre: '',
                target_age: '',
                illustration_style: '',
            });
            toast.success('Story created successfully!');
        } catch (err) {
            setError('Failed to create story. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    function startNarration() {
        if (!selectedStory || !synthRef.current) return;

        utteranceRef.current = new SpeechSynthesisUtterance(selectedStory.content);
        utteranceRef.current.onend = () => setIsNarrating(false);
        synthRef.current.speak(utteranceRef.current);
        setIsNarrating(true);
    }

    function stopNarration() {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsNarrating(false);
        }
    }

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );

    if (error)
        return <div className="alert alert-error shadow-lg">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <Toaster />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Story List</h1>
                <button
                    className="btn btn-primary animate-pulse hover:animate-none"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Create a new story
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Target Age</th>
                            <th>Illustration Style</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stories.map((story) => (
                            <tr key={story.id} className="hover">
                                <td>{story.title}</td>
                                <td>{story.genre}</td>
                                <td>{story.target_age}</td>
                                <td>{story.illustration_style}</td>
                                <td>{new Date(story.created_at).toLocaleDateString()}</td>
                                <td>
                                    <div className="flex space-x-2">
                                        <button
                                            className="btn btn-sm btn-info"
                                            onClick={() => viewStory(story)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => alert(`Edit story ${story.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => deleteStory(story.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedStory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                    <div className="modal-box w-11/12 max-w-4xl">
                        <h3 className="font-bold text-lg mb-4">{selectedStory.title}</h3>
                        <div className="prose max-w-none overflow-y-auto max-h-[60vh]">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {selectedStory.content}
                            </ReactMarkdown>
                        </div>
                        <div className="modal-action">
                            {!isNarrating ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={startNarration}
                                >
                                    Start Narration
                                </button>
                            ) : (
                                <button
                                    className="btn btn-secondary"
                                    onClick={stopNarration}
                                >
                                    Stop Narration
                                </button>
                            )}
                            <button className="btn" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                    <div className="modal-box w-11/12 max-w-4xl transform transition-all duration-300 ease-in-out scale-90 animate-in">
                        <h3 className="font-bold text-lg mb-4">Create a New Story</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newStory.title}
                                    onChange={handleInputChange}
                                    className="input input-bordered transition-all duration-300 focus:ring focus:ring-opacity-50"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Genre</span>
                                </label>
                                <select
                                    name="genre"
                                    value={newStory.genre}
                                    onChange={handleInputChange}
                                    className="select select-bordered transition-all duration-300 focus:ring focus:ring-opacity-50"
                                    required
                                >
                                    <option value="">Select a genre</option>
                                    {genreOptions.map((genre) => (
                                        <option key={genre} value={genre}>
                                            {genre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Target Age</span>
                                </label>
                                <select
                                    name="target_age"
                                    value={newStory.target_age}
                                    onChange={handleInputChange}
                                    className="select select-bordered transition-all duration-300 focus:ring focus:ring-opacity-50"
                                    required
                                >
                                    <option value="">Select a target age</option>
                                    {targetAgeOptions.map((age) => (
                                        <option key={age} value={age}>
                                            {age}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Illustration Style</span>
                                </label>
                                <select
                                    name="illustration_style"
                                    value={newStory.illustration_style}
                                    onChange={handleInputChange}
                                    className="select select-bordered transition-all duration-300 focus:ring focus:ring-opacity-50"
                                    required
                                >
                                    <option value="">Select an illustration style</option>
                                    {illustrationStyleOptions.map((style) => (
                                        <option key={style} value={style}>
                                            {style}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-action">
                                <button
                                    type="submit"
                                    className="btn btn-primary transition-all duration-300 hover:scale-105"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Creating...' : 'Create Story'}
                                </button>
                                <button
                                    type="button"
                                    className="btn transition-all duration-300 hover:scale-105"
                                    onClick={closeModal}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StoryList;