import "./profile.css";
import Left_Side_Bar from "../Home/Left-Side-Bar/left-side-bar";
import Right_Side_Bar from "../Home/Right-Side-Bar/right-side-bar";
import Profile_Section from "../User Profile/Profile Section/profile-section"
import Header from "../Home/Header/header"
import BottomNavigation from "../Home/BottomNavigation/bottomNavigation"

let Profile = (props) => {
    return(
            <>
                <div className="Profile-Page-Outer-Wrapper">
                    <Left_Side_Bar/>
                    <Profile_Section/>
                    <Right_Side_Bar/>
                    <Header/>
                    <BottomNavigation/>
                    
                </div>
            </>
    )
}

export default Profile