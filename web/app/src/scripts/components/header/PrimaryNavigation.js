import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class PrimaryNavigation extends Component {
    render() {
        return (
            <div>
                <nav id="primary-navigation">
                    <ul>
                        <li>
                            <Link to="/posts"><i className="fa fa-tachometer"></i> Posts</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
