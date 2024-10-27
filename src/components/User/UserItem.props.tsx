import { User } from "../../types/types";

export interface UserItemProps {
    user: User;
    onDelete: (id: number) => void;
    onEdit: (id: number, newName: string) => void;
}