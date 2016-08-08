import React from 'react';

export default class OKRmanagingItem extends React.Component {

    render() {
        
        return (
		    <tr>
           <td className="minify sortID">{this.props.id}</td>
           <td className="sortDesc">{this.props.ownerName}</td>
           <td className="sortDesc">{this.props.objTitle}</td>
           <td className="minify textright"><i className="fa fa-trash" aria-hidden="true"></i></td>
         </tr>
        );
    }
}
