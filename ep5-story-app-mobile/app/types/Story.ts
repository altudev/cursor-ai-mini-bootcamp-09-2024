export interface Story {
    id: number;
    title: string;
    content: string;
    genre: 'Macera' | 'Fantastik' | 'Bilim Kurgu';
    target_age: '0-3 Yaş' | '4-6 Yaş' | '7-9 Yaş' | '10-12 Yaş';
    illustration_style: 'Anime' | 'Karikatür' | 'Gerçekçi';
    created_at: string;
    updated_at: string;
}
