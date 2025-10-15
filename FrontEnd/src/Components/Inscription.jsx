import React from 'react'
import { useState } from 'react';
import axios from 'axios';

function Inscription() {
    const [name,setName]=useState('');
    const [login,setLogin]=useState('')
    const [password,setPassword]=useState('')
    const [passwordConf,setPasswordConf]=useState('')
    const [email,setEmail]=useState('')
    const [role,setRole]=useState('')

    const submit = async (e) => {
      e.preventDefault();
      console.log(name, login, password, passwordConf, email, role);
      if (password !== passwordConf) {
        alert("passwords don't match");
      } else {
        const user = { name, login, password, email, role };
        console.log(user);
        try {
          const r = await axios.post("http://127.0.0.1:5000/register", user);
          console.log(r.data);
          const token = r.data.token;
            localStorage.setItem("token", token);
            alert("user registered");
        } catch (error) {
          console.log(error);
        }
      }
    };
  return (
    <div>
      <form action="">
        <h2 className="title">Inscription</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="login"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <div className="password">
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="confirm password"
            value={passwordConf}
            onChange={(e) => {
              setPasswordConf(e.target.value);
            }}
          />
        </div>
        <select
          name="role"
          id="role"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option value="user">user</option>
          <option value="editor">dev</option>
          <option value="admin">admin</option>
        </select>
        <button className="subbtn" type="submit" onClick={submit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Inscription