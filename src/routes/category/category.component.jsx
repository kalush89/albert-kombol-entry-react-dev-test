import { Component } from "react";
import { connect } from "react-redux";

import CategoryTab from "../../components/category-tabs/category-tab/category-tab.component";


import './category.styles.scss';
class Category extends Component {
   

    handleSwitch = (activeTab) => {
        switch(activeTab){
            case 'all':
                return <CategoryTab category={'all'}/>;
            case 'tech':
                return <CategoryTab category={'tech'} />;
            case 'clothes':
                return <CategoryTab category={'clothes'}/>;
            default:
                return <CategoryTab category={'all'}/>;
        }
    }

    render(){
        const { activeCategory } = this.props;
        return(
            <div className="category-container">
                {this.handleSwitch(activeCategory)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { activeCategory } = state.categories;
    return {
        activeCategory: activeCategory,
    }
};

export default connect(mapStateToProps, null)(Category);