import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showFormSplit, setShowFormSplit] = useState(false);
  const [currntUser, setCurrentUser] = useState();

  function handelOpenAddFriend() {
    setShowAddFriend(!showAddFriend);
  }
  function handeAddFriend(fr) {
    setFriendsList([...friendsList, fr]);
  }
  function handelCurrntUser(id) {
    if (showFormSplit) {
      setCurrentUser(...friendsList.filter((friend) => friend.id === id));
    } else {
      setCurrentUser(...friendsList.filter((friend) => friend.id === id));
      setShowFormSplit(!showFormSplit);
    }
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsList={friendsList}
          onCurrntUser={handelCurrntUser}
          currntUser={currntUser}
          showAddFriend={() => setShowFormSplit(!showFormSplit)}
        />
        {showAddFriend && (
          <FormAddFriend
            onAddFriend={handeAddFriend}
            showAddFriend={handelOpenAddFriend}
          />
        )}
        <Button onclick={handelOpenAddFriend}>
          {!showAddFriend ? "Add friend" : "Close"}
        </Button>
      </div>
      {showFormSplit ? <FormSplitBill user={currntUser} /> : null}
    </div>
  );
}

function Button({ children, onclick }) {
  return (
    <button className="button" onClick={onclick}>
      {children}
    </button>
  );
}
function FriendsList({ friendsList, onCurrntUser, currntUser, showAddFriend }) {
  return (
    <ul className="list">
      {friendsList.map((friend) => (
        <Friend
          currntUser={currntUser}
          friend={friend}
          key={friend.id}
          onCurrntUser={onCurrntUser}
          showAddFriend={showAddFriend}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onCurrntUser, currntUser, showAddFriend }) {
  return (
    <li className={currntUser?.id === friend.id ? "selected" : null}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="red">
          You owe{friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance < 0 && (
        <p className="green">
          {friend.name} ows you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && (
        <p className="white">You end {friend.name} are even</p>
      )}
      {currntUser?.id === friend.id ? (
        <Button onclick={showAddFriend}>Close</Button>
      ) : (
        <Button onclick={() => onCurrntUser(friend.id)}>Select</Button>
      )}
    </li>
  );
}

function FormAddFriend({ onAddFriend, showAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=118836");
  function handelAddFriendSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID;
    const newFriend = {
      id: id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    if (!name || !image) return;

    onAddFriend(newFriend);
    showAddFriend();
    setName("");
    setImage("https://i.pravatar.cc/48?u=118836");
  }
  return (
    <form className="form-add-friend" onSubmit={handelAddFriendSubmit}>
      <label>👨‍👨‍👦‍👦 Friend Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <label>🌄 Image URL</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ user }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X </h2>
      <label>🤑 Bill value</label>
      <input type="text" />

      <label>🧍‍♂️ Your expense</label>
      <input type="text" />

      <label>🧑‍🤝‍🧑 {user.name}' expense</label>
      <input type="text" disabled />

      <label>🤑 How is paynig the bill</label>
      <select>
        <option value="user">you</option>
        <option value="friedn">{user.name}'</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
