import React from 'react';
import './BarChartComponent.scss';

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Page A', uv: 350, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 100, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 1, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
  { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
];

function BarChartComponent() {
  return (
    <div className="chart_container">
      <ResponsiveContainer height="100%">
        <BarChart data={data} margin={{ top: 0, right: 5, bottom: 0, left: 0 }}>
          <Bar dataKey="uv" fill="#8884d8" barSize={25} />
          <XAxis />
          <YAxis />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent;
