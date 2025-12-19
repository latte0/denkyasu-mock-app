// Master Data Types
export interface MasterData {
  eigyokyoku: EigyokyokuMaster[];
  status: StatusMaster[];
  kakudo: KakudoMaster[];
  talent: TalentMaster[];
  koukokushu: KoukokushuMaster[];
  media: MediaMaster[];
  himoku: HimokuMaster[];
  dceTantobu: DceTantobuMaster[];
  kyougohani: string[];
  shiyoukikan: string[];
  shiyochiiki: string[];
  teianKahi: string[];
  shokaiShutsuryoKubun: string[];
}

export interface EigyokyokuMaster {
  code: string;
  name: string;
}

export interface StatusMaster {
  code: string;
  name: string;
}

export interface KakudoMaster {
  code: string;
  name: string;
}

export interface TalentMaster {
  code: string;
  name: string;
}

export interface KoukokushuMaster {
  code: string;
  seishikimei: string;
}

export interface MediaMaster {
  code: string;
  name: string;
}

export interface HimokuMaster {
  code: string;
  name: string;
}

export interface DceTantobuMaster {
  code: string;
  name: string;
}

// 営業情報 (Sales Information) - 95 fields
export interface EigyoInfo {
  id: string;
  // 基本情報
  koukokushu: string; // 広告主
  eigyokyoku: string; // 営業局
  setteikyoku1: string; // 設定局１
  setteikyoku2: string; // 設定局２
  shohinService: string; // 商品・サービス
  status: string; // ステータス
  kakudo: string; // 確度
  talent: string[]; // タレント
  johoKokaibiDate: string; // 情報公開日
  johoKokaibiSelect1: string;
  johoKokaibiStatus: string;
  keiyakuKaishiDate: string; // 契約開始
  keiyakuKaishiSelect1: string;
  keiyakuKaishiSelect2: string;
  keiyakuShuryoDate: string; // 契約終了
  keiyakuShuryoSelect1: string;
  keiyakuShuryoBunkatsuKeijo: boolean; // 契約終了_分割計上
  nouhinbiDate: string; // 納品日
  nouhinbiSelect1: string;
  nouhinbiSelect2: string;
  himoku: string; // 費目
  himokuJikoShou: boolean; // 費目_自己商
  himokuTatenSeisaku: boolean; // 費目_他店制作
  
  // 金額
  keiyakuryoDentsuToDce: number; // 契約料（電通 他→DCE）
  keiyakuryoDentsuToDceSelect: string;
  keiyakuryoDceToJimusho: number; // 契約料（DCE→事務所 他）
  keiyakuryoDceToJimushoCheck: boolean;
  keiyakuryoDceToJimushoSelect: string;
  sagakuRieki: number; // 差額利益
  sagakuRiekiSelect: string;
  tesuuryoHonsha: number; // 手数料（本社）
  tesuuryoHonshaSelect: string;
  tesuuryoDce: number; // 手数料（DCE）
  tesuuryoDceSelect: string;
  dceSouRieki: number; // DCE総利益
  dceSouRiekiSelect: string;
  kigyoKanrihi: number; // 企業管理費
  kigyoKanrihiSelect: string;
  w65: number; // (W6.5)
  w65Select: string;
  
  // 出演情報
  shokaiShutsuenbiDate: string; // 初回出演日
  shokaiShutsuenbiSelect1: string;
  shokaiShutsuenbiSelect2: string;
  shokaiShutsuenryoDentsuToDce: string; // 初回出演料（電通 他→DCE）
  shokaiShutsuenryoDceToJimusho: string; // 初回出演料（DCE→事務所 他）
  kyougouNg: string[]; // 競合NG
  sonotaBunrui: string; // その他分類
  kyougouGray: string[]; // 競合グレー
  
  // 営業情報
  tantoEigyo: string; // 担当営業
  setteiCd: string; // 設定CD
  tantoCd: string; // 担当CD
  tantoCdText: string;
  tantoCr1: string; // 担当CR１
  tantoCr1Text: string;
  tantoCr2: string; // 担当CR２
  tantoCr2Text: string;
  tantoCp: string; // 担当CP
  
  // 事務所情報
  shozokuJimusho: string; // 所属事務所
  jimushoTantosha: string; // 事務所担当者
  shutsuenKanri: string; // 出演管理
  shutsuenKanriTantosha: string; // 出演管理担当者
  
  // 社内管理情報
  dceTantosha1: string; // DCE担当者_1
  dceTantosha1Percent: number;
  dceTantosha2: string;
  dceTantosha2Percent: number;
  dceTantosha3: string;
  dceTantosha3Percent: number;
  dceTantosha4: string;
  dceTantosha4Percent: number;
  dceEigyoTantosha: string; // DCE営業担当者
  dceKeiyakuTantosha: string; // DCE契約担当者
  gyomuNaiyo: string; // 業務内容
  bunseki: string; // 文責
  
  // 出演料単価_1
  shutsuenryoTanka1Baitai: string;
  shutsuenryoTanka1Percent: number;
  shutsuenryoTanka1DentsuToDce: number;
  shutsuenryoTanka1DceToJimusho: number;
  
  // 出演料単価_2
  shutsuenryoTanka2Baitai: string;
  shutsuenryoTanka2Percent: number;
  shutsuenryoTanka2DentsuToDce: number;
  shutsuenryoTanka2DceToJimusho: number;
  
  // 出演料単価_3
  shutsuenryoTanka3Baitai: string;
  shutsuenryoTanka3Percent: number;
  shutsuenryoTanka3DentsuToDce: number;
  shutsuenryoTanka3DceToJimusho: number;
  
  // 出演料単価_4
  shutsuenryoTanka4Baitai: string;
  shutsuenryoTanka4Percent: number;
  shutsuenryoTanka4DentsuToDce: number;
  shutsuenryoTanka4DceToJimusho: number;
  
  // 出演料単価_5
  shutsuenryoTanka5Baitai: string;
  shutsuenryoTanka5Percent: number;
  shutsuenryoTanka5DentsuToDce: number;
  shutsuenryoTanka5DceToJimusho: number;
}

// あたり情報 (Atari Information) - 16 fields
export interface AtariInfo {
  id: string;
  koukokushu: string; // 広告主
  shohinService: string; // 商品・サービス
  talentMei: string; // タレント名
  kyougohani: string; // 競合範囲
  shiyoukikan: string; // 使用期間
  shiyoubaitai: string; // 使用媒体
  teijigaku1: number; // 提示金額_1
  teijigaku2: number; // 提示金額_2
  shokaiShutsuenryo: string; // 初回出演料
  shiyochiiki: string; // 使用地域
  teianKahi: string; // 提案可否
  kikakuNaiyo: string; // 企画内容
  memo: string; // メモ
  johoTeikyosha: string; // 情報提供者
  johoNyuryokubiDate: string; // 情報入力日
}

// 進捗管理 (Progress Management) - 18 fields
export interface ShinchokuKanri {
  id: string;
  casInput: string; // CASインプット (YYYY/MM/DD)
  seikyusakiKaraNoHacchuusho: boolean; // 請求先からの発注書
  mitsumorigaki: boolean; // 見積書
  casInputJuchubango: string; // CASインプット 受発注番号
  casHacchuuShinsei: string; // CAS発注申請 (YYYY/MM/DD)
  daisSoufu: string; // DAIS送付 (YYYY/MM/DD)
  nouhinKakunin: string; // 納品確認 (YYYY/MM/DD)
  casHenoKeiyakushoTenpu: boolean; // CASへの契約書添付
  sapTouroku: string; // SAP登録 (JOB NO)
  jimushoKaraNoSeikyushoJuryo: string; // 事務所からの請求書受領 (YYYY/MM/DD)
  dc1HenoSeikyushoSoufu: string; // DC1への請求書送付 (YYYY/MM/DD)
  seikyusakiHenoSeikyushoSoufu: string; // 請求先への請求書送付 (YYYY/MM/DD)
  shitaukehoutaiShou: boolean; // 下請法対象
  freelance: boolean; // フリーランス
  sapKeijo: boolean; // SAP計上
  jimushoHenoHacchuusho: string; // 事務所への発注書
  ankenMei: string; // 案件名 (for display purposes)
  tantosha: string; // 担当者 (for display purposes)
}





