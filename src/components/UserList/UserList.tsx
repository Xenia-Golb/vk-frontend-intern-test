import UserItem from '../User/UserItem';
import { UserListProps } from './UserList.props';
import styles from '../UserList/UserList.module.css'

function UserList({ users, favorites, addToFavorites, removeFromFavorites, handleDelete }: UserListProps) {
    return (
        <div className={styles.users}>
            {users.map(user => (
                <UserItem
                    key={user.id}
                    user={user}
                    isFavorite={favorites.some(fav => fav.id === user.id)}
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                    handleDelete={handleDelete}
                />
            ))}
        </div>)
}

export default UserList;