import './App.css';
import React, { useState, useEffect } from "react";
import fire from './fire';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
const axios = require('axios').default;

function App() {

    // remember to remove all console logs before you submit

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);

    // These states below are used for dashboard to get user id
    const [user_id, setUser_id] = useState(0);
    const [username, setUsername] = useState("");

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    }

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    }

    const handleLogin = () => {
        clearErrors();
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            });
        
        setUsername(email);
    }

    const handleSignup = () => {
        clearErrors();
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });

        // when user sign up, this adds the username to db
        axios.post('http://localhost:3001/addUser', {
            username: email
        }).then(() => {
            console.log("success");
        });

        setUsername(email);
    }

    const handleLogout = () => {
        fire.auth().signOut();
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        });
    } 

    useEffect(() => {
        authListener();
    }, []);

    return (
        <div className="App">
            {user ? (
                <Dashboard 
                    handleLogout = {handleLogout} 
                    user_id = {user_id} 
                    setUser_id = {setUser_id}
                    username = {username} 
                    setUsername = {setUsername} 
                />
            ) : (
                <Login 
                    email = {email}
                    setEmail = {setEmail}
                    password = {password}
                    setPassword = {setPassword}
                    handleLogin = {handleLogin}
                    handleSignup = {handleSignup}
                    hasAccount = {hasAccount}
                    setHasAccount = {setHasAccount}
                    emailError = {emailError}
                    passwordError = {passwordError}
                    clearErrors = {clearErrors}
                    clearInputs = {clearInputs}
                />
            )}
        </div>
    ); 
}

export default App;
