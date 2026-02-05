import { useNavigate } from "react-router-dom";

export function useAppNavigate() {
    const navigate = useNavigate();

    const goToSubject=()=>navigate("/school/academic/subjects");
    const goToDashboard = () => navigate("/school/dashboard");
    const goToCenter=()=>navigate("/school/dashboard/centers");
    const goToLogin = () => navigate("/login");
    const goBack = () => navigate(-1);

    return {
        goToDashboard,
        goToCenter,
        goToSubject,
        goToLogin,
        goBack
    };
}
