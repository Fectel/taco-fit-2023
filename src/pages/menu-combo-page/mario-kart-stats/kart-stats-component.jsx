import React from 'react';
import './mario-kart-stats.css';

const KartStatsComponent = ({ stats, recommendedValue, limitValue }) => {
    const normalizePercentage = (value) => Math.min(100, Math.max(0, value));

    return (
        <div className="kart-stats-container">
            {stats.map(({ name, value }) => (
                <div key={name} className="stat-container">
                    <span className="stat-label">{`${name}:`}</span>
                    <div className="stat-bar-container">
                        <div className="stat-bar" style={{ width: `${normalizePercentage(value)}%` }}></div>
                        <span className="stat-value">{value}</span>
                        <div className="recommended-line" style={{ left: `${normalizePercentage(recommendedValue)}%` }}></div>
                        <div className="limit-line" style={{ left: `${normalizePercentage(limitValue)}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KartStatsComponent;
