import React from 'react';
import {Link} from "react-router-dom"
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className="text-center">
            <h3 font-weight-light>Welcome To The Official Website Of Mayula</h3>
            
            <Link to="/gallery" class="nav-item nav-link">
            <img src="https://webneel.net/image/logo/7-bird-transparent-logo-design-idea-by-ilya-schapko.gif"
             id="image" />
             
             </Link>
             <p>Click on the logo to see our personal gallery</p>
  
             </div>
        );
    }
}
 
export default Home;