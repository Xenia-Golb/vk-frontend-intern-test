import { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Select, Skeleton } from 'antd';
import { User } from '../../types/types';
import UserItem from '../User/UserItem';
import styles from './UserList.module.css';

const { Option } = Select;

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState<User[]>(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [filter, setFilter] = useState<'all' | 'favorites'>('all');

    const fetchUsers = async (resetPage = false) => {
        if (filter === 'favorites') return;

        setLoading(true);
        try {
            const currentPage = resetPage ? 1 : page;
            const response = await axios.get<User[]>(`https://api.github.com/users?since=${currentPage * 5}&per_page=10`);
            const uniqueUsers = response.data.filter((user, index, self) =>
                index === self.findIndex((u) => u.id === user.id)
            );

            setUsers(prevUsers => resetPage ? uniqueUsers : [
                ...prevUsers,
                ...uniqueUsers.filter(u => !prevUsers.find(p => p.id === u.id))
            ]);

            if (resetPage) setPage(2);
        } catch (error) {
            console.error('Error fetching data:', error);
            message.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 20 && !loading && filter === 'all') {
            setPage(prev => prev + 1);
        }
    };

    const handleDelete = (id: number) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        message.success('User deleted');
    };

    const addToFavorites = (user: User) => {
        if (!favorites.find(fav => fav.id === user.id)) {
            const updatedFavorites = [...favorites, user];
            setFavorites(updatedFavorites);
            message.success('User added to favorites');
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    };

    const handleRemoveFromFavorites = (user: User) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== user.id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        message.success('User removed from favorites');
    };

    useEffect(() => {
        if (filter === 'all') {
            setUsers([]);
            setPage(1);
            fetchUsers(true);
        } else {
            const savedFavorites = localStorage.getItem('favorites');
            if (savedFavorites) {
                setUsers(JSON.parse(savedFavorites));
            }
        }
    }, [filter]);

    useEffect(() => {
        if (filter === 'all' && page > 1) {
            fetchUsers();
        }
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, filter]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <>
            <div className={styles.header}>
                <Select
                    defaultValue="all"
                    style={{ width: 120 }}
                    onChange={value => setFilter(value as 'all' | 'favorites')}
                >
                    <Option value="all">All</Option>
                    <Option value="favorites">Favorites</Option>
                </Select>
            </div>
            <div className={styles.users}>
                {loading && users.length === 0 ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton key={index} active avatar title paragraph={{ rows: 1 }} className="skeleton-fade" />
                    ))
                ) : (
                    users.map(user => (
                        <UserItem
                            key={user.id}
                            user={user}
                            favorites={favorites}
                            onDelete={handleDelete}
                            onEdit={addToFavorites}
                            onRemoveFromFavorites={handleRemoveFromFavorites}
                        />
                    ))
                )}
            </div>
        </>
    );
}

export default UserList;
