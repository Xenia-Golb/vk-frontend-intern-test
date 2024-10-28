import UserList from "./components/UserList/UserList";
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">GitHub Users</h1>
      <UserList />
    </div>
  );
}

export default App;
