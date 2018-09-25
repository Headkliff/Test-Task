import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class ToolsPanel extends Component {
    render() {
        return (
            <div>
                <nav id="tools-panel">
                    <ul>
                        <li>
                            <Link to="/posts/new"><i className="fa fa-tachometer"></i> Add post</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
