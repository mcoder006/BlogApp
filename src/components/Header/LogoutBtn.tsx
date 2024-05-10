import { useDispatch } from "react-redux"
import authService from "../../services/auth"
import { logout } from "../../store/AuthSlice"

const LogoutBtn = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        })
    }

  return (
    <button onClick={logoutHandler} className="inline-block px-6 py-2 text-white transition-all duration-200 bg-red-600 rounded-full hover:bg-red-400 hover:text-black">
        Logout
    </button>
  )
}

export default LogoutBtn