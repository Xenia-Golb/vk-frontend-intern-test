import Card from "antd/es/card/Card";
import { UserItemProps } from "./UserItem.props";
import Avatar from "antd/es/avatar/avatar";
import { Button } from "antd/es/radio";
import Input from "antd/es/input/Input";
import { useState } from "react";

function User({ user, onDelete, onEdit }: UserItemProps) {
    const [editName, setEditName] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleEdit = () => {
        if (editName) {
            onEdit(user.id, editName);
            setIsEditing(false);
            setEditName('');
        }
    };
    return (
        <Card style={{ marginBottom: '16px' }}>
            <Avatar src={user.avatar_url} alt={user.login}
                size={100}
            />
            <h3>{user.login}</h3>
            <p>Public Repositories: {user.id}</p>
            {[
                <Button onClick={() => onDelete(user.id)}>Delete</Button>,
                isEditing ? (
                    <>
                        <Input
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            placeholder="New Name"
                        />
                        <Button onClick={handleEdit}>Save</Button>
                    </>
                ) : (
                    <Button onClick={() => { setEditName(user.login); setIsEditing(true); }}>Edit</Button>
                ),
            ]}

        </Card>
    );
}

export default User;