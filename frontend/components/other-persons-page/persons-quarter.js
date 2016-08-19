import React, { Component } from 'react'

class Quarter extends Component {
   constructor() {
      super();

      this.hendleClick = this.hendleClick.bind(this);
      this.hendleChange = this.hendleChange.bind(this);
   }

   hendleChange(e){
      let value = e.target.value;
      this.props.changeYear(value)
   }

   hendleClick(e) {
      var li = document.getElementsByClassName('quater');
      
      for (var i=0; i<4; i++) {
         li[i].classList.remove('active');
         if ( li[i] == e.target)
            var currentTab = i;
      }
      e.target.classList.add('active');
      this.props.changeTab(++currentTab);
   }
/*   componentWillMount(){
      if (this.props.today < this.props.first)
         this.props.changeTab(1);
      else if (this.props.today >= this.props.first && this.props.today <= this.props.second)
         this.props.changeTab(2);
      else if(this.props.today > this.props.second && this.props.today <= this.props.third)
         this.props.changeTab(3);
      else this.props.changeTab(4);
   }*/
   render() {
      return (
         <div id='quaterPanel'>
            <ul id='quaterList'>
            <select onChange={this.hendleChange} className='year'>
               <option>{this.props.today.getFullYear()}</option>
               <option>{this.props.today.getFullYear()+1}</option>
            </select> 
               <li className="quater active" onClick={this.hendleClick}>1-st quarter</li>
               <li className="quater" onClick={this.hendleClick}>2-nd quarter</li>
               <li className="quater" onClick={this.hendleClick}>3-rd quarter</li>
               <li className="quater" onClick={this.hendleClick}>4-th quarter</li>
            </ul>  
         </div>
      )
   }
}
Quarter.defaultProps = { 
   today: new Date(),
   first: '2016-03-31T10:42:12.643Z',
   second: '2016-06-30T10:42:12.643Z',
   third: '2016-09-30T10:42:12.643Z'
};
export default Quarter