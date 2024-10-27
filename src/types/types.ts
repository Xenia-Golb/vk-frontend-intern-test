export interface User {
    id: number;
    login: string;
    avatar_url: string;
    public_repos: number; // Количество репозиториев
}