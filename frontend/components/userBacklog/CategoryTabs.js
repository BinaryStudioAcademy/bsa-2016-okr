import React from 'react';

import './CategoryTabs.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as categoriesActions from "../../actions/categoriesActions.js";
import * as userBacklogActions from "../../actions/userBacklogActions";
import * as myStateActions from '../../actions/myStateActions';

class CategoryTabs extends React.Component{

    constructor(props) {
        super(props);

        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(category, index) {
        let active = document.querySelectorAll('.tabLine li.tab');

        for(let i = 0; i < active.length; i++) {
            active[i].blur();
        }

        this.props.userBacklogActions.setActiveTab(index);
        this.props.selectCategory(category);
    }

    activeTab(index) {
        return index === this.props.userBacklog.categoryTabIndex ? 'active' : '';
    }

    getCategories() {
        let cats = this.props.categories.list;
        return cats.filter(category => category.isDeleted === false);
    }

    render() {
        let cats = this.getCategories();

        return (
            <div className="">
                <div className="category-tabs">
                    <div className="tab-wrapper mainTabs">
                        <ul className="tabLine">
                            { cats.map((category, i) => {
                                return <li key={i} className={ this.activeTab(i) + " tab"} onClick={ () => this.handleTabClick(category, i) }
                                           tabIndex={i}>{ category.title }</li>
                            }) }
                        </ul>
                    </div>
                </div>
            </div>
       )
    }
}



function mapDispatchToProps(dispatch) {
    return {
        categoriesActions: bindActionCreators(categoriesActions, dispatch),
        myStateActions: bindActionCreators(myStateActions, dispatch),
        userBacklogActions: bindActionCreators(userBacklogActions, dispatch),
    };
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
        userBacklog: state.userBacklog,
        myState: state.myState
    };
}

const TabsConnected = connect(mapStateToProps, mapDispatchToProps)(CategoryTabs);

export default TabsConnected;