import React, { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactModal = require('react-modal');

import { Table, Button, InputGroup, Input } from 'reactstrap';
import './App.css';

type tableDataType = {
  id: number;
  title: string;
  genre: string;
};

const data: tableDataType[] = [
  { id: 1, title: 'フシギダネ1', genre: 'くさ/どく' },
  { id: 2, title: 'フシギソウ', genre: 'くさ/どく' },
  { id: 3, title: 'フシギバナ', genre: 'くさ/どく' },
  { id: 4, title: 'ヒトカゲ', genre: 'ほのお' },
  { id: 5, title: 'リザード', genre: 'ほのお' },
  { id: 6, title: 'リザードン', genre: 'ほのお/ひこう' },
  { id: 7, title: 'ゼニガメ', genre: 'みず' },
  { id: 8, title: 'カメール', genre: 'みず' },
  { id: 9, title: 'カメックス', genre: 'みず' },
];

const modalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  content: {
    position: 'absolute',
    top: '5rem',
    left: '10rem',
    right: '10rem',
    // bottom: '50rem',
    height: '150px',
    // backgroundColor: 'paleturquoise',
    borderRadius: '1rem',
    padding: '1.5rem',
  },
};
ReactModal.setAppElement('#root');

// eslint-disable-next-line arrow-body-style
const App: React.FC = () => {
  const [tableData, setTableData] = useState<tableDataType[]>(data);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const readFile = () => {
    setDialogOpen(true);
  };
  const clear = () => setTableData(data);
  const sortName = () =>
    setTableData(
      data
        .sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }

          return 0;
        })
        .filter((d) => d),
    );

  const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (!text) {
      setTableData(data);
    } else {
      setTableData(data?.filter((d) => d.title.includes(text)));
    }
  };
  // useEffect(() => {
  //   setTableData(data);
  // }, []);

  return (
    <div className="App">
      <div className="card">
        <div className="card-body">
          <ReactModal
            isOpen={isDialogOpen}
            // onAfterOpen={this.handleOpen}
            // onRequestClose={this.handleClose}
            style={modalStyle}
            contentLabel="Settings"
          >
            <Input
              type="file"
              id="inputFile"
              onChange={(e) => {
                const file = e?.target?.files?.item(0);
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    console.log(reader.result);
                  };
                  reader.readAsText(file);
                }
              }}
            ></Input>
            <Button
              className="mt-1"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              閉じる
            </Button>
          </ReactModal>
          <InputGroup>
            <Input placeholder="ゲームタイトル" onChange={textChanged} />
          </InputGroup>
          <Table>
            <thead>
              <tr>
                <th onClick={sortName}>タイトル</th>
                <th>ジャンル</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((d) => (
                <tr key={d.id}>
                  <td>{d.title}</td>
                  <td>{d.genre}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button color="primary" onClick={readFile} className="mx-1">
            読み込み
          </Button>
          <Button color="secondary" onClick={sortName} className="mx-1">
            書き出し
          </Button>
          <Button color="secondary" onClick={clear} className="mx-1">
            クリア
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
