import React, { Component } from 'react';
import PrimaryNavigation from './PrimaryNavigation';
import ToolsPanel from './ToolsPanel';

export default class StartTop extends Component {
    render() {
        return (
            <div>
                <header id="masthead">
                    <div className="row">                        
                        <div className="col-sm-10 col-xs-10">
                            <PrimaryNavigation />
                        </div>                   
                        <div className="col-sm-2 col-xs-2">
                            <ToolsPanel />
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
