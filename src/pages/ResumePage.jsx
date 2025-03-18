import React from 'react';
import './ResumePage.css';

function ResumePage({ setPage }) {
  // 请根据需要修改 pdfUrl 为你实际的 PDF 文件地址
  const pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

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
