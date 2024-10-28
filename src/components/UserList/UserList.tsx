import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { message, Spin } from 'antd'; import { User } from '../../types/types';
import UserItem from '../User/UserItem';
import styles from './UserList.module.css'
import Icon from '@ant-design/icons';


function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [favorites, setFavorites] = useState<User[]>(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get<User[]>(`https://api.github.com/users?since=${page * 12}&per_page=10`);
            setUsers(user => [...user, ...response.data]);
        } catch (error) {
            console.error('Error fetching data:', error);
            message.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 20 && !loading) {
            setPage(prev => prev + 1);
        }
    };
    const handleDelete = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
        message.success('User deleted');
    };
    const addToFavorites = (user: User) => {
        if (!favorites.find(fav => fav.id === user.id)) {
            setFavorites([...favorites, user]);
        }
    };
    useEffect(() => {
        fetchUsers();

    }, [fetchUsers]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <div className={styles['users']}>
            {users.map(user => {
                return (
                    <UserItem
                        key={user.id}
                        user={user}
                        onDelete={handleDelete}
                        onEdit={addToFavorites}
                    />
                );
            })
            }
            {loading &&
                <Spin fullscreen={loading}
                    tip="Loading..."
                    indicator={<Icon type="loading" spin />}
                />}

        </div>
    );
};


export default UserList;