import React from 'react';
import { useState } from 'react';
import { Table, Button } from 'reactstrap';
import './App.css';

type tableDataType = {
  id: number,
  name: string,
  type: string,
};

const data: tableDataType[] = [
  { id: 1, name: 'フシギダネ', type: 'くさ/どく' },
  { id: 2, name: 'フシギソウ', type: 'くさ/どく' },
  { id: 3, name: 'フシギバナ', type: 'くさ/どく' },
  { id: 4, name: 'ヒトカゲ', type: 'ほのお' },
  { id: 5, name: 'リザード', type: 'ほのお' },
  { id: 6, name: 'リザードン', type: 'ほのお/ひこう' },
  { id: 7, name: 'ゼニガメ', type: 'みず' },
  { id: 8, name: 'カメール', type: 'みず' },
  { id: 9, name: 'カメックス', type: 'みず' },
];

// eslint-disable-next-line arrow-body-style
const App: React.FC = () => {
  const [tableData, setTableData] = useState<tableDataType[]>(data);
  const narrowDown = () => setTableData(tableData?.filter(d => d.type === "みず"));
  const clear = () => setTableData(data);
  const sortName = () => setTableData(data.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }

    return 0;
  }).filter(d => d));

  // useEffect(() => {
  //   setTableData(data);
  // }, []);

  return (
    <div className="App">

      <div className="card">
        <div className="card-body">
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <th onClick={sortName}>name</th>
                <th>type</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map(d =>
              (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.type}</td>
                </tr>
              )
              )}
            </tbody>
          </Table>
          <Button color="primary" onClick={narrowDown}>絞込</Button>
          <Button color="secondary" onClick={clear}>クリア</Button>
          <Button color="secondary" onClick={sortName}>名前でソート</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
