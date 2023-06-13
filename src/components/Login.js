import "../assert/css/LoginLayout.css";
import { useState,useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/UserActions";
import { useDispatch , useSelector} from "react-redux";

function Login() {
  const dispatch = useDispatch()
  const [typePassword, setTypePassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const account = useSelector(state =>state.user.account)

  const navigate = useNavigate();

  const handleChangeType = () => {
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  };

  useEffect((()=>{
   
    if(account && account.auth===true){
      navigate('/');
    }
  }),[account])

  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Email or Password is required");
      return;
    }
    dispatch(handleLoginRedux(email,password));
    // let res = await loginApi(email.trim(), password);
    // if (res && res.token) {
    //   // localStorage.setItem("token", res.token);
    //   login(email);
    //   navigate("/");
    // } else {
    //   if (res && res.status === 400) {
    //     toast.error(res.data.error);
    //   }
    // }
  };

  const handleOnKeyDown = (e) =>{
    if(e && e.key === 'Enter'){
      console.log(e.key);
     handleLogin();
    }
  }
  return (
    <>
      <div className="login_form_cover">
        <div className="login_form_container">
          <div className="login_form">
            <h2>Login</h2>
            <form >
              <div className="input_group">
                <i className="fa fa-user me-2"></i>
                <input
                  type="text"
                  value={email}
                  placeholder="Username"
                  className="input_text"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input_group">
                <i className="fa fa-unlock-alt me-2"></i>
                <input
                  type={typePassword}
                  value={password}
                  placeholder="Password"
                  className="input_text me-2"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e)=> handleOnKeyDown(e)}
                />
                <i
                  class="fa-regular fa-eye-slash"
                  onClick={handleChangeType}
                ></i>
              </div>
            </form>
            <div
              className="button_group"
              id="login_button"
              onClick={() => handleLogin()}
            >
              <a>Submit</a>
            </div>
            <div className="fotter">
              <a>Forgot Password ?</a>
              <a>Sign Up</a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Login;
