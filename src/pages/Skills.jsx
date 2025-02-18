import React from 'react'
import { motion } from 'framer-motion'

// 示例技能数据，你可以根据需要修改或扩展
const skills = [
  { name: 'JavaScript', level: 'Advanced' },
  { name: 'React', level: 'Advanced' },
  { name: 'CSS', level: 'Intermediate' },
  { name: 'Node.js', level: 'Intermediate' },
  { name: 'TypeScript', level: 'Beginner' },
  { name: 'GraphQL', level: 'Beginner' },
]

// 定义父容器动画：进入时逐个展现子项
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

// 定义每个技能卡片的动画
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
}

const SkillPage = () => {
  return (
    <motion.div
      className="skill-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        color: '#fff',         // 文字颜色白色
        padding: '2rem',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>My Skills</h1>
      <div
        className="skill-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-card"
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: '0px 0px 15px rgba(255,255,255,0.3)',
            }}
            style={{
              background: '#2a2a2a', // 卡片背景为深灰色，与黑色主题协调
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <h2 style={{ marginBottom: '0.5rem' }}>{skill.name}</h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{skill.level}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default SkillPage
