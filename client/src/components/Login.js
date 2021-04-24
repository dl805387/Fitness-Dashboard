import React, { useState, useEffect } from "react";

function Login(props) {

    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
        clearErrors,
        clearInputs
    } = props;

    return (
        <div className="App">
            <div>
                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={(e) => {setEmail(e.target.value)}} />
                <p>{emailError}</p>
                <label>Password</label>
                <input type="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} />
                <p>{passwordError}</p>

                <div>
                    {hasAccount ? (
                        <>
                            <button onClick={handleLogin}>Sign In</button>
                            <p>Don't have an account ? <span onClick={() => {setHasAccount(!hasAccount); clearErrors(); clearInputs();}}>Sign up</span></p>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignup}>Sign up</button>
                            <p>Have an account ? <span onClick={() => {setHasAccount(!hasAccount); clearErrors(); clearInputs();}}>Sign in</span></p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;