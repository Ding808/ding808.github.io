import React from 'react';
import './SkillPage.css';

const Services = () => {
  // 示例数据
  const servicesData = [
    { id: 1, title: 'Programming Language', description: 'The description of my programming language' },
    { id: 2, title: 'Language', description: 'The description of my language skills' },
    { id: 3, title: 'Service 3', description: 'Description for service 3' },
    { id: 4, title: 'Service 4', description: 'Description for service 4' },
    { id: 5, title: 'Service 5', description: 'Description for service 5' },
    { id: 6, title: 'Service 6', description: 'Description for service 6' },
  ];

  return (
    <section className="services-container">
      {/* 标题示例：带有背景大字 */}
      <div className="services-title">
        <h2 className="title-foreground">My Skills</h2>
        <h2 className="title-background">My Skills</h2>
      </div>

      {/* 宫格区：两行三列 */}
      <div className="services-grid">
        {servicesData.map((service) => (
          <div key={service.id} className="service-card">
            <div className="card-inner">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
