"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { IEnumerable, from } from "linq-to-typescript";
import LoadingSpinner from "@/components/loadingSpinner";

type gameTitle = {
  title: string;
  platform: string;
};

const ALL_PLATFORM = "すべて";

export default function Home() {
  const [games, setGames] = useState<IEnumerable<gameTitle>>(from([]));
  const [tableData, setTableData] = useState<IEnumerable<gameTitle>>(from([]));
  const [searchString, setSearchString] = useState<string>("");
  const [platforms, setPlatform] = useState<string[]>();
  const [selectedPlatform, setSelectedPlatform] =
    useState<string>(ALL_PLATFORM);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const narrowDown = (title?: string, platform?: string) => {
    let narrowDownArray = games;
    const p = platform ?? selectedPlatform;
    if (title) {
      const _title = title.trim();
      if (_title.includes(" OR")) {
        const _narrowDownArray: gameTitle[] = [];
        _title.split(" OR").forEach(t => {
          if (t.trim() === "") return;
          const _games = games
            .where(d => d.title.toUpperCase().includes(t.trim().toUpperCase()))
            .toArray();
          _narrowDownArray.push(..._games);
        });
        narrowDownArray = from(_narrowDownArray);
      } else {
        narrowDownArray = narrowDownArray.where(d =>
          d.title.toUpperCase().includes(_title.toUpperCase()),
        );
      }
    }
    if (p !== ALL_PLATFORM) {
      narrowDownArray = narrowDownArray.where(d => d.platform === p);
    }

    return narrowDownArray;
  };
  const gameTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchString(text);
    setTableData(narrowDown(text, selectedPlatform));
  };

  const selectChanged = (selected: string) => {
    setSelectedPlatform(selected);
    setTableData(narrowDown(searchString, selected));
  };

  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const jsonStr = reader.result?.toString();
          if (jsonStr) {
            const games = from(JSON.parse(jsonStr) as gameTitle[])
              .orderBy(v => v.platform.toLowerCase())
              .thenBy(v => v.title.toLowerCase());
            setGames(games);
            setTableData(games);
            setPlatform([
              ALL_PLATFORM,
              ...games
                .select(g => g.platform)
                .distinct()
                .orderBy(p => p.toLowerCase())
                .toArray(),
            ]);

            localStorage.clear();
            localStorage.setItem("games", JSON.stringify(games.toArray()));
          }
        } finally {
          setIsLoading(false);
        }
      };
      setIsLoading(true);
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    new Promise<void>(resolve => {
      const gamesStr = localStorage.getItem("games");
      if (gamesStr) {
        const games = JSON.parse(gamesStr) as gameTitle[];
        if (games.length >= 0) {
          setGames(from(games));
          setTableData(from(games));
          setPlatform([
            ALL_PLATFORM,
            ...from(games)
              .select(g => g.platform)
              .distinct()
              .orderBy(p => p.toLowerCase())
              .toArray(),
          ]);
        }
      }
      resolve();
    }).then(() => {
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="検索..."
          onChange={gameTitleChanged}
        />
        <Select onValueChange={selectChanged}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {platforms?.map((p, idx) => (
                <SelectItem
                  value={p}
                  key={idx}
                >
                  {p}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="h-[calc(100vh-108px)] w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="font-medium">Platform</TableHead>
              <TableHead className="font-medium">Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.select((d, idx) => (
              <TableRow key={idx}>
                <TableCell key={`${idx}_platform`}>{d.platform}</TableCell>
                <TableCell key={`${idx}_title`}>{d.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <Input
        type="file"
        onChange={importJson}
        accept=".json"
      />
    </div>
  );
}
