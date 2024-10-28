import UserList from "./components/UserList/UserList"


function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>GitHub Users</h1>
      <UserList />
    </div>
  )
}

export default App
