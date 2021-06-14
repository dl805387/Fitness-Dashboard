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
    // this is used to take the user to a loading page while server is "asleep"
    const [sleep, setSleep] = useState(true);

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

    // takes the username and removes everything after the @ symbol
    const greeting = (str) => {
        return "Welcome, " + str.split("@")[0];
    }

    useEffect(() => {
        // call to server to wake up heroku hosting
        axios.get('https://workout-journal-dl.herokuapp.com/').then(() => {
            setSleep(false);
        });
    }, []);

    return (
        <div>
            {sleep && (
                <div className="sleepCover">
                    <div className="sleepScreen">
                        <div className="col-3">
                            <div className="snippet" data-title=".dot-spin">
                                <div className="stage">
                                    <div className="dot-spin"></div>
                                </div>
                            </div>
                        </div>
                        <p>Connecting to server</p>
                        <p>Please wait a few seconds</p>
                        <p>Backend hosted on Heroku</p>
                    </div>
                </div>
            )}


            {user ? (
                <div>
                    <div className="profile"> 
                        <p>{greeting(user.email)}</p>
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
