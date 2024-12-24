"use client";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { Column, useTable } from "react-table";

interface TableProps {
  columns: Column[];
  data: any[];
}

const Table: FC<TableProps> = ({ columns, data }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const startRowIndex = useRef<number | null>(null);
  const lastSelectedRowIndex = useRef<number | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const dragging = useRef<boolean>(false);
  const isMouseMove = useRef<boolean>(false);

  const handleMouseDown = useCallback(
    (rowIndex: number) => {
      if (selectedRows.includes(rowIndex)) {
        setIsMoving(true);
      } else {
        dragging.current = true;
        startRowIndex.current = rowIndex;
        isMouseMove.current = false;
        lastSelectedRowIndex.current = rowIndex;
        setSelectedRows([rowIndex]);
      }
    },
    [selectedRows]
  );

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    isMouseMove.current = true;
  }, []);

  const handleMouseEnter = useCallback((rowIndex: number) => {
    if (dragging.current && startRowIndex.current !== null) {
      const min = Math.min(startRowIndex.current, rowIndex);
      const max = Math.max(startRowIndex.current, rowIndex);
      const newSelectedRows = [];
      for (let i = min; i <= max; i++) {
        newSelectedRows.push(i);
      }
      setSelectedRows(newSelectedRows);
      lastSelectedRowIndex.current = rowIndex;
    }
  }, []);

  const handleMouseUp = () => {
    console.log("MOUSEUP", { isMouseMove: isMouseMove.current });
    dragging.current = false;
    setIsMoving(false);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columns as any,
      data,
    });

  const handleCtrlClick = useCallback((rowIndex: number) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(rowIndex)) {
        return prevSelectedRows.filter((index) => index !== rowIndex);
      } else {
        return [...prevSelectedRows, rowIndex];
      }
    });
    lastSelectedRowIndex.current = rowIndex;
  }, []);

  const handleShiftClick = useCallback(
    (rowIndex: number) => {
      if (lastSelectedRowIndex.current === null) {
        setSelectedRows([rowIndex]);
      } else {
        const min = Math.min(lastSelectedRowIndex.current, rowIndex);
        const max = Math.max(lastSelectedRowIndex.current, rowIndex);
        const newSelectedRows = [...selectedRows];
        for (let i = min; i <= max; i++) {
          if (selectedRows.includes(i)) {
            continue;
          }
          newSelectedRows.push(i);
        }
        setSelectedRows(newSelectedRows);
      }
      lastSelectedRowIndex.current = rowIndex;
    },
    [selectedRows]
  );

  const handleRowClick = useCallback(
    (rowIndex: number, event: React.MouseEvent) => {
      if (isMoving) {
        return;
      }
      if (event.ctrlKey) {
        handleCtrlClick(rowIndex);
      } else if (event.shiftKey) {
        handleShiftClick(rowIndex);
      } else {
        setSelectedRows([rowIndex]);
        lastSelectedRowIndex.current = rowIndex;
      }
    },
    [handleCtrlClick, handleShiftClick, isMoving]
  );

  return (
    <table
      {...getTableProps()}
      draggable={false}
      onMouseMove={handleMouseMove}
      className={`w-full bg-white text-black border border-black cursor-default`}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} draggable={false}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={rowIndex}
              onMouseDown={(e) => {
                console.log("ONMOUSEDOWN");
                if (e.shiftKey || e.ctrlKey) {
                  return;
                }
                handleMouseDown(rowIndex);
              }}
              onMouseEnter={(e) => {
                console.log("ONMOUSEENTER");
                if (e.shiftKey || e.ctrlKey) {
                  return;
                }
                handleMouseEnter(rowIndex);
              }}
              onDragEnter={(e) => {
                if (!dragging.current) {
                  console.log("ONDRAGENTER", { rowIndex });
                }
              }}
              onDragEnd={(e) => {
                setIsMoving(false);
                console.log({ rowIndex });
                console.log("ONDRAGEND", { e });
              }}
              draggable={isMoving}
              className={`${
                isMoving && selectedRows.includes(rowIndex)
                  ? "bg-blue-300"
                  : selectedRows.includes(rowIndex)
                  ? "bg-gray-300"
                  : ""
              }`}
              onClick={(event) => {
                console.log({ event });
                handleRowClick(rowIndex, event);
              }}
            >
              {row.cells.map((cell) => (
                <td
                  className={"border border-black"}
                  {...cell.getCellProps()}
                  key={cell.column.id}
                  onMouseUp={handleMouseUp}
                  draggable={isMoving}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Page: FC = () => {
  const data = useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );

  const columns = useMemo<Column[]>(
    () => [
      {
        Header: "Column 1",
        accessor: "col1",
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  return <Table columns={columns} data={data} />;
};

export default Page;
