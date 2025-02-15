import ParticleBackground from '../Canvas/ParticleBackground';
import EllipseAnimation from '../Canvas/EllipseAnimation'; 

function Contact() {
  return (
    <>
      <div>
        <ParticleBackground />
      </div>

      <div>
        <a rel="noreferrer" href="/">
          <img
            src="/images/ProfileImage.jpg"
            className="logo"
            alt="My profile image"
          />
        </a>
      </div>

      <EllipseAnimation />
    </>
  );
}

export default Contact;
