import React, { useState, useEffect } from "react";

import {
  Table,
  Button,
  InputGroup,
  Label,
  Input,
  // Dropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
} from "reactstrap";
import "./App.css";

type gameTitle = {
  id: number;
  title: string;
  platform: string;
};

const ALL_PLATFORM = "すべて";

let data: gameTitle[] = [];

// eslint-disable-next-line arrow-body-style
const App: React.FC = () => {
  const [tableData, setTableData] = useState<gameTitle[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [platforms, setPlatform] = useState<string[]>();
  const [selectedPlatform, setSelectedPlatform] = useState<string>(
    ALL_PLATFORM,
  );

  useEffect(() => {
    const games = localStorage.getItem("games");
    if (games) {
      const gamesJson = (JSON.parse(games) as gameTitle[]).sort(sortFunc);
      data = Array.from(gamesJson);
      setTableData(gamesJson);
      setPlatform(
        Array.from(new Set(gamesJson.map((v) => v.platform))).sort((a, b) => {
          a = a.toString().toLowerCase();
          b = b.toString().toLowerCase();
          return a > b ? 1 : b > a ? -1 : 0;
        }),
      );
    }
  }, []);
  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  const sortFunc = (a: gameTitle, b: gameTitle) => {
    if (a.platform < b.platform) {
      return -1;
    }
    if (a.platform > b.platform) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  };

  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const jsonStr = reader.result?.toString();
        if (jsonStr) {
          let id = 0;
          const games = (JSON.parse(jsonStr) as gameTitle[])
            .sort(sortFunc)
            .map((g) => {
              g.id = id++;
              return g;
            });
          data = Array.from(games);
          setTableData(games);
          setPlatform(
            Array.from(new Set(games.map((v) => v.platform))).sort((a, b) => {
              a = a.toString().toLowerCase();
              b = b.toString().toLowerCase();
              return a > b ? 1 : b > a ? -1 : 0;
            }),
          );

          localStorage.clear();
          localStorage.setItem("games", JSON.stringify(games));
        }
      };
      reader.readAsText(file);
    }
  };
  const exportJson = () => {
    let id = 0;
    const sortData = data
      .sort(sortFunc)
      .map((g) => {
        g.id = id++;
        return g;
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
    setTableData(data);
    setSearchString("");
    setSelectedPlatform(ALL_PLATFORM);
    const selectObj = document.getElementById(
      "selectPlatform",
    ) as HTMLSelectElement;
    selectObj.selectedIndex = 0;
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
    const p = platform ? platform : selectedPlatform;
    if (title) {
      narrowDownArray = narrowDownArray.filter((d) =>
        d.title.toUpperCase().includes(title.toUpperCase()),
      );
    }
    if (p !== ALL_PLATFORM) {
      narrowDownArray = narrowDownArray.filter((d) => d.platform === p);
    }

    return narrowDownArray;
  };
  const gameTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchString(text);
    setTableData(narrowDown(text, selectedPlatform));
  };

  // const dropdownChanged = (e: React.FormEvent<HTMLElement>) => {
  //   const selected = e.currentTarget.innerText;
  //   setSelectedPlatform(selected);
  //   setTableData(narrowDown(searchString, selected));
  // };

  const selectChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedPlatform(selected);
    setTableData(narrowDown(searchString, selected));
  };

  return (
    <div className="App">
      <div className="card">
        <div className="card-body">
          <InputGroup>
            <Input
              type="text"
              placeholder="ゲームタイトル"
              value={searchString}
              onChange={gameTitleChanged}
            />
            {/* <Dropdown id="platforms" isOpen={dropdownOpen} toggle={toggle}>
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
            </Dropdown> */}
            <select
              id="selectPlatform"
              className="form-select"
              onChange={selectChanged}
            >
              <option selected key={ALL_PLATFORM} value={ALL_PLATFORM}>
                {ALL_PLATFORM}
              </option>
              {platforms?.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
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
