import { render, screen, fireEvent } from '@testing-library/react';
import UserItem from '../components/User/UserItem';
import '@testing-library/jest-dom';

// Пример объекта пользователя для тестирования
const user = {
    id: 1,
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.jpg',
    html_url: 'https://github.com/testuser',
};

// Мок-функции для пропсов
const addToFavorites = jest.fn();
const removeFromFavorites = jest.fn();
const handleDelete = jest.fn();

const renderComponent = (isFavorite: boolean) => {
    render(
        <UserItem
            user={user}
            isFavorite={isFavorite}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            handleDelete={handleDelete}
        />
    );
};

describe('UserItem Component', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Очищаем вызовы мок-функций после каждого теста
    });

    test('renders user information correctly', () => {
        renderComponent(false);
        const avatar = screen.getByAltText('testuser');
        const usernameLink = screen.getByRole('link', { name: /testuser/i });

        expect(avatar).toBeInTheDocument();
        expect(usernameLink).toHaveAttribute('href', 'https://github.com/testuser');
    });

    test('calls addToFavorites when heart icon is clicked and user is not favorite', () => {
        renderComponent(false);
        const heartIcon = screen.getByLabelText('Add to favorites');
        fireEvent.click(heartIcon);

        expect(addToFavorites).toHaveBeenCalledWith(user);
        expect(addToFavorites).toHaveBeenCalledTimes(1);
    });

    test('calls removeFromFavorites when heart icon is clicked and user is favorite', () => {
        renderComponent(true);
        const heartIcon = screen.getByLabelText('Remove from favorites');
        fireEvent.click(heartIcon);

        expect(removeFromFavorites).toHaveBeenCalledWith(user);
        expect(removeFromFavorites).toHaveBeenCalledTimes(1);
    });

    test('calls handleDelete when delete icon is clicked', () => {
        renderComponent(false);
        const deleteIcon = screen.getByLabelText('Delete user');
        fireEvent.click(deleteIcon);

        expect(handleDelete).toHaveBeenCalledWith(user.id);
        expect(handleDelete).toHaveBeenCalledTimes(1);
    });
});
