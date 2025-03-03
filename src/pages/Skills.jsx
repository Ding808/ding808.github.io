import React from 'react';
import './SkillPage.css';

const Services = () => {
  // 示例数据
  const servicesData = [
    { id: 1, title: 'Web Design', description: '这里是 Web Design 的描述...' },
    { id: 2, title: 'Photography', description: '这里是 Photography 的描述...' },
    { id: 3, title: 'Web Developer', description: '这里是 Web Developer 的描述...' },
    { id: 4, title: 'Branding', description: '这里是 Branding 的描述...' },
    { id: 5, title: 'App Developing', description: '这里是 App Developing 的描述...' },
    { id: 6, title: 'Product Strategy', description: '这里是 Product Strategy 的描述...' },
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
