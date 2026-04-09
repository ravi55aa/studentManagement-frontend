import ChatPage from '@/components/Chat/MainFrame';
import { Roles } from '@/constants/role.enum';
import { useAppSelector } from '@/hooks/useStoreHooks'


const StudentChat = () => {
    const {user}=useAppSelector((state)=>state.currentUser);

    return (
        <div>
            <ChatPage userId={user.id} role={user.role} />
        </div>
    )
}

export default StudentChat