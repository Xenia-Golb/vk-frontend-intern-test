import { render, screen, fireEvent } from '@testing-library/react';
import UserList from '../components/UserList/UserList';
// import { UserListProps } from '../UserList/UserList.props';
import '@testing-library/jest-dom';

const users = [
    {
        id: 1,
        login: 'testuser1',
        avatar_url: 'https://example.com/avatar1.jpg',
        html_url: 'https://github.com/testuser1',
    },
    {
        id: 2,
        login: 'testuser2',
        avatar_url: 'https://example.com/avatar2.jpg',
        html_url: 'https://github.com/testuser2',
    },
];

// Мок-функции для пропсов
const addToFavorites = jest.fn();
const removeFromFavorites = jest.fn();
const handleDelete = jest.fn();

const renderComponent = (favorites: typeof users) => {
    render(
        <UserList
            users={users}
            favorites={favorites}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            handleDelete={handleDelete}
        />
    );
};

describe('UserList Component', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Очищаем вызовы мок-функций после каждого теста
    });

    test('renders all users correctly', () => {
        renderComponent([]);
        users.forEach(user => {
            const avatar = screen.getByAltText(user.login);
            const usernameLink = screen.getByRole('link', { name: user.login });

            expect(avatar).toBeInTheDocument();
            expect(usernameLink).toHaveAttribute('href', user.html_url);
        });
    });

    test('marks users as favorite when they are in the favorites list', () => {
        renderComponent([users[0]]); // Добавляем первого пользователя в избранное

        // Проверяем, что первый пользователь отображается как избранный
        const heartFilled = screen.getByLabelText('Remove from favorites');
        expect(heartFilled).toBeInTheDocument();

        // Проверяем, что второй пользователь не отображается как избранный
        const heartOutlined = screen.getAllByLabelText('Add to favorites');
        expect(heartOutlined.length).toBe(1);
    });

    test('calls addToFavorites and removeFromFavorites correctly', () => {
        renderComponent([users[0]]); // Первый пользователь в избранном, второй - нет

        // Кликаем по иконке избранного второго пользователя
        const heartIconToAdd = screen.getAllByLabelText('Add to favorites')[0];
        fireEvent.click(heartIconToAdd);
        expect(addToFavorites).toHaveBeenCalledWith(users[1]);

        // Кликаем по иконке избранного первого пользователя
        const heartIconToRemove = screen.getByLabelText('Remove from favorites');
        fireEvent.click(heartIconToRemove);
        expect(removeFromFavorites).toHaveBeenCalledWith(users[0]);
    });

    test('calls handleDelete correctly when delete icon is clicked', () => {
        renderComponent([]);

        const deleteIcons = screen.getAllByLabelText('Delete user');
        fireEvent.click(deleteIcons[0]); // Удаляем первого пользователя
        expect(handleDelete).toHaveBeenCalledWith(users[0].id);

        fireEvent.click(deleteIcons[1]); // Удаляем второго пользователя
        expect(handleDelete).toHaveBeenCalledWith(users[1].id);
    });
});
