import { UserItemProps } from "./UserItem.props";
import Avatar from "antd/es/avatar/avatar";
import { DeleteOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import styles from './User.module.css';
import { useState, useEffect } from "react";

function User({ user, onDelete, onEdit, onRemoveFromFavorites, favorites }: UserItemProps) {
    // Проверяем, является ли пользователь избранным при загрузке
    const [isActive, setIsActive] = useState<boolean>(
        favorites.some(fav => fav.id === user.id)
    );

    const handleEditClick = () => {
        if (isActive) {
            // Удаляем пользователя из избранного и localStorage
            onRemoveFromFavorites(user); // Вызов для удаления из избранного
            setIsActive(false); // Обновляем состояние иконки
        } else {
            // Добавляем пользователя в избранное
            onEdit(user);
            setIsActive(true); // Обновляем состояние иконки
        }
    };

    const handleDeleteClick = () => {
        onDelete(user.id);
    };

    useEffect(() => {
        // Обновляем состояние при изменении списка избранного
        setIsActive(favorites.some(fav => fav.id === user.id));
    }, [favorites, user.id]);

    return (
        <div className={styles.card}>
            <Avatar
                src={user.avatar_url}
                alt={user.login}
                size={100}
            />
            <a
                className={styles.link}
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {user.login}
            </a>
            <div className={styles.icons}>
                {/* Отображаем красное сердечко, если пользователь в избранном */}
                {isActive ? (
                    <HeartFilled
                        className={styles.active}
                        onClick={handleEditClick}
                        style={{ color: 'red' }}
                    />
                ) : (
                    <HeartOutlined
                        className={styles.edit}
                        onClick={handleEditClick}
                    />
                )}
                <DeleteOutlined
                    className={styles.delete}
                    onClick={handleDeleteClick}
                />
            </div>
        </div>
    );
}

export default User;
