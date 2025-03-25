import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { message } from "antd";
import { authApi } from "../../api/authApi.js";

const GoogleAuth = () => {
    const clientId = "131194684478-g03tgdb9f1spj2aa1bc9ka8ntspc8fqg.apps.googleusercontent.com";

   const handleGoogleLoginSuccess = async (credentialResponse) => {
        if (!credentialResponse?.credential) {
            message.error("Không nhận được credential từ Google!");
            return;
        }

        try {
            // Chỉ gửi credential, không cần clientId
            const response = await authApi.loginWithGoogle({
                credential: credentialResponse.credential
            });
            console.log("Google login response:", response);

            console.log('Login successful:', response);
            localStorage.setItem('accessToken', response.tokens.accessToken);
            localStorage.setItem('refreshToken', response.tokens.refreshToken);
            localStorage.setItem('email', response.user.email);
            localStorage.setItem('userId', response.user.id);
            localStorage.setItem('role', response.user.role);
            message.success("Đăng nhập Google thành công!");
            window.location.href = "/";
        } catch (error) {
            console.error("Google login failed:", error);
            message.error("Đăng nhập Google thất bại, vui lòng thử lại!");
        }
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => {
                    console.log("Google login error");
                    message.error("Đăng nhập Google thất bại, vui lòng thử lại!");
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
