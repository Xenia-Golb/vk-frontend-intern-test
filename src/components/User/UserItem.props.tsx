import { User } from "../../types/types";

export interface UserItemProps {
    user: User;
    onDelete: (id: number) => void;
    onEdit: (user: { id: number; login: string; avatar_url: string; html_url: string; }) => void;
    isFavorite?: boolean;
}