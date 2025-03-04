import React, { useState } from 'react';
import './SkillPage.css';

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [animatingSkill, setAnimatingSkill] = useState(null);

  // 示例数据
  const skillsData = [
    { id: 1, title: 'Programming Language', description: 'The description of my programming language' },
    { id: 2, title: 'Language', description: 'The description of my language skills' },
    { id: 3, title: 'Skill 3', description: 'Description for skill 3' },
    { id: 4, title: 'Skill 4', description: 'Description for skill 4' },
    { id: 5, title: 'Skill 5', description: 'Description for skill 5' },
    { id: 6, title: 'Skill 6', description: 'Description for skill 6' },
  ];

  const handleCardClick = (skill, event) => {
    // 防止重复点击
    if (animatingSkill) return;
    // 获取点击卡片的边界信息
    const cardRect = event.currentTarget.getBoundingClientRect();
    // 目标：详情页标题的位置：水平居中（窗口宽度一半），垂直距离为 50px
    const targetX = window.innerWidth / 2 - (cardRect.left + cardRect.width / 2);
    const targetY = 50 - cardRect.top;
    // 将偏移量存入 animatingSkill 对象中
    setAnimatingSkill({ ...skill, offsetX: targetX, offsetY: targetY });
    // 等待动画结束（与CSS动画时长0.5s一致），再显示详情页
    setTimeout(() => {
      setSelectedSkill(skill);
      setAnimatingSkill(null);
    }, 500);
  };

  const handleBackClick = () => {
    // 返回时恢复初始状态
    setSelectedSkill(null);
  };

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
            {/* 这个标题位置、大小要和卡片动画结束时保持一致 */}
            <h3>{selectedSkill.title}</h3>
          </div>
          <div className="detail-content">
            <p>{selectedSkill.description}</p>
            <p>Detail message...</p>
          </div>
          <button className="back-button" onClick={handleBackClick}>Back</button>
        </div>
      ) : (
        // 网格视图：始终渲染所有卡片，但在动画状态下为被点击和未点击的卡片添加不同的类
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
