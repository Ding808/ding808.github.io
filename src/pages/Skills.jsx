import React from 'react';
import './SkillPage.css';

const Services = () => {
  // 示例数据
  const servicesData = [
    { id: 1, title: 'Programming Language', description: 'The description of my programming language' },
    { id: 2, title: 'Language', description: 'The description of my language skills' },
    { id: 3, title: '', description: '' },
    { id: 4, title: '', description: '' },
    { id: 5, title: '', description: '' },
    { id: 6, title: '', description: '' },
  ];

  return (
    <section className="services-container">
      {/* 标题示例：带有背景大字 */}
      <div className="services-title">
        <h2 className="title-foreground">Services</h2>
        <h2 className="title-background">Services</h2>
      </div>

      {/* 宫格区：两行三列 */}
      <div className="services-grid">
        {servicesData.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
