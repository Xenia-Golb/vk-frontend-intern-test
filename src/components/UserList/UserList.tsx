import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Button, List, message } from 'antd'; import { User } from '../../types/types';
import UserItem from '../User/UserItem';

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [sortUser, setSortUser] = useState<'asc' | 'desc'>('asc');

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get<User[]>(`https://api.github.com/users?since=${page * 10}&per_page=30`);
            setUsers(prev => [...prev, ...response.data]);
        } catch (error) {
            console.error('Error fetching data:', error);
            message.error('Error fetching data');
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    const handleDelete = (id: number) => {
        setUsers(users.filter(repo => repo.id !== id));
        message.success('User deleted');
    };

    const handleEdit = (id: number, newName: string) => {
        setUsers(users.map(user => (user.id === id ? { ...user, name: newName } : user)));
        message.success('Login edited successfully');
    };

    // const sortedUsers = [...users].sort((a, b) => {
    //     return sortUser === 'asc' ? a.login.localeCompare(b.login) : b.login.localeCompare(a.login);
    // });

    return (
        <div>
            {/* <Button onClick={() => setSortUser(user => (user === 'asc' ? 'desc' : 'asc'))}>
                Sort by Name ({sortUser})
            </Button> */}
            <List
                bordered
                dataSource={users}
                renderItem={user => (
                    <UserItem user={user}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                )}
            />
            {loading && <p>Loading...</p>}
        </div>
    );
};


export default UserList;