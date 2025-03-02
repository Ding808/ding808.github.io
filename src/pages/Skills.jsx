import React from 'react';
import './SkillPage.css';

const Section = ({ title, skills }) => {
  return (
    <div className="section">
      <h2>{title}</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index} className="skill-item">
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SkillPage = () => {
  const languages = ["JavaScript", "Python", "C++", "Java"];
  const frameworks = ["React", "Vue", "Angular", "Node.js"];
  const ides = ["VSCode", "WebStorm", "IntelliJ IDEA", "Sublime Text"];

  return (
    <div className="container">
      <Section title="计算机语言" skills={languages} />
      <Section title="框架" skills={frameworks} />
      <Section title="IDE" skills={ides} />
    </div>
  );
};

export default SkillPage;
