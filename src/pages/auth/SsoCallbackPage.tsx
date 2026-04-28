import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function SsoCallbackPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = () => {
      try {
        // Parse hash fragment
        const hash = location.hash.substring(1); // remove #
        const params = new URLSearchParams(hash);
        
        const token = params.get("token");
        const expiresAt = params.get("expires_at");
        const username = params.get("username");

        if (token) {
          // Calculate cookie expiration
          let expires = "";
          if (expiresAt) {
            const date = new Date(parseInt(expiresAt) * 1000);
            expires = `; expires=${date.toUTCString()}`;
          }

          // Save to cookies
          document.cookie = `auth_token=${token}; path=/${expires}`;
          if (username) {
            document.cookie = `auth_username=${username}; path=/${expires}`;
          }

          // Redirect to dashboard
          navigate("/dashboard", { replace: true });
        } else {
          console.error("No token found in SSO callback");
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Error processing SSO callback:", error);
        navigate("/", { replace: true });
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="size-10 text-primary animate-spin" />
        <div className="text-center">
          <h2 className="text-xl font-bold">Authenticating...</h2>
          <p className="text-muted-foreground text-sm">Please wait while we sync your session.</p>
        </div>
      </div>
    </div>
  );
}
