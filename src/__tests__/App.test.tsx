import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';
import '@testing-library/jest-dom';
// import { act } from 'react-dom/test-utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Пример данных пользователя для тестирования
const mockUsers = [
    { id: 1, login: 'user1', avatar_url: 'avatar1.jpg', html_url: 'https://github.com/user1' },
    { id: 2, login: 'user2', avatar_url: 'avatar2.jpg', html_url: 'https://github.com/user2' },
];

describe('App Component', () => {
    beforeEach(() => {
        localStorage.clear();
        mockedAxios.get.mockResolvedValue({ data: mockUsers });
    });

    test('fetches and displays users on initial render', async () => {
        render(<App />);

        // Ожидаем, пока пользователи загрузятся
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

        // Проверяем, что пользователи отображаются
        expect(screen.getByText('user1')).toBeInTheDocument();
        expect(screen.getByText('user2')).toBeInTheDocument();
    });

    test('adds and removes users from favorites', async () => {
        render(<App />);

        // Ожидаем, пока пользователи загрузятся
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

        const addToFavoritesButton = screen.getAllByLabelText('Add to favorites')[0];
        fireEvent.click(addToFavoritesButton);

        // Проверяем, что пользователь добавлен в избранное
        expect(JSON.parse(localStorage.getItem('favorites')!)).toHaveLength(1);
        expect(screen.getByText('User added to favorites')).toBeInTheDocument();

        const removeFromFavoritesButton = screen.getAllByLabelText('Remove from favorites')[0];
        fireEvent.click(removeFromFavoritesButton);

        // Проверяем, что пользователь удален из избранного
        expect(JSON.parse(localStorage.getItem('favorites')!)).toHaveLength(0);
        expect(screen.getByText('User removed from favorites')).toBeInTheDocument();
    });

    test('filters users by favorites', async () => {
        render(<App />);

        // Добавляем пользователя в избранное
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
        fireEvent.click(screen.getAllByLabelText('Add to favorites')[0]);

        // Переключаем фильтр на "favorites"
        const filterSelect = screen.getByRole('combobox');
        fireEvent.change(filterSelect, { target: { value: 'favorites' } });

        // Проверяем, что отображаются только избранные пользователи
        expect(screen.getByText('user1')).toBeInTheDocument();
        expect(screen.queryByText('user2')).toBeNull();
    });

    test('displays loading skeleton while fetching users', async () => {
        mockedAxios.get.mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve({ data: mockUsers }), 1000)));

        render(<App />);

        // Проверяем, что отображается индикатор загрузки
        expect(screen.getAllByTestId('skeleton')).toHaveLength(12);

        // Ожидаем завершения загрузки
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
        expect(screen.queryByTestId('skeleton')).toBeNull();
    });

    test('deletes user from the list', async () => {
        render(<App />);

        // Ожидаем, пока пользователи загрузятся
        await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

        // Удаляем пользователя
        const deleteButton = screen.getAllByLabelText('Delete user')[0];
        fireEvent.click(deleteButton);

        // Проверяем, что пользователь удален из списка
        expect(screen.queryByText('user1')).toBeNull();
        expect(screen.getByText('User deleted')).toBeInTheDocument();
    });
});
