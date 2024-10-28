import { render, screen } from '@testing-library/react';
import UserList from '../components/UserList/UserList';
import '@testing-library/jest-dom';

describe('UserList Component', () => {
    test('renders title correctly', () => {
        render(<UserList />);
        const titleElement = screen.getByText(/GitHub Users/i);
        expect(titleElement).toBeInTheDocument();
    });

    test('renders list of users', async () => {
        render(<UserList />);
        const userItems = await screen.findAllByRole('listitem');
        expect(userItems).not.toHaveLength(0); // 
    });
});
