import React, { Component } from 'react'

class UserWelcome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: true
        }
    }

    render() {

        return this.state.isLoggedIn && <div>Welcome, User</div>

/*        return this.state.isLoggedIn ? (
            <div>Welcome, User</div>
        ) : (
            <div>Welcome, Guest</div>
        )*/

/*        let message
        if (this.state.isLoggedIn) {
            message = <div>Welcome, User</div>
        } else {
            message = <div>Welcome, Guest</div>
        }

        return <div>{message}</div>*/

/*        if (this.state.isLoggedIn) {
            return (
                <div>
                    Welcome, User
                </div>
            )
        } else {
            return (
                <div> Welcome, Guest </div>
            )
        }*/
    }
}

export default UserWelcome