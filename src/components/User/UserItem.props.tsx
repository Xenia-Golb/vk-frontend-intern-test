import { User } from "../../types/types";

export interface UserItemProps {
    user: User;
    isFavorite: boolean;
    addToFavorites: (user: User) => void;
    removeFromFavorites: (user: User) => void;
    handleDelete: (id: number) => void;
}