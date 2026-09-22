import '../styles/Login.css';

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        {/* Visual / Gradient Banner (wraps the overlay text) */}
        <div className="login-image-banner">
          <div className="banner-overlay">
            <h3>Connect with friends</h3>
            <p>Share moments and explore the community feed on Loop.</p>
          </div>
        </div>

        {/* Form Container */}
        <div className="login-card">
          <div className="login-header">
            <h2>Login to your account</h2>
            <p>Enter your email below to login</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="m@example.com" required />
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                <a href="#" className="forgot-link">Forgot your password?</a>
              </div>
              <input id="password" type="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className="btn btn-primary">Login</button>
            <button type="button" className="btn btn-secondary">Login with Google</button>
          </form>

          <div className="login-footer">
            Don't have an account? <a href="#">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}