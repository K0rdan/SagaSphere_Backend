import { Log } from "./../utils/index";

const logTags = ["SagaSphere_Base", "Login"];

export function Login(req, res) {
    Log.info(logTags, "User logging...");
    res.cookie('sagasphere_user', "test");
    res.json({status: "ok", message: "Login"});
}

export default Login;
