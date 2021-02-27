import React, { useState } from "react";

import {
  Table,
  Button,
  InputGroup,
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./App.css";

import dotenv from "dotenv";

type gameType = {
  id: number;
  title: string;
  platform: string;
};

const ALL_PLATFORM = "すべて";

let data: gameType[] = [];

// eslint-disable-next-line arrow-body-style
const App: React.FC = () => {
  const [tableData, setTableData] = useState<gameType[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [platforms, setPlatform] = useState<string[]>();
  const [selectedPlatform, setSelectedPlatform] = useState<string>(
    ALL_PLATFORM,
  );

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const s = reader.result?.toString();
        const a = s?.replaceAll("\r\n", "\n").split("\n");
        const a2 = a?.map((v, i) => {
          const g = v.split("\t");
          const game: gameType = { id: i, title: g[1], platform: g[0] };
          return game;
        });
        if (a2 !== undefined) {
          setTableData(a2);
          data = Array.from(a2);
          const plist = Array.from(new Set(a2.map((g) => g.platform)));
          const sortedPList = plist.sort();
          setPlatform(sortedPList);
        }
      };
      reader.readAsText(file);
    }
  };
  const exportJson = () => {
    const sortData = tableData
      .sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }

        return 0;
      })
      .filter((d) => d);
    const str = JSON.stringify(sortData);
    const blob = new Blob([str], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = "games.json";
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };
  const clear = () => {
    dotenv.config();
    alert(JSON.stringify(process.env));
    setTableData(data);
    setSearchString("");
    setSelectedPlatform(ALL_PLATFORM);
  };

  const sortTitle = () =>
    setTableData(
      tableData
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

  const narrowDown = (title?: string, platform?: string) => {
    let narrowDownArray = data;
    const t = title ? title : searchString;
    const p = platform ? platform : selectedPlatform;
    narrowDownArray = narrowDownArray.filter((d) => d.title.includes(t));
    if (p !== ALL_PLATFORM) {
      narrowDownArray = narrowDownArray.filter((d) => d.platform === p);
    }

    return narrowDownArray;
  };
  const textChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchString(text);
    setTableData(narrowDown(text, selectedPlatform));
  };

  const dropdownChanged = (e: React.FormEvent<HTMLElement>) => {
    const selected = e.currentTarget.innerText;
    setSelectedPlatform(selected);
    setTableData(narrowDown(searchString, selected));
  };
  // useEffect(() => {
  //   setTableData(data);
  // }, []);

  return (
    <div className="App">
      <div className="card">
        <div className="card-body">
          <InputGroup>
            <Input
              type="text"
              placeholder="ゲームタイトル"
              value={searchString}
              onChange={textChanged}
            />
            <Dropdown id="platforms" isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>{selectedPlatform}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={dropdownChanged} key="all">
                  {ALL_PLATFORM}
                </DropdownItem>
                {platforms?.map((p) => (
                  <DropdownItem onClick={dropdownChanged} key={p}>
                    {p}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </InputGroup>
          <div className="text-right">
            <Button color="secondary" onClick={clear} className="m-1">
              クリア
            </Button>
          </div>
          <Table>
            <thead>
              <tr>
                <th>プラットフォーム</th>
                <th onClick={sortTitle}>タイトル</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((d) => (
                <tr key={d.id}>
                  <td>{d.platform}</td>
                  <td>{d.title}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <InputGroup>
            <Label for="importJson">Jsonファイルをインポート</Label>
            <Input type="file" id="importJson" onChange={importJson} />
          </InputGroup>
          <div className="text-left">
            <Button color="secondary" onClick={exportJson} className="mt-2">
              Jsonファイルをエクスポート
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
