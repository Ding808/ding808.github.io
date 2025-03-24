import React, { useState, useEffect } from 'react';
import './SkillPage.css';

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [animatingSkill, setAnimatingSkill] = useState(null);

  // 额外的状态，用于触发进度条动画
  const [showLanguageBars, setShowLanguageBars] = useState(false);

  // 示例数据
  const skillsData = [
    { id: 1, title: 'Programming', description: 'The description of my programming language' },
    { id: 2, title: 'Language', description: 'The description of my language skills' },
    { id: 3, title: 'Skill 3', description: 'Description for skill 3' },
    { id: 4, title: 'Skill 4', description: 'Description for skill 4' },
    { id: 5, title: 'Skill 5', description: 'Description for skill 5' },
    { id: 6, title: 'Skill 6', description: 'Description for skill 6' },
  ];

  // 语言进度条示例数据（可自由修改）
  const languageProgress = [
    { name: 'Mandarin', level: 100 },
    { name: 'Wu', level: 75 },
    { name: 'English', level: 70 },
    { name: 'Cantonese', level: 50 },
    { name: 'Spanish', level: 20 },
    { name: 'Japanses', level: 10 },
    { name: 'Russian', level: 2 },
    { name: 'German', level: 1 },
  ];

  const handleCardClick = (skill, event) => {
    // 防止重复点击
    if (animatingSkill) return;
    const cardRect = event.currentTarget.getBoundingClientRect();
    // 目标：详情页标题位置：水平居中，垂直距离为 50px
    const targetX = window.innerWidth / 2 - (cardRect.left + cardRect.width / 2);
    const targetY = 50 - cardRect.top;
    // 将偏移量存入 animatingSkill 对象中
    setAnimatingSkill({ ...skill, offsetX: targetX, offsetY: targetY });
    // 等待动画结束（0.5s），再显示详情页
    setTimeout(() => {
      setSelectedSkill(skill);
      setAnimatingSkill(null);
    }, 500);
  };

  const handleBackClick = () => {
    // 返回时恢复初始状态
    setSelectedSkill(null);
    setShowLanguageBars(false); // 隐藏进度条
  };

  // 当进入详情时，如果是「Language」技能，则触发进度条动画
  useEffect(() => {
    if (selectedSkill?.title === 'Language') {
      // 给一点延迟，让详情页先淡入，再启动动画
      const timer = setTimeout(() => {
        setShowLanguageBars(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedSkill]);

  return (
    <section className="skills-container">
      {/* 如果还未进入详情视图，则显示“My Skills”标题 */}
      {!selectedSkill && (
        <div className={`skills-title ${animatingSkill ? 'fade-out' : ''}`}>
          <h2 className="title-foreground">My Skills</h2>
          <h2 className="title-background">My Skills</h2>
        </div>
      )}

      {selectedSkill ? (
        // 详情视图
        <div className="skill-detail show">
          <div className="detail-header">
            <h3>{selectedSkill.title}</h3>
          </div>
          <div className="detail-content">
            {/* 在这里插入语言进度条示例 */}
            {selectedSkill.title === 'Language' && (
              <div className="language-list">
                {languageProgress.map((lang, index) => (
                  <div
                    key={lang.name}
                    className="language-item"
                    style={{ animationDelay: `${0.2 * index}s` }}
                  >
                    <div className="language-name">{lang.name}</div>
                    <div className="progress-bar">
                      <div
                        className={`progress ${showLanguageBars ? 'progress-animate' : ''}`}
                        style={{
                          width: showLanguageBars ? `${lang.level}%` : '0%',
                          animationDelay: `${0.2 * index}s`
                        }}
                      />
                    </div>
                    <div className="language-level">{lang.level}%</div>
                  </div>
                ))}
              </div>
            )}

          </div>
          <button className="back-button" onClick={handleBackClick}>Back</button>
        </div>
      ) : (
        // 网格视图
        <div className="skills-grid">
          {skillsData.map((skill) => {
            let cardClass = "skill-card";
            let cardStyle = {};
            if (animatingSkill) {
              if (animatingSkill.id === skill.id) {
                cardClass += " animate-to-title";
                // 将计算好的偏移量传入 CSS 自定义属性
                cardStyle = {
                  '--target-x': `${animatingSkill.offsetX}px`,
                  '--target-y': `${animatingSkill.offsetY}px`
                };
              } else {
                cardClass += " fade-out";
              }
            }
            return (
              <div
                key={skill.id}
                className={cardClass}
                onClick={(e) => handleCardClick(skill, e)}
                style={cardStyle}
              >
                <div className="card-inner">
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Skills;
