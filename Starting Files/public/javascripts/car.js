import React from 'react';
import { createRoot } from 'react-dom/client';

const CarComponent = () => {
  React.useEffect(() => {
    fetch('/carOut')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const dataTable = new simpleDatatables.DataTable("#carTable");
        const rows = data.map(car => [
          car.maker || car.make || '',
          car.model || '',
          car.year || ''
        ]);
        dataTable.insert({ data: rows });
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div>
      <h2>Car Database</h2>
      <table id="carTable">
        <thead>
          <tr><th>maker</th><th>model</th><th>year</th></tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

const root = createRoot(document.getElementById('car'));
root.render(<CarComponent />);