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

type gameType = {
  id: number;
  title: string;
  platform: string;
  genre?: string;
};

const ALL_PLATFORM = "すべて";

let data: gameType[] = [
  { id: 0, title: "NFL 2K", platform: "Dreamcast" },
  { id: 1, title: "エターナルアルカディアDisk1", platform: "Dreamcast" },
  { id: 2, title: "エターナルアルカディアDisk2", platform: "Dreamcast" },
  { id: 3, title: "クライマックスランダーズ", platform: "Dreamcast" },
  { id: 4, title: "グランディア2", platform: "Dreamcast" },
  { id: 5, title: "シェンムー パスポート", platform: "Dreamcast" },
  { id: 6, title: "シェンムー 一章 横須賀 Disk1", platform: "Dreamcast" },
  { id: 7, title: "シェンムー 一章 横須賀 Disk2", platform: "Dreamcast" },
  { id: 8, title: "シェンムー 一章 横須賀 Disk3", platform: "Dreamcast" },
  { id: 9, title: "セブンスクロス", platform: "Dreamcast" },
  { id: 10, title: "ソニックアドベンチャー", platform: "Dreamcast" },
  { id: 11, title: "ソーサリアン", platform: "Dreamcast" },
  { id: 12, title: "ダービー馬を作ろう！", platform: "Dreamcast" },
  { id: 13, title: "パワーストーン", platform: "Dreamcast" },
  { id: 14, title: "ブルースティンガー", platform: "Dreamcast" },
  { id: 15, title: "プロサッカークラブをつくろう！", platform: "Dreamcast" },
  { id: 16, title: "プロ野球チームをつくろう！", platform: "Dreamcast" },
  { id: 17, title: "レンタヒーローNo.1", platform: "Dreamcast" },
  { id: 18, title: "ワールドネバーランド2プラス", platform: "Dreamcast" },
  {
    id: 19,
    title: "実況パワフルプロ野球ドリームキャストエディション",
    platform: "Dreamcast",
  },
  { id: 20, title: "神機世界エヴォリューション", platform: "Dreamcast" },
  {
    id: 21,
    title: "神機世界エヴォリューション２ 遠い約束",
    platform: "Dreamcast",
  },
  { id: 22, title: "魔剣X", platform: "Dreamcast" },
  { id: 23, title: "biohazard 0 Disk1", platform: "Gamecube" },
  { id: 24, title: "biohazard 0 Disk2", platform: "Gamecube" },
  { id: 25, title: "P.N.03", platform: "Gamecube" },
  { id: 26, title: "あつまれ!!メイド イン ワリオ", platform: "Gamecube" },
  { id: 27, title: "どうぶつの森+", platform: "Gamecube" },
  { id: 28, title: "エターナルダークネス", platform: "Gamecube" },
  { id: 29, title: "スターフォックス アドベンチャー", platform: "Gamecube" },
  { id: 30, title: "スーパーマリオサンシャイン", platform: "Gamecube" },
  { id: 31, title: "ゼルダの伝説 4つの剣+", platform: "Gamecube" },
  { id: 32, title: "ゼルダの伝説 風のタクト", platform: "Gamecube" },
  { id: 33, title: "テイルズ・オブ・シンフォニア Disk1", platform: "Gamecube" },
  { id: 34, title: "テイルズ・オブ・シンフォニア Disk2", platform: "Gamecube" },
  { id: 35, title: "ドンキーコンガ", platform: "Gamecube" },
  { id: 36, title: "ナルト 激闘忍者大戦2", platform: "Gamecube" },
  {
    id: 37,
    title: "バテン・カイトス 終わらない翼と失われた海 Disk1",
    platform: "Gamecube",
  },
  {
    id: 38,
    title: "バテン・カイトス 終わらない翼と失われた海 Disk2",
    platform: "Gamecube",
  },
  {
    id: 39,
    title: "バテン・カイトスII 始まりの翼と神々の嗣子 Disk1",
    platform: "Gamecube",
  },
  {
    id: 40,
    title: "バテン・カイトスII 始まりの翼と神々の嗣子 Disk2",
    platform: "Gamecube",
  },
  { id: 41, title: "ビューティフルジョー", platform: "Gamecube" },
  { id: 42, title: "ピクミン2", platform: "Gamecube" },
  {
    id: 43,
    title: "ファイナルファンタジー・クリスタルクロニクル",
    platform: "Gamecube",
  },
  { id: 44, title: "ポケモンコロシアム", platform: "Gamecube" },
  { id: 45, title: "マリオカートダブルダッシュ！！", platform: "Gamecube" },
  { id: 46, title: "マリオテニスGC", platform: "Gamecube" },
  { id: 47, title: "ワリオワールド", platform: "Gamecube" },
  {
    id: 48,
    title: "実況パワフルプロ野球 10 超決定版 2003メモリアル",
    platform: "Gamecube",
  },
  { id: 49, title: "牧場物語ワンダフルライフ", platform: "Gamecube" },
  {
    id: 50,
    title: "遊戯王Falsebound Kingdom虚構に閉ざされた王国",
    platform: "Gamecube",
  },
  { id: 51, title: "Sa・Ga2 秘宝伝説", platform: "GB" },
  { id: 52, title: "SDガンダム外伝 ラクロアンヒーローズ", platform: "GB" },
  { id: 53, title: "SD戦国伝 国盗り物語", platform: "GB" },
  { id: 54, title: "ウルトラマン倶楽部 敵怪獣ヲ発見セヨ !", platform: "GB" },
  { id: 55, title: "カエルの為に鐘は鳴る", platform: "GB" },
  { id: 56, title: "カービィのピンボール", platform: "GB" },
  { id: 57, title: "スターオーシャン ブルースフィア", platform: "GB" },
  { id: 58, title: "スーパーマリオランド2 6つの金貨", platform: "GB" },
  { id: 59, title: "ゼルダの伝説 ふしぎの木の実 大地の章", platform: "GB" },
  { id: 60, title: "ゼルダの伝説 ふしぎの木の実 時空の章", platform: "GB" },
  { id: 61, title: "ゼルダの伝説 夢をみる島DX", platform: "GB" },
  {
    id: 62,
    title: "ドラゴンクエストモンスターズ テリーのワンダーランド",
    platform: "GB",
  },
  { id: 63, title: "大貝獣物語 ザ・ミラクルオブ ザ・ゾーン", platform: "GB" },
  { id: 64, title: "大貝獣物語 ザ・ミラクルオブ ザ・ゾーン2", platform: "GB" },
  { id: 65, title: "女神転生外伝ラストバイブル", platform: "GB" },
  { id: 66, title: "時空の覇者 Sa・Ga3", platform: "GB" },
  { id: 67, title: "魔界塔士Sa・Ga", platform: "GB" },
  { id: 68, title: "MOTHER 1+2", platform: "GBA" },
  { id: 69, title: "MOTHER 3", platform: "GBA" },
  { id: 70, title: "ことばのパズル もじぴったんアドバンス", platform: "GBA" },
  {
    id: 71,
    title: "キングダム ハーツ チェイン オブ メモリーズ",
    platform: "GBA",
  },
  { id: 72, title: "シャイニング･ソウル", platform: "GBA" },
  { id: 73, title: "スーパーマリオボール", platform: "GBA" },
  { id: 74, title: "ゼルダの伝説 ふしぎのぼうし", platform: "GBA" },
  { id: 75, title: "ソニックスピンボールパーティー", platform: "GBA" },
  { id: 76, title: "ダウンタウン 熱血物語 ex", platform: "GBA" },
  {
    id: 77,
    title: "テイルズ オブ ザ ワールド なりきりダンジョン2",
    platform: "GBA",
  },
  {
    id: 78,
    title: "テイルズ オブ ザ ワールド なりきりダンジョン3",
    platform: "GBA",
  },
  {
    id: 79,
    title: "テイルズ オブ ザ ワールド サモナーズ リネージ",
    platform: "GBA",
  },
  {
    id: 80,
    title: "ドラゴンクエストモンスターズ 　キャラバンハート",
    platform: "GBA",
  },
  { id: 81, title: "ファイナルファンタジー I・II アドバンス", platform: "GBA" },
  {
    id: 82,
    title: "ファイナルファンタジータクティクス アドバンス",
    platform: "GBA",
  },
  { id: 83, title: "マリオカートアドバンス", platform: "GBA" },
  { id: 84, title: "新約聖剣伝説", platform: "GBA" },
  { id: 85, title: "真・女神転生 デビルチルドレン 光の書", platform: "GBA" },
  { id: 86, title: "真・女神転生 デビルチルドレン 闇の書", platform: "GBA" },
  { id: 87, title: "逆転裁判", platform: "GBA" },
  { id: 88, title: "逆転裁判2", platform: "GBA" },
  { id: 89, title: "逆転裁判3", platform: "GBA" },
  { id: 90, title: "黄金の太陽 開かれし封印", platform: "GBA" },
  { id: 91, title: "シャイニング&ザ・ダクネス", platform: "MD" },
  { id: 92, title: "シャイニング・フォース2 古の封印", platform: "MD" },
  { id: 93, title: "シャイニング・フォース～神々の遺産～", platform: "MD" },
  { id: 94, title: "スーパーハイドライド", platform: "MD" },
  { id: 95, title: "バーミリオン", platform: "MD" },
  { id: 96, title: "ファンタシースター3 時の継承者", platform: "MD" },
  { id: 97, title: "ランドストーカー～皇帝の財宝～", platform: "MD" },
  { id: 98, title: "ルナ ザ シルバー スター", platform: "MEGA_CD" },
  { id: 99, title: "真サムライスピリッツ", platform: "NEOGEO_CD" },
  {
    id: 100,
    title: "がんばれゴエモン外伝 きえた黄金キセル [V1.1]",
    platform: "NES",
  },
  { id: 101, title: "じゅうべえくえすと [V1.1]", platform: "NES" },
  { id: 102, title: "ウィロー", platform: "NES" },
  {
    id: 103,
    title: "ウルトラマン倶楽部２ 帰ってきたウルトラマン倶楽部",
    platform: "NES",
  },
  { id: 104, title: "サラダの国のトマト姫", platform: "NES" },
  { id: 105, title: "スーパーマリオブラザーズ３ [V1.1]", platform: "NES" },
  {
    id: 106,
    title: "ダウンタウンスペシャル くにおくんの時代劇だよ全員集合!",
    platform: "NES",
  },
  { id: 107, title: "ダウンタウン熱血物語", platform: "NES" },
  { id: 108, title: "ファイアーエムブレム外伝", platform: "NES" },
  { id: 109, title: "ミネルバトンサーガ ラゴンの復活", platform: "NES" },
  { id: 110, title: "双截龍Ⅱ The Revenge", platform: "NES" },
  { id: 111, title: "双截龍Ⅲ The Rosetta Stone", platform: "NES" },
  { id: 112, title: "忍者らホイ! 痛快うんがちょこ忍法伝", platform: "NES" },
  { id: 113, title: "熱血格闘伝説", platform: "NES" },
  { id: 114, title: "貝獣物語", platform: "NES" },
  {
    id: 115,
    title: "ＳＤガンダム外伝 ナイトガンダム物語 [V1.0]",
    platform: "NES",
  },
  {
    id: 116,
    title: "New スーパーマリオブラザーズ 2",
    platform: "Nintendo 3SD",
  },
  {
    id: 117,
    title: "キングダムハーツ ドリームドロップディスタンス",
    platform: "Nintendo 3SD",
  },
  { id: 118, title: "スーパーマリオ3Dランド", platform: "Nintendo 3SD" },
  { id: 119, title: "ポケットモンスター サン", platform: "Nintendo 3SD" },
  { id: 120, title: "ポケモンアートアカデミー", platform: "Nintendo 3SD" },
  {
    id: 121,
    title: "メタルマックス4 月光のディーヴァ",
    platform: "Nintendo 3SD",
  },
  {
    id: 122,
    title: "ラジアントヒストリア パーフェクトクロノロジー",
    platform: "Nintendo 3SD",
  },
  {
    id: 123,
    title: "真・女神転生 DEEP STRANGE JOURNEY",
    platform: "Nintendo 3SD",
  },
  { id: 124, title: "真・女神転生IV FINAL", platform: "Nintendo 3SD" },
  {
    id: 125,
    title: "1080° テン・エイティスノーボーディング",
    platform: "Nintendo 64",
  },
  { id: 126, title: "ウェーブレース64", platform: "Nintendo 64" },
  {
    id: 127,
    title: "オウガバトル64 Person of Lordly Caliber",
    platform: "Nintendo 64",
  },
  { id: 128, title: "スーパーマリオ64", platform: "Nintendo 64" },
  { id: 129, title: "ゼルダの伝説 ムジュラの仮面", platform: "Nintendo 64" },
  { id: 130, title: "ゼルダの伝説 時のオカリナ", platform: "Nintendo 64" },
  { id: 131, title: "ディディーコングレーシング", platform: "Nintendo 64" },
  { id: 132, title: "ドンキーコング64", platform: "Nintendo 64" },
  { id: 133, title: "パイロットウィングス64", platform: "Nintendo 64" },
  {
    id: 134,
    title: "ヒューマン グランプリ ニュージェネレーション",
    platform: "Nintendo 64",
  },
  { id: 135, title: "マリオカート64", platform: "Nintendo 64" },
  { id: 136, title: "マリオゴルフ64", platform: "Nintendo 64" },
  { id: 137, title: "マリオストーリー", platform: "Nintendo 64" },
  { id: 138, title: "マリオパーティー", platform: "Nintendo 64" },
  { id: 139, title: "マリオパーティー2", platform: "Nintendo 64" },
  { id: 140, title: "マリオパーティー3", platform: "Nintendo 64" },
  { id: 141, title: "ヨッシーストーリー", platform: "Nintendo 64" },
  { id: 142, title: "実況ワールドサッカー3", platform: "Nintendo 64" },
  {
    id: 143,
    title: "実況ワールドサッカーワールドカップフランス98",
    platform: "Nintendo 64",
  },
  {
    id: 144,
    title: "NARUTO-ナルト-疾風伝 最強忍者大結集5 決戦! 暁",
    platform: "Nintendo DS",
  },
  { id: 145, title: "New スーパーマリオブラザーズ", platform: "Nintendo DS" },
  { id: 146, title: "THE 麻雀", platform: "Nintendo DS" },
  { id: 147, title: "おいでよ どうぶつの森", platform: "Nintendo DS" },
  {
    id: 148,
    title: "もっと脳を鍛える大人のDSトレーニング",
    platform: "Nintendo DS",
  },
  { id: 149, title: "アルカイック シールド ヒート", platform: "Nintendo DS" },
  { id: 150, title: "カルドセプトDS", platform: "Nintendo DS" },
  {
    id: 151,
    title: "キングダムハーツ スリー ファイブ エイト デイズ オーバー ツー",
    platform: "Nintendo DS",
  },
  { id: 152, title: "クッキングママ", platform: "Nintendo DS" },
  {
    id: 153,
    title: "クレヨンしんちゃんDS 嵐を呼ぶぬってクレヨ～ん大作戦!",
    platform: "Nintendo DS",
  },
  { id: 154, title: "コンタクト", platform: "Nintendo DS" },
  { id: 155, title: "ジャンプアルティメットスターズ", platform: "Nintendo DS" },
  { id: 156, title: "ゼルダの伝説 大地の汽笛", platform: "Nintendo DS" },
  { id: 157, title: "ソーマブリンガー", platform: "Nintendo DS" },
  { id: 158, title: "テイルズ オブ イノセンス", platform: "Nintendo DS" },
  { id: 159, title: "テイルズ オブ ザ テンペスト", platform: "Nintendo DS" },
  {
    id: 160,
    title: "テイルズオブハーツ CGムービーエディション",
    platform: "Nintendo DS",
  },
  { id: 161, title: "トモダチコレクション", platform: "Nintendo DS" },
  {
    id: 162,
    title: "ドラゴンクエストIX 星空の守り人",
    platform: "Nintendo DS",
  },
  { id: 163, title: "ファイナルファンタジー3", platform: "Nintendo DS" },
  {
    id: 164,
    title: "ファイナルファンタジーXII レヴァナント・ウイング",
    platform: "Nintendo DS",
  },
  {
    id: 165,
    title:
      "ファイナルファンタジー・クリスタルクロニクル エコーズ・オブ・タイム",
    platform: "Nintendo DS",
  },
  {
    id: 166,
    title:
      "ファイナルファンタジー・クリスタルクロニクル リング・オブ・フェイト",
    platform: "Nintendo DS",
  },
  { id: 167, title: "ペンギンの問題X 天空の7戦士", platform: "Nintendo DS" },
  {
    id: 168,
    title: "ポケットモンスター ダイヤモンド",
    platform: "Nintendo DS",
  },
  { id: 169, title: "メタルマックス2 リローテッド", platform: "Nintendo DS" },
  { id: 170, title: "ワンピース ギガントバトル!", platform: "Nintendo DS" },
  {
    id: 171,
    title: "ワールド・デストラクション ～導かれし意思～",
    platform: "Nintendo DS",
  },
  { id: 172, title: "三國志DS2", platform: "Nintendo DS" },
  { id: 173, title: "二ノ国 漆黒の魔導士", platform: "Nintendo DS" },
  { id: 174, title: "女神異聞録 デビルサバイバー", platform: "Nintendo DS" },
  {
    id: 175,
    title: "山川出版社監修 詳説日本史B 総合トレーニング",
    platform: "Nintendo DS",
  },
  {
    id: 176,
    title: "平成教育委員会DS 全国統一模試スペシャル",
    platform: "Nintendo DS",
  },
  { id: 177, title: "幻想水滸伝ティアクライス", platform: "Nintendo DS" },
  { id: 178, title: "桃太郎電鉄DS TOKYO＆JAPAN", platform: "Nintendo DS" },
  {
    id: 179,
    title: "聖剣伝説DS チルドレン オブ マナ",
    platform: "Nintendo DS",
  },
  { id: 180, title: "脳を鍛える大人のDSトレーニング", platform: "Nintendo DS" },
  {
    id: 181,
    title: "遊戯王デュアルモンスターズGX Spirit Summoner",
    platform: "Nintendo DS",
  },
  {
    id: 182,
    title: "高速カードバトル カードヒーロー",
    platform: "Nintendo DS",
  },
  { id: 183, title: "Super System Card (v3.0)", platform: "PCE" },
  { id: 184, title: "System Card (v2.1)", platform: "PCE" },
  { id: 185, title: "ガイアの紋章", platform: "PCE" },
  { id: 186, title: "凄ノ王伝説", platform: "PCE" },
  { id: 187, title: "天の声バンク", platform: "PCE" },
  { id: 188, title: "桃太郎伝説2", platform: "PCE" },
  { id: 189, title: "邪聖剣ネクロマンサー", platform: "PCE" },
  { id: 190, title: "BURAI 八玉の勇士伝説", platform: "PCE_CD-ROM2" },
  {
    id: 191,
    title: "イースIII ワンダラーズフロムイース",
    platform: "PCE_CD-ROM2",
  },
  { id: 192, title: "イースIV Dawn of Ys", platform: "PCE_CD-ROM2" },
  { id: 193, title: "イースI・II", platform: "PCE_CD-ROM2" },
  { id: 194, title: "ウィザードリィＶ", platform: "PCE_CD-ROM2" },
  { id: 195, title: "ダンジョンエクスプローラー2", platform: "PCE_CD-ROM2" },
  { id: 196, title: "ドラゴンスレイヤー英雄伝説", platform: "PCE_CD-ROM2" },
  { id: 197, title: "ドラゴンスレイヤー英雄伝説II", platform: "PCE_CD-ROM2" },
  { id: 198, title: "バスティール", platform: "PCE_CD-ROM2" },
  { id: 199, title: "ブライII　闇皇帝の逆襲", platform: "PCE_CD-ROM2" },
  { id: 200, title: "モンスターメーカー 闇の竜騎士", platform: "PCE_CD-ROM2" },
  { id: 201, title: "ロードス島戦記", platform: "PCE_CD-ROM2" },
  { id: 202, title: "天外魔境 風雲カブキ伝", platform: "PCE_CD-ROM2" },
  { id: 203, title: "天外魔境II 卍MARU", platform: "PCE_CD-ROM2" },
  { id: 204, title: "天外魔境ZIRIA", platform: "PCE_CD-ROM2" },
  { id: 205, title: "空想科学世界ガリバーボーイ", platform: "PCE_CD-ROM2" },
  { id: 206, title: "風の伝説ザナドゥ", platform: "PCE_CD-ROM2" },
  { id: 207, title: "HOSHIGAMI 沈みゆく蒼き大地", platform: "PS1" },
  { id: 208, title: "HOSHIGAMI 虚ろなる蒼き大地", platform: "PS1" },
  { id: 209, title: "NBAパワーダンカーズ", platform: "PS1" },
  { id: 210, title: "NBAパワーダンカーズ2", platform: "PS1" },
  { id: 211, title: "RPGツクール3", platform: "PS1" },
  { id: 212, title: "RPGツクール4", platform: "PS1" },
  { id: 213, title: "SQUARE'S PREVIEW", platform: "PS1" },
  { id: 214, title: "SQUARE'S REVIEW3", platform: "PS1" },
  { id: 215, title: "SQUARE'S REVIEW5", platform: "PS1" },
  { id: 216, title: "THEビリヤード", platform: "PS1" },
  { id: 217, title: "THE登山RPG～銀嶺覇者～", platform: "PS1" },
  { id: 218, title: "THE麻雀", platform: "PS1" },
  { id: 219, title: "XI JUMBO", platform: "PS1" },
  { id: 220, title: "がんばれゴエモン 宇宙海賊アコギング", platform: "PS1" },
  { id: 221, title: "がんばれ森川君2号", platform: "PS1" },
  { id: 222, title: "どこでもいっしょ", platform: "PS1" },
  { id: 223, title: "ぷよぷよSUN決定盤", platform: "PS1" },
  { id: 224, title: "みんなのGOLF2", platform: "PS1" },
  { id: 225, title: "アークザラッド", platform: "PS1" },
  { id: 226, title: "アークザラッドII", platform: "PS1" },
  { id: 227, title: "アークザラッドIII Disk1", platform: "PS1" },
  { id: 228, title: "アークザラッドIII Disk2", platform: "PS1" },
  { id: 229, title: "ウィザードリィ エンパイア", platform: "PS1" },
  { id: 230, title: "ウィザードリィ リルガミン サーガ", platform: "PS1" },
  { id: 231, title: "ウイニングポスト4", platform: "PS1" },
  { id: 232, title: "キングスフィールド", platform: "PS1" },
  { id: 233, title: "ギャロップレーサー", platform: "PS1" },
  { id: 234, title: "クラッシュバンディクーカーニバル", platform: "PS1" },
  { id: 235, title: "クロックタワー2", platform: "PS1" },
  { id: 236, title: "クロノクロス", platform: "PS1" },
  { id: 237, title: "グランツーリスモ Disk2", platform: "PS1" },
  { id: 238, title: "グランツーリスモ", platform: "PS1" },
  { id: 239, title: "グランツーリスモ2 Disk1", platform: "PS1" },
  { id: 240, title: "グランディア Disk1", platform: "PS1" },
  { id: 241, title: "グランディア Disk2", platform: "PS1" },
  { id: 242, title: "サイキックフォース", platform: "PS1" },
  { id: 243, title: "サウザンドアームズ Disk1", platform: "PS1" },
  { id: 244, title: "サウザンドアームズ Disk2", platform: "PS1" },
  { id: 245, title: "サガフロンティア", platform: "PS1" },
  { id: 246, title: "サガフロンティア2 Disk1", platform: "PS1" },
  { id: 247, title: "サガフロンティア2 Disk2", platform: "PS1" },
  { id: 248, title: "ジーワンジョッキー", platform: "PS1" },
  {
    id: 249,
    title: "スターウォーズ エピソード1 ファントム・メナス",
    platform: "PS1",
  },
  {
    id: 250,
    title: "スターオーシャン セカンドストーリー Disk1",
    platform: "PS1",
  },
  {
    id: 251,
    title: "スターオーシャン セカンドストーリー Disk2",
    platform: "PS1",
  },
  {
    id: 252,
    title: "スターオーシャン セカンドストーリー Disk3",
    platform: "PS1",
  },
  { id: 253, title: "ストリートファイターZERO2", platform: "PS1" },
  { id: 254, title: "ストリートファイターZERO3", platform: "PS1" },
  { id: 255, title: "ゼノギアス Disk1", platform: "PS1" },
  { id: 256, title: "ゼノギアス Disk2", platform: "PS1" },
  { id: 257, title: "ソウルエッジ", platform: "PS1" },
  { id: 258, title: "ダンジョンクリエイター Disk1", platform: "PS1" },
  { id: 259, title: "ダンジョンクリエイター Disk2", platform: "PS1" },
  {
    id: 260,
    title: "ダンスダンスレボリューション 2nd ReMix APPEND CLUB VERSION Vol2",
    platform: "PS1",
  },
  { id: 261, title: "ダンスダンスレボリューション 2nd ReMix", platform: "PS1" },
  { id: 262, title: "ダービースタリオン", platform: "PS1" },
  { id: 263, title: "チョコボの不思議なダンジョン Disk1", platform: "PS1" },
  { id: 264, title: "チョコボの不思議なダンジョン Disk2", platform: "PS1" },
  { id: 265, title: "チョコボの不思議なダンジョン2 Disk1", platform: "PS1" },
  { id: 266, title: "チョコボの不思議なダンジョン2 Disk2", platform: "PS1" },
  { id: 267, title: "テイルズオブエターニア Disk1", platform: "PS1" },
  { id: 268, title: "テイルズオブエターニア Disk2", platform: "PS1" },
  { id: 269, title: "テイルズオブエターニア Disk3", platform: "PS1" },
  { id: 270, title: "テイルズオブデスティニー", platform: "PS1" },
  { id: 271, title: "テイルズオブファンタジア", platform: "PS1" },
  { id: 272, title: "テイルズオブファンダム Vol1", platform: "PS1" },
  { id: 273, title: "トバルナンバーワン", platform: "PS1" },
  { id: 274, title: "トルネコの大冒険2", platform: "PS1" },
  { id: 275, title: "ドラゴンクエスト4 導かれし者たち", platform: "PS1" },
  { id: 276, title: "ドラゴンクエストVII Disk1", platform: "PS1" },
  { id: 277, title: "ドラゴンクエストVII Disk2", platform: "PS1" },
  { id: 278, title: "ドラゴンナイツ グロリアス", platform: "PS1" },
  { id: 279, title: "ノエルDisk1", platform: "PS1" },
  { id: 280, title: "ノエルDisk2", platform: "PS1" },
  { id: 281, title: "ハイパーラッシュ", platform: "PS1" },
  { id: 282, title: "ハリーポッターと賢者の石", platform: "PS1" },
  { id: 283, title: "ハンターハンター幻のグリードアイランド", platform: "PS1" },
  { id: 284, title: "バスタード➖虚ろなる神々の器➖", platform: "PS1" },
  { id: 285, title: "バストアムーブ", platform: "PS1" },
  { id: 286, title: "パチスロアルゼ王国2", platform: "PS1" },
  {
    id: 287,
    title: "ビヨンド・ザ・ビヨンド 遙かなるカナーンへ",
    platform: "PS1",
  },
  { id: 288, title: "ファイナルファンタジー", platform: "PS1" },
  { id: 289, title: "ファイナルファンタジーIV", platform: "PS1" },
  { id: 290, title: "ファイナルファンタジーIX Disk1", platform: "PS1" },
  { id: 291, title: "ファイナルファンタジーIX Disk2", platform: "PS1" },
  { id: 292, title: "ファイナルファンタジーIX Disk3", platform: "PS1" },
  { id: 293, title: "ファイナルファンタジーIX Disk4", platform: "PS1" },
  { id: 294, title: "ファイナルファンタジーV", platform: "PS1" },
  { id: 295, title: "ファイナルファンタジーVI", platform: "PS1" },
  { id: 296, title: "ファイナルファンタジーVIII Disk1", platform: "PS1" },
  { id: 297, title: "ファイナルファンタジーVIII Disk2", platform: "PS1" },
  { id: 298, title: "ファイナルファンタジーVIII Disk3", platform: "PS1" },
  { id: 299, title: "ファイナルファンタジーVIII Disk4", platform: "PS1" },
  { id: 300, title: "ファイナルファンタジータクティクス", platform: "PS1" },
  {
    id: 301,
    title: "ブラックマトリクス クロス ベスト版 Disk1",
    platform: "PS1",
  },
  {
    id: 302,
    title: "ブラックマトリクス クロス ベスト版 Disk2",
    platform: "PS1",
  },
  { id: 303, title: "ブレスオブファイア3", platform: "PS1" },
  { id: 304, title: "ブレスオブファイア4 うつろわざるもの", platform: "PS1" },
  { id: 305, title: "ベイグラントストーリー", platform: "PS1" },
  { id: 306, title: "ペルソナ2 罰 Disk1", platform: "PS1" },
  { id: 307, title: "ペルソナ2 罰 Disk2", platform: "PS1" },
  { id: 308, title: "ポポロクロイス物語", platform: "PS1" },
  { id: 309, title: "ポポロクロイス物語2 Disk1", platform: "PS1" },
  { id: 310, title: "ポポロクロイス物語2 Disk2", platform: "PS1" },
  { id: 311, title: "ポポロクロイス物語2 Disk3", platform: "PS1" },
  { id: 312, title: "ポポローグ", platform: "PS1" },
  { id: 313, title: "マジックキャッスル", platform: "PS1" },
  { id: 314, title: "リッジレーサー TYPE4", platform: "PS1" },
  { id: 315, title: "リッジレーサー ハイスペックVER", platform: "PS1" },
  { id: 316, title: "リッジレーサー レボリューション", platform: "PS1" },
  { id: 317, title: "リンダキューブアゲイン", platform: "PS1" },
  { id: 318, title: "レガイア伝説", platform: "PS1" },
  { id: 319, title: "レジェンド オブ ドラグーン Disk1", platform: "PS1" },
  { id: 320, title: "レジェンド オブ ドラグーン Disk2", platform: "PS1" },
  { id: 321, title: "レジェンド オブ ドラグーン Disk3", platform: "PS1" },
  { id: 322, title: "レジェンド オブ ドラグーン Disk4", platform: "PS1" },
  { id: 323, title: "ワイプアウトXL", platform: "PS1" },
  {
    id: 324,
    title: "ワイルドアームズ 2nd イグニッション Disk1",
    platform: "PS1",
  },
  {
    id: 325,
    title: "ワイルドアームズ 2nd イグニッション Disk2",
    platform: "PS1",
  },
  { id: 326, title: "ワイルドアームズ", platform: "PS1" },
  { id: 327, title: "ワールドスタジアム3", platform: "PS1" },
  {
    id: 328,
    title: "ワールド・ネバーランド2 プルト共和国物語",
    platform: "PS1",
  },
  { id: 329, title: "ヴァルキリープロファイル Disk1", platform: "PS1" },
  { id: 330, title: "ヴァルキリープロファイル Disk2", platform: "PS1" },
  { id: 331, title: "ヴァンダルハーツ〜失われた古代文明〜", platform: "PS1" },
  { id: 332, title: "仙界通録正史", platform: "PS1" },
  { id: 333, title: "仮面ライダー龍騎", platform: "PS1" },
  { id: 334, title: "俺の屍を越えてゆけ", platform: "PS1" },
  { id: 335, title: "全日本プロレス_王者の魂", platform: "PS1" },
  { id: 336, title: "女神異聞録ペルソナ", platform: "PS1" },
  { id: 337, title: "季節を抱きしめて Disk1", platform: "PS1" },
  { id: 338, title: "季節を抱きしめて Disk2", platform: "PS1" },
  {
    id: 339,
    title: "実況ウイニングイレブン2000 U-23メダルへの挑戦",
    platform: "PS1",
  },
  { id: 340, title: "実況パワフルプロ野球2001", platform: "PS1" },
  { id: 341, title: "家庭の風水", platform: "PS1" },
  { id: 342, title: "幻想水滸伝", platform: "PS1" },
  { id: 343, title: "幻想水滸伝II", platform: "PS1" },
  { id: 344, title: "機動戦士ガンダム", platform: "PS1" },
  { id: 345, title: "武蔵伝", platform: "PS1" },
  { id: 346, title: "第4次スーパーロボット大戦S", platform: "PS1" },
  { id: 347, title: "繭玉物語", platform: "PS1" },
  { id: 348, title: "聖剣伝説 Legend of Mana", platform: "PS1" },
  { id: 349, title: "遥かなる時空の中で", platform: "PS1" },
  { id: 350, title: "鉄拳3", platform: "PS1" },
  { id: 351, title: "7〜モールモースの騎兵隊〜", platform: "PS2" },
  { id: 352, title: "BUSIN Wizardry Alternative", platform: "PS2" },
  { id: 353, title: "Enter The Matrix", platform: "PS2" },
  { id: 354, title: "ZONE OF THE ENDERS Z.O.E", platform: "PS2" },
  { id: 355, title: "アバタール・チューナー", platform: "PS2" },
  { id: 356, title: "アバタール・チューナー2", platform: "PS2" },
  { id: 357, title: "アンリミテッド・サガ", platform: "PS2" },
  { id: 358, title: "アークザラッド 精霊の黄昏", platform: "PS2" },
  { id: 359, title: "エターナルリング", platform: "PS2" },
  { id: 360, title: "エヴァーグレイス", platform: "PS2" },
  { id: 361, title: "キングダム ハーツ ファイナルミックス", platform: "PS2" },
  { id: 362, title: "キングダム ハーツ", platform: "PS2" },
  { id: 363, title: "キングダムハーツ2", platform: "PS2" },
  { id: 364, title: "キングダムハーツIII", platform: "PS2" },
  { id: 365, title: "グランディア エクストリーム", platform: "PS2" },
  { id: 366, title: "グランディアIII Disk1", platform: "PS2" },
  { id: 367, title: "グランディアIII Disk2", platform: "PS2" },
  { id: 368, title: "サモンナイト3", platform: "PS2" },
  { id: 369, title: "シャイニング・フォースネオ", platform: "PS2" },
  { id: 370, title: "ジルオール インフィニット", platform: "PS2" },
  { id: 371, title: "スターオーシャン3", platform: "PS2" },
  { id: 372, title: "ステラデウス", platform: "PS2" },
  { id: 373, title: "ゼノサーガ エピソードI［力への意志］", platform: "PS2" },
  { id: 374, title: "ダーククロニクル", platform: "PS2" },
  {
    id: 375,
    title: "ダージュ オブ ケルベロス -ファイナルファンタジーVII-",
    platform: "PS2",
  },
  { id: 376, title: "テイルズオブシンフォニア", platform: "PS2" },
  { id: 377, title: "テイルズオブジアビス", platform: "PS2" },
  { id: 378, title: "テイルズオブデスティニー", platform: "PS2" },
  { id: 379, title: "テイルズオブデスティニー2", platform: "PS2" },
  { id: 380, title: "テイルズオブリバース", platform: "PS2" },
  { id: 381, title: "テイルズオブレジェンディア", platform: "PS2" },
  {
    id: 382,
    title: "ドラゴンクエストVIII 空と海と大地と呪われし姫君",
    platform: "PS2",
  },
  { id: 383, title: "バイオハザード コード：ベロニカ 完全版", platform: "PS2" },
  { id: 384, title: "バウンサー", platform: "PS2" },
  { id: 385, title: "バルダーズゲート ダークアライアンス", platform: "PS2" },
  { id: 386, title: "ファイナルファンタジーX-2", platform: "PS2" },
  { id: 387, title: "ファイナルファンタジーX", platform: "PS2" },
  {
    id: 388,
    title:
      "ファイナルファンタジーXII インターナショナル ゾディアックジョブシステム",
    platform: "PS2",
  },
  { id: 389, title: "ファンタシースターユニバース", platform: "PS2" },
  { id: 390, title: "ファントム・ブレイブ", platform: "PS2" },
  {
    id: 391,
    title: "ブレス オブ ファイア5 ドラゴンクォーター",
    platform: "PS2",
  },
  { id: 392, title: "ペルソナ3", platform: "PS2" },
  { id: 393, title: "ペルソナ4", platform: "PS2" },
  { id: 394, title: "ポポロクロイス物語 月の掟の冒険", platform: "PS2" },
  { id: 395, title: "ポポロクロイス～はじまりの冒険～", platform: "PS2" },
  { id: 396, title: "マグナカルタ", platform: "PS2" },
  { id: 397, title: "ラジアータストーリーズ", platform: "PS2" },
  { id: 398, title: "ロマンシング サガ -ミンストレルソング-", platform: "PS2" },
  { id: 399, title: "ローグギャラクシー", platform: "PS2" },
  { id: 400, title: "ワイルドアームズ アルターコード：エフ", platform: "PS2" },
  { id: 401, title: "ヴァルキリープロファイル2 -シルメリア-", platform: "PS2" },
  { id: 402, title: "三國志VII", platform: "PS2" },
  { id: 403, title: "天外魔境3 NAMIDA", platform: "PS2" },
  { id: 404, title: "幻想水滸伝5", platform: "PS2" },
  { id: 405, title: "幻想水滸伝III", platform: "PS2" },
  { id: 406, title: "幻想水滸伝IV", platform: "PS2" },
  { id: 407, title: "武蔵伝2", platform: "PS2" },
  { id: 408, title: "牧場物語3～ハートに火をつけて～", platform: "PS2" },
  { id: 409, title: "真・女神転生III NOCTURNE", platform: "PS2" },
  { id: 410, title: "聖剣伝説4", platform: "PS2" },
  { id: 411, title: "Demons Souls", platform: "PS3" },
  { id: 412, title: "DmC Devil May Cry", platform: "PS3" },
  { id: 413, title: "Dragon Age II", platform: "PS3" },
  { id: 414, title: "STAR OCEAN THE LAST HOPE INTERNATIONAL", platform: "PS3" },
  { id: 415, title: "WATCHDOGS", platform: "PS3" },
  { id: 416, title: "ことばのパズル もじぴったん大辞典", platform: "PSP" },
  { id: 417, title: "つくものがたり", platform: "PSP" },
  { id: 418, title: "アンチェインブレイズ レクス", platform: "PSP" },
  { id: 419, title: "イース7", platform: "PSP" },
  { id: 420, title: "エクシズ・フォルス", platform: "PSP" },
  {
    id: 421,
    title: "エルミナージュ ORIGINAL ～闇の巫女と神々の指輪～",
    platform: "PSP",
  },
  {
    id: 422,
    title: "エルミナージュII ～双生の女神と運命の大地～",
    platform: "PSP",
  },
  {
    id: 423,
    title: "キングダムハーツ バース バイ スリープ ファイナルミックス",
    platform: "PSP",
  },
  { id: 424, title: "キングダムハーツ バース バイ スリープ", platform: "PSP" },
  {
    id: 425,
    title: "クライシス コア -ファイナルファンタジーVII-",
    platform: "PSP",
  },
  {
    id: 426,
    title: "グランド・セフト・オート・バイスシティ・ストーリーズ",
    platform: "PSP",
  },
  { id: 427, title: "グランナイツヒストリー", platform: "PSP" },
  { id: 428, title: "シャイニング・アーク", platform: "PSP" },
  { id: 429, title: "シャイニング・ハーツ", platform: "PSP" },
  { id: 430, title: "シャイニング・ブレイド", platform: "PSP" },
  { id: 431, title: "ジルオール～インフィニットプラス～", platform: "PSP" },
  {
    id: 432,
    title: "スターオーシャン1 ファースト ディパーチャー",
    platform: "PSP",
  },
  { id: 433, title: "スターオーシャン2 Second Evolution", platform: "PSP" },
  { id: 434, title: "セブンスドラゴン2020-II", platform: "PSP" },
  { id: 435, title: "セブンスドラゴン2020", platform: "PSP" },
  { id: 436, title: "タクティクスオウガ 運命の輪", platform: "PSP" },
  {
    id: 437,
    title: "テイルズ オブ ザ ワールド レディアント マイソロジー",
    platform: "PSP",
  },
  {
    id: 438,
    title: "テイルズ オブ ザ ワールド レディアントマイソロジー2",
    platform: "PSP",
  },
  {
    id: 439,
    title: "テイルズ オブ ザ ワールド レディアントマイソロジー3",
    platform: "PSP",
  },
  { id: 440, title: "テイルズオブエターニア", platform: "PSP" },
  {
    id: 441,
    title: "テイルズオブファンタジア なりきりダンジョンX",
    platform: "PSP",
  },
  { id: 442, title: "ファイナルファンタジーIV", platform: "PSP" },
  { id: 443, title: "ファイナルファンタジー零式 Disk1", platform: "PSP" },
  { id: 444, title: "ファイナルファンタジー零式 Disk2", platform: "PSP" },
  { id: 445, title: "ペルソナ2 罪", platform: "PSP" },
  { id: 446, title: "ポポロクロイス物語 ピエトロ王子の冒険", platform: "PSP" },
  { id: 447, title: "モンスターハンターポータブル 3rd", platform: "PSP" },
  { id: 448, title: "ラグナロク ～光と闇の皇女～", platform: "PSP" },
  { id: 449, title: "リゼルクロス", platform: "PSP" },
  { id: 450, title: "リッジレーサーズ", platform: "PSP" },
  { id: 451, title: "ロストヒーローズ", platform: "PSP" },
  { id: 452, title: "ヴァルハラナイツ2 バトルスタンス", platform: "PSP" },
  { id: 453, title: "剣と魔法と学園モノ。", platform: "PSP" },
  { id: 454, title: "剣と魔法と学園モノ。2", platform: "PSP" },
  { id: 455, title: "剣と魔法と学園モノ。3", platform: "PSP" },
  { id: 456, title: "喧嘩番長 Bros トーキョーバトルロイヤル", platform: "PSP" },
  { id: 457, title: "喧嘩番長4 ～一年戦争～", platform: "PSP" },
  { id: 458, title: "天地の門2 無双伝", platform: "PSP" },
  { id: 459, title: "太鼓の達人 ぽ～たぶる2", platform: "PSP" },
  { id: 460, title: "幻想水滸伝 紡がれし百年の時", platform: "PSP" },
  { id: 461, title: "最後の約束の物語", platform: "PSP" },
  { id: 462, title: "無限回廊", platform: "PSP" },
  { id: 463, title: "真・三國無双", platform: "PSP" },
  { id: 464, title: "福福の島", platform: "PSP" },
  { id: 465, title: "英雄伝説 碧の軌跡", platform: "PSP" },
  { id: 466, title: "英雄伝説 空の軌跡FC", platform: "PSP" },
  { id: 467, title: "英雄伝説 空の軌跡SC Disk1", platform: "PSP" },
  { id: 468, title: "英雄伝説 空の軌跡SC Disk2", platform: "PSP" },
  { id: 469, title: "英雄伝説 零の軌跡", platform: "PSP" },
  { id: 470, title: "魔界戦記ディスガイア2 PORTABLE", platform: "PSP" },
  { id: 471, title: "エネミー・ゼロ", platform: "SEGA_Saturn" },
  { id: 472, title: "ドラゴンフォース", platform: "SEGA_Saturn" },
  {
    id: 473,
    title: "ドラゴンフォース2 神去りし大地に",
    platform: "SEGA_Saturn",
  },
  { id: 474, title: "バーチャファイターリミックス", platform: "SEGA_Saturn" },
  { id: 475, title: "天外魔境 第四の黙示録 Disk1", platform: "SEGA_Saturn" },
  { id: 476, title: "天外魔境 第四の黙示録 Disk2", platform: "SEGA_Saturn" },
  { id: 477, title: "SDガンダム外伝2 円卓の騎士", platform: "SNES" },
  { id: 478, title: "SDザ・グレイトバトル 新たなる挑戦", platform: "SNES" },
  { id: 479, title: "かまいたちの夜", platform: "SNES" },
  { id: 480, title: "アクトレイザー", platform: "SNES" },
  { id: 481, title: "ウルティマ6 偽りの予言者", platform: "SNES" },
  { id: 482, title: "エストポリス伝記", platform: "SNES" },
  { id: 483, title: "エルファリア", platform: "SNES" },
  { id: 484, title: "エルファリア2", platform: "SNES" },
  { id: 485, title: "ガイア幻想紀", platform: "SNES" },
  { id: 486, title: "ガデュリン", platform: "SNES" },
  { id: 487, title: "クロノ・トリガー", platform: "SNES" },
  { id: 488, title: "グランヒストリア 〜幻史世界記〜", platform: "SNES" },
  { id: 489, title: "サンサーラ・ナーガ2", platform: "SNES" },
  {
    id: 490,
    title: "ザ・グレイトバトル2 ラストファイターツイン",
    platform: "SNES",
  },
  { id: 491, title: "ザ・グレイトバトル3", platform: "SNES" },
  { id: 492, title: "ザ・グレイトバトル4", platform: "SNES" },
  { id: 493, title: "ザ・ラストバトル", platform: "SNES" },
  { id: 494, title: "シルヴァサーガ2", platform: "SNES" },
  { id: 495, title: "スターオーシャン", platform: "SNES" },
  { id: 496, title: "スーパースターウォーズ", platform: "SNES" },
  { id: 497, title: "スーパードンキーコング", platform: "SNES" },
  { id: 498, title: "スーパーマリオRPG", platform: "SNES" },
  { id: 499, title: "スーパーマリオカート", platform: "SNES" },
  { id: 500, title: "スーパーマリオコレクション", platform: "SNES" },
  { id: 501, title: "スーパーロボット大戦FX", platform: "SNES" },
  { id: 502, title: "スーパー伊忍道 打倒信長", platform: "SNES" },
  { id: 503, title: "ゼルダの伝説 神々のトライフォース", platform: "SNES" },
  { id: 504, title: "ソウルブレイダー", platform: "SNES" },
  { id: 505, title: "ソード・ワールドSFC", platform: "SNES" },
  { id: 506, title: "ソード・ワールドSFC2", platform: "SNES" },
  { id: 507, title: "ダンジョンマスター", platform: "SNES" },
  { id: 508, title: "ダークキングダム", platform: "SNES" },
  { id: 509, title: "ダークハーフ", platform: "SNES" },
  {
    id: 510,
    title: "トルネコの大冒険～不思議のダンジョン～",
    platform: "SNES",
  },
  { id: 511, title: "トレジャーハンターG", platform: "SNES" },
  { id: 512, title: "ドラゴンクエスト3 そして伝説へ・・・", platform: "SNES" },
  { id: 513, title: "ドラゴンズ・アース", platform: "SNES" },
  { id: 514, title: "バハムートラグーン", platform: "SNES" },
  { id: 515, title: "ファイナルファイト2", platform: "SNES" },
  { id: 516, title: "ブレス オブ ファイア 竜の戦士", platform: "SNES" },
  { id: 517, title: "ブレス オブ ファイア2 使命の子", platform: "SNES" },
  { id: 518, title: "ヘラクレスの栄光3 神々の沈黙", platform: "SNES" },
  { id: 519, title: "ヘラクレスの栄光4 神々からの贈り物", platform: "SNES" },
  { id: 520, title: "マーヴェラス もうひとつの宝島", platform: "SNES" },
  { id: 521, title: "ミスティックアーク", platform: "SNES" },
  { id: 522, title: "メタルマックス2", platform: "SNES" },
  { id: 523, title: "メタルマックスリターンズ", platform: "SNES" },
  { id: 524, title: "ライブ・ア・ライブ", platform: "SNES" },
  { id: 525, title: "ラストバイブル3", platform: "SNES" },
  { id: 526, title: "レディストーカー ～過去からの挑戦～", platform: "SNES" },
  { id: 527, title: "レナス 古代機械の記憶", platform: "SNES" },
  { id: 528, title: "ロックマン7 宿命の対決！", platform: "SNES" },
  { id: 529, title: "ロックマンX", platform: "SNES" },
  { id: 530, title: "ロマンシングサガ", platform: "SNES" },
  { id: 531, title: "三國志IV", platform: "SNES" },
  { id: 532, title: "商人よ、大志を抱け!!", platform: "SNES" },
  { id: 533, title: "大貝獣物語", platform: "SNES" },
  { id: 534, title: "天地創造", platform: "SNES" },
  { id: 535, title: "天外魔境ZERO", platform: "SNES" },
  { id: 536, title: "弁慶外伝 沙の章", platform: "SNES" },
  { id: 537, title: "摩訶摩訶", platform: "SNES" },
  { id: 538, title: "新桃太郎伝説", platform: "SNES" },
  { id: 539, title: "真・女神転生", platform: "SNES" },
  { id: 540, title: "真・女神転生2", platform: "SNES" },
  { id: 541, title: "真・女神転生if...", platform: "SNES" },
  { id: 542, title: "魂斗羅スピリッツ", platform: "SNES" },
  { id: 543, title: "魍魎戦記MADARA2", platform: "SNES" },
  { id: 544, title: "龍虎の拳", platform: "SNES" },
  { id: 545, title: "merge", platform: "Wii" },
  { id: 546, title: "WiiSportsResort", platform: "Wii" },
  { id: 547, title: "スーパーマリオギャラクシー", platform: "Wii" },
  { id: 548, title: "スーパーマリオギャラクシー2", platform: "Wii" },
  { id: 549, title: "スーパーマリオコレクション", platform: "Wii" },
  { id: 550, title: "ゼルダの伝説 スカイウォードソード", platform: "Wii" },
  { id: 551, title: "ゼルダの伝説 トワイライトプリンセス", platform: "Wii" },
  {
    id: 552,
    title: "チョコボの不思議なダンジョン 時忘れの迷宮",
    platform: "Wii",
  },
  {
    id: 553,
    title: "テイルズ オブ シンフォニア ラタトスクの騎士",
    platform: "Wii",
  },
  { id: 554, title: "テイルズオブグレイセス", platform: "Wii" },
  {
    id: 555,
    title:
      "ファイナルファンタジー・クリスタルクロニクル エコーズ・オブ・タイム",
    platform: "Wii",
  },
  { id: 556, title: "メトロイドアザーエム", platform: "Wii" },
  {
    id: 557,
    title: "不思議のダンジョン 風来のシレン3 ～からくり屋敷の眠り姫～",
    platform: "Wii",
  },
  { id: 558, title: "星のカービィWii", platform: "Wii" },
  { id: 559, title: "朧村正", platform: "Wii" },
  { id: 560, title: "真・女神転生NINE スタンドアローン版", platform: "XBOX" },
];

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
                <th onClick={sortTitle}>タイトル</th>
                <th>プラットフォーム</th>
                <th>ジャンル</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.map((d) => (
                <tr key={d.id}>
                  <td>{d.title}</td>
                  <td>{d.platform}</td>
                  <td>{d.genre}</td>
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
