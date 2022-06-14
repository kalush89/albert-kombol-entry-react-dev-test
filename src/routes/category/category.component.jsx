import { Component } from "react";

import SwitchContext from "../../contexts/switch.context";


import CategoryTab from "../../components/category-tabs/category-tab/category-tab.component";


import './category.styles.scss';
class Category extends Component {
    static contextType = SwitchContext;
   

    handleSwitch = (activeTab) => {
        switch(activeTab){
            case 'all':
                return <CategoryTab category={'all'}/>;
            case 'tech':
                return <CategoryTab category={'tech'} />;
            case 'clothes':
                return <CategoryTab category={'clothes'}/>;
                default:
                    return console.log('Nothing in activeTab');
        }
    }

    render(){
        const { activeTab } = this.context;
        return(
            <div className="category-container">
                {this.handleSwitch(activeTab)}
            </div>
        );
    }
}

export default Category;