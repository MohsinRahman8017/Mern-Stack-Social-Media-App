
import Header from './Header/header'
import Stories from './Stories/stories'
import PostSection from './PostSection/postsection'
import BottomNavigation from './BottomNavigation/bottomNavigation'
import Left_Side_Bar from "./Left-Side-Bar/left-side-bar"
import Right_Side_Bar from "./Right-Side-Bar/right-side-bar"

import "./home.css"

let Home = (props) => {
    return( 
            <>
             <Header/>
             <div className="Post-Section-Outer-Most-Wrapper">
                <Stories/>
                <PostSection/>
             </div> 
             <BottomNavigation/>
             <Left_Side_Bar />
             <Right_Side_Bar/>
             
             

            </>
    )
}

export default Home