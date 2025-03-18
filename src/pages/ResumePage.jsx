import React from 'react';
import './ResumePage.css';

function ResumePage({ setPage }) {
  // 指向 public/images/Yueyang-Ding-9.pdf
  // （在 public 下的任何文件都可以通过 "/..." 访问）
  const pdfUrl = '/images/Yueyang-Ding-9.pdf';

  return (
    <div className="resume-container">
      <div className="resume-content">
        <iframe
          src={pdfUrl}
          title="My Resume"
          className="resume-iframe"
        />
      </div>

      <div className="button-container">
        <button
          className="return-button"
          onClick={() => (window.location.href = '/')}
        >
          Return to Home
        </button>
        <a
          className="download-button"
          href={pdfUrl}
          download
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}

export default ResumePage;
