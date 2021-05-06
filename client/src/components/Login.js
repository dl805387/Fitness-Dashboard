import React from "react";

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
        <div>
            <div className="loginSection">
                <label>Username</label>
                <input className="inputStyle" type="text" placeholder="pseudo email" autoFocus required value={email} onChange={(e) => {setEmail(e.target.value)}} />
                <p className="error">{emailError}</p>
                <label>Password</label>
                <input className="inputStyle" type="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} />
                <p className="error">{passwordError}</p>

                <div>
                    {hasAccount ? (
                        <>
                            <button className="purpleBtn" onClick={handleLogin}>Sign In</button>
                            <p>Don't have an account ? <span className="grayBtn" onClick={() => {setHasAccount(!hasAccount); clearErrors(); clearInputs();}}>Sign Up</span></p>
                        </>
                    ) : (
                        <>
                            <button className="purpleBtn" onClick={handleSignup}>Sign Up</button>
                            <p>Have an account ? <span className="grayBtn" onClick={() => {setHasAccount(!hasAccount); clearErrors(); clearInputs();}}>Sign In</span></p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;