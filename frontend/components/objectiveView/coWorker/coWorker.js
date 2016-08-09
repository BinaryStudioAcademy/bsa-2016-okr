import React from 'react';
import './coWorker.css';


export default class СoWorker extends React.Component {

    render() {
        
        return (

          <div className="co-worker-list">
            <h4>My co-workers</h4>
            
            <div className="co-workers">

              <div className="img">
                  <img src="https://images.onmogul.com/uploads/user/avatar/3023886/large_Comic_Face_Circle_Cropped.png?ixlib=rails-0.3.2&s=a0f8a8a8e78e7a7a95c6465f02dd0ee2" />
              </div>

              <div className="objective-desc">
                  <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur</p>
              </div>

              <div className="progress-radial progress-49"><b></b></div> 

          </div>


                <div className="co-workers">

                    <div className="img">
                        <img src="https://media.creativemornings.com/uploads/user/avatar/120448/profile-circle.png" />
                    </div>

                    <div className="objective-desc">
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                    </div>

                    <div className="progress-radial progress-68"><b></b></div> 

                </div>

                <div className="co-workers">

                    <div className="img">
                        <img src="http://static1.squarespace.com/static/54b5c1d4e4b060f2e9699962/552468dce4b0126cded2a204/55246894e4b0126cded29b93/1428450143267/caitria-oneill-circle.jpg" />
                    </div>

                    <div className="objective-desc">
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur</p>
                    </div>

                    <div className="progress-radial progress-21"><b></b></div> 

                </div>

          </div>
          
        )
    }
}
