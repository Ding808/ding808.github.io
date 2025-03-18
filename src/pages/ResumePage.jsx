import React from 'react';
import './ResumePage.css';
import '../../public/images/Yueyang Ding-9.pdf';

function ResumePage({ setPage }) {
  // 请根据需要修改 pdfUrl 为你实际的 PDF 文件地址
  const pdfUrl = "../../public/images/Yueyang Ding-9.pdf";

  return (
    <div className="resume-container">
      {/* PDF 容器 */}
      <div className="resume-content">
        <iframe
          src={pdfUrl}
          title="My Resume"
          className="resume-iframe"
        />
      </div>

      {/* 按钮容器：位于 PDF 下方，左右分开 */}
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
