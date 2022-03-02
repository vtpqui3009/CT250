import { useState } from "react";

export const usePagination = ({ loadedData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(8);
  const indexOfLastRecord = currentPage * dataPerPage;
  const indexOfFirstRecord = indexOfLastRecord - dataPerPage;
  const currentRecord =
    loadedData && loadedData.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalData = loadedData && loadedData.length;
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return [dataPerPage, currentRecord, totalData, handlePaginate];
};
