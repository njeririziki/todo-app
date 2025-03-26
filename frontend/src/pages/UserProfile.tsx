import {User} from '../types'


interface UserProfileProps {
    user: User;
}

const UserProfile: React.FC<UserProfileProps>= () => {
    return ( 
        <div>
            User
        </div>
     );
}
 
export default UserProfile;