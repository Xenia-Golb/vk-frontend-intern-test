import { UserItemProps } from "./UserItem.props";
import Avatar from "antd/es/avatar/avatar";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import styles from './User.module.css'


function User({ user, onDelete, onEdit }: UserItemProps) {
    return (
        <div className={styles['card']}>
            <Avatar src={user.avatar_url}
                alt={user.login}
                size={100}
            />
            <a className={styles['link']} href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
            </a>
            <HeartOutlined
                key="edit"
                className={styles['edit']}
                onClick={() => onEdit(user)}
            />
            <DeleteOutlined
                key="delete"
                className={styles['delete']}

                onClick={() => onDelete(user.id)}
            />

        </div>
    );
}

export default User;