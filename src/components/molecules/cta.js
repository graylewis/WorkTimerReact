function CTA(props) {
  return (
    <div className='cta card'>
      <a href="/login">
        <div className="cta-link login">Already registered? Login</div>
      </a>
      <a href="/register">
        <div className="cta-link register">Create an Account</div>
      </a>
    </div>
  );
}

export default CTA;