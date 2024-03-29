import { Component } from "react";

import AppIcons from "../../assets/app-icons/app-icons";
import Button from "../button/button.component";

import './modal.styles.scss';

class Modal extends Component {

    render(){
        const { title, message, isActive, toggleModal, handleRemoval, type} = this.props;
       
        return(
            <div className={`modal-container ${isActive === true? 'show-modal': ''} `}>
                <div className="modal-content">
                <div className="modal-head">
                    <span className="modal-title">{title}</span>
                    <span className="close-button" onClick={()=>toggleModal()}><AppIcons type={'cancelIcon'} /></span>  
                </div>

                <hr className="divider" />
                
                <div className="modal-foot">
                
                <div className="msg">{message}</div>
                    {
                        (() => {
                            switch (type) {
                            case 'confirm':
                                return (
                                    <div className="confirm-controls">
                                    <Button buttonType={'hollow'} type='button' onClick={()=>toggleModal()}>Keep it</Button>
                                    <Button buttonType={'primary'} type='button' onClick={()=>handleRemoval()}>Remove</Button>
                                    </div>
                                    )
                            
                            case 'notify':
                                return (
                                    <div className="notify-controls">
                                    <Button buttonType={'Big'} type='button' onClick={()=>toggleModal()}>close</Button>
                                    </div>
                                    )
                            default:
                                return null
                            }
                        })()
                       
                    }
                   </div>                 
                    
                </div>
            </div>
        )
    }
}

export default Modal;
