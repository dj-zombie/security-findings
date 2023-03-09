import React from 'react';
import FindingsTable from '../components/FindingsTable';
import SeverityPieChart from '../components/SeverityPieChart';
import { Finding } from '../interfaces/finding'

interface FindingsPageProps {
  data: Finding[]
}

const FindingsPage: React.FC<FindingsPageProps> = ({ data }) => {
  return (
    <>
      <SeverityPieChart data={data} />
      <FindingsTable data={data} />
    </>
  );
};

export default FindingsPage;

