import React from 'react';
import SeverityPieChart from '../components/SeverityPieChart';
import { Finding } from '../interfaces/finding'


interface DashboardPageProps {
  data: Finding[]
}
const DashboardPage: React.FC<DashboardPageProps> = ({ data }) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-4xl mb-20">
        Dashboard
      </h2>
      <SeverityPieChart data={data} />
    </div>
  );
};

export default DashboardPage;

