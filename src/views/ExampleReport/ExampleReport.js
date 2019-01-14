import React from 'react';
import exampleReportImage from './example-report.jpg';

const ExampleReport = () => <div>
    <h3>דו"ח לדוגמא</h3>
    <div>
        <img src={exampleReportImage} alt='' style={{ marginBottom: '70px', maxWidth: '100%' }} />
    </div>
</div>

export default ExampleReport;