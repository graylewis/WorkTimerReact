import CTA from '../molecules/cta'
import Logo from '../../assets/images/logo@2x.png'
import Illustration from '../../assets/images/illustration@2x.png'

function Landing(props) {
 return (
  <div className="landing-container">
    <div className="logo">
      <img  alt="Logo"
            src={Logo}>
      </img>
    </div>
    <div className="illustration">
      <img  alt="Illustration"
            src={Illustration}>
      </img>
    </div>
    <div className="copy">
      Get control over your time with WorkTimer
    </div>
    <CTA></CTA>
  </div>
 )
}

export default Landing
