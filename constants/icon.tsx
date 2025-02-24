import { Ionicons } from '@expo/vector-icons';

export const icon = {
    home: ({ color }: { color: string }) => (
        <Ionicons name="home-outline" size={24} color={color} />
    ),
    expense: ({ color }: { color: string }) => (
        <Ionicons name="stats-chart-outline" size={24} color={color} />
    ),
    history: ({ color }: { color: string }) => (
        <Ionicons name="wallet-outline" size={24} color={color} />
    ),
    profile: ({ color }: { color: string }) => (
        <Ionicons name="person-outline" size={24} color={color} />
    )
};