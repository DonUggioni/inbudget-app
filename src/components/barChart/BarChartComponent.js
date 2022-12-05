import React, { useContext } from 'react';
import { ListValuesContext } from '../store/AppContext';
import './BarChartComponent.scss';

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from 'recharts';

function BarChartComponent() {
  const context = useContext(ListValuesContext);

  const data = context.expensesList.slice().reverse();

  const result = Object.values(
    data.reduce((acc, { type, amount, date }) => {
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }

      acc[date][type] += amount;
      return acc;
    }, {})
  );

  return (
    <div className="chart_container">
      <ResponsiveContainer>
        <BarChart
          data={result.slice(0, 8)}
          margin={{ top: 0, right: 5, bottom: 0, left: 0 }}
        >
          <Bar dataKey="expense" fill="#fa192f" barSize={20} minPointSize={2} />
          <Bar dataKey="income" fill="#8dd100" barSize={20} minPointSize={2} />
          <XAxis dataKey={'date'} fontSize={10} />
          <YAxis fontSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartComponent;
