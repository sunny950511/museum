import React from 'react';
import './Section1.css';

function Section1() {
  return (
    <section className="section-info" aria-label="이용 안내">
      <h2 className="sr-only">이용 안내 섹션</h2>
      <div className="info-container">
        <div className="info-block">
          <h3 className="info-title">관람시간</h3>
          <div className="info-desc-group">
            <p className="info-desc">일,월,화,목,금 09:30 ~ 17:30</p>
            <p className="info-desc">수,토 09:30 ~ 21:00</p>
          </div>
        </div>
        <div className="info-block">
          <h3 className="info-title">입장료</h3>
          <div className="info-desc-group">
            <p className="info-desc">무료 (특별전시 유료)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section1;
