import { User } from "../../types/types";

export interface UserListProps {
    users: User[];
    favorites: User[];
    addToFavorites: (user: User) => void;
    removeFromFavorites: (user: User) => void;
    handleDelete: (id: number) => void;
}