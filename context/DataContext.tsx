'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EigyoInfo, AtariInfo, ShinchokuKanri, MasterData } from '@/types';
import mastersData from '@/data/masters.json';
import eigyoData from '@/data/eigyo.json';
import atariData from '@/data/atari.json';
import shinchokuData from '@/data/shinchoku.json';

interface DataContextType {
  masters: MasterData;
  eigyoList: EigyoInfo[];
  atariList: AtariInfo[];
  shinchokuList: ShinchokuKanri[];
  addEigyo: (data: EigyoInfo) => void;
  updateEigyo: (id: string, data: EigyoInfo) => void;
  deleteEigyo: (id: string) => void;
  getEigyoById: (id: string) => EigyoInfo | undefined;
  addAtari: (data: AtariInfo) => void;
  updateAtari: (id: string, data: AtariInfo) => void;
  deleteAtari: (id: string) => void;
  getAtariById: (id: string) => AtariInfo | undefined;
  addShinchoku: (data: ShinchokuKanri) => void;
  updateShinchoku: (id: string, data: ShinchokuKanri) => void;
  deleteShinchoku: (id: string) => void;
  getShinchokuById: (id: string) => ShinchokuKanri | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [eigyoList, setEigyoList] = useState<EigyoInfo[]>([]);
  const [atariList, setAtariList] = useState<AtariInfo[]>([]);
  const [shinchokuList, setShinchokuList] = useState<ShinchokuKanri[]>([]);
  const [masters] = useState<MasterData>(mastersData as MasterData);

  useEffect(() => {
    setEigyoList(eigyoData as EigyoInfo[]);
    setAtariList(atariData as AtariInfo[]);
    setShinchokuList(shinchokuData as ShinchokuKanri[]);
  }, []);

  // Eigyo operations
  const addEigyo = (data: EigyoInfo) => {
    setEigyoList((prev) => [...prev, data]);
  };

  const updateEigyo = (id: string, data: EigyoInfo) => {
    setEigyoList((prev) =>
      prev.map((item) => (item.id === id ? data : item))
    );
  };

  const deleteEigyo = (id: string) => {
    setEigyoList((prev) => prev.filter((item) => item.id !== id));
  };

  const getEigyoById = (id: string) => {
    return eigyoList.find((item) => item.id === id);
  };

  // Atari operations
  const addAtari = (data: AtariInfo) => {
    setAtariList((prev) => [...prev, data]);
  };

  const updateAtari = (id: string, data: AtariInfo) => {
    setAtariList((prev) =>
      prev.map((item) => (item.id === id ? data : item))
    );
  };

  const deleteAtari = (id: string) => {
    setAtariList((prev) => prev.filter((item) => item.id !== id));
  };

  const getAtariById = (id: string) => {
    return atariList.find((item) => item.id === id);
  };

  // Shinchoku operations
  const addShinchoku = (data: ShinchokuKanri) => {
    setShinchokuList((prev) => [...prev, data]);
  };

  const updateShinchoku = (id: string, data: ShinchokuKanri) => {
    setShinchokuList((prev) =>
      prev.map((item) => (item.id === id ? data : item))
    );
  };

  const deleteShinchoku = (id: string) => {
    setShinchokuList((prev) => prev.filter((item) => item.id !== id));
  };

  const getShinchokuById = (id: string) => {
    return shinchokuList.find((item) => item.id === id);
  };

  return (
    <DataContext.Provider
      value={{
        masters,
        eigyoList,
        atariList,
        shinchokuList,
        addEigyo,
        updateEigyo,
        deleteEigyo,
        getEigyoById,
        addAtari,
        updateAtari,
        deleteAtari,
        getAtariById,
        addShinchoku,
        updateShinchoku,
        deleteShinchoku,
        getShinchokuById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

