import { UserItemProps } from "./UserItem.props";
import Avatar from "antd/es/avatar/avatar";
import { DeleteOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import styles from './User.module.css';

function UserItem({ user, isFavorite, addToFavorites, removeFromFavorites, handleDelete }: UserItemProps) {

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFromFavorites(user);
        } else {
            addToFavorites(user);
        }
    };

    return (
        <div className={styles.card}>
            <Avatar src={user.avatar_url} alt={user.login} size={100} />
            <a className={styles.link} href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
            </a>
            <div className={styles.icons}>
                {isFavorite ? (
                    <HeartFilled className={styles.active} onClick={handleFavoriteClick} style={{ color: 'red' }} />
                ) : (
                    <HeartOutlined className={styles.edit} onClick={handleFavoriteClick} />
                )}
                <DeleteOutlined className={styles.delete} onClick={() => handleDelete(user.id)} />
            </div>
        </div>
    );
};

export default UserItem;