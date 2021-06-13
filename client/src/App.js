import './App.css';
import React, { useState, useEffect } from "react";
import fire from './fire';
import Login from './components/Login';
import Panel from './components/Panel';
const axios = require('axios').default;

function App() {

    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);

    const [userID, setUserID] = useState(0);

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
        let isError = false;
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                isError = true;
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
            }).then(() => {
                if (!isError) {
                    getUserID(email);
                }
            });
    }

    const handleSignup = () => {
        clearErrors();
        let isError = false;
        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                isError = true;
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            }).then(() => {
                //Only add new user to database if there are no errors with firebase.
                if (!isError) {
                    // When user successfully sign up, they will be added to database
                    axios.post('https://workout-journal-dl.herokuapp.com/addUser', {
                        username: email
                    }).then(() => {
                        // get the userID
                        getUserID(email);
                        //console.log("success");
                    });
                } 
            });
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

    // get user id based on email
    // this is used if "user" has not been set yet
    const getUserID = (email) => {
        if (email && email !== "") {
            axios.post('https://workout-journal-dl.herokuapp.com/getUserInfo', {
                username: email
            }).then((res) => {
                if (res.data[0]) {
                    setUserID(res.data[0].userID);
                    //console.log("success");
                }
            });
        }
    }

    useEffect(() => {
        // if the user id hasnt changed then it will try again
        if (userID === 0 && user !== "") {   
            axios.post('https://workout-journal-dl.herokuapp.com/getUserInfo', {
                username: user.email
            }).then((res) => {
                if (res.data[0]) {
                    setUserID(res.data[0].userID);
                    //console.log("success");
                }
            });
        }
    }, [user]);

    return (
        <div>
            {user ? (
                <div>
                    <div className="profile"> 
                        <p>Welcome, {user.email} </p>
                        <button className="roundedBtn" onClick={()=> {handleLogout(); setUserID(0)}}>Logout</button>
                    </div>

                    <div>
                        {userID !== 0 && (<Panel userID = {userID} />)}
                    </div>      

                </div>
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
