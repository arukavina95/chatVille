import React, { useState } from "react";

function UserLogin({ onUserLogin }) {
  const [username, setUsername] = useState("");

  const handleNewMember = (e) => {
    const changeMember = e.target.value;
    setUsername(changeMember);
  };

  const handleSubmitMember = (e) => {
    e.preventDefault();
    onUserLogin(username.trimEnd().trimStart());
    setUsername("");
  };

  return (
    <div className="Login">
      <h1>Welcome to ChatVille</h1>
      <form className="EnterUsername" onSubmit={handleSubmitMember}>
        <input
          onChange={handleNewMember}
          placeholder="Enter your username"
          value={username}
          autoFocus={true}
        />
        {username !== "" ? (
          <button type="submit">Login</button>
        ) : (
          <button type="submit" disabled>
            Login
          </button>
        )}
      </form>
    </div>
  );
}

export default UserLogin;
