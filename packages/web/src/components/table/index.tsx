import React, { useCallback } from "react";
import {
  Table as TableBase,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { PaperStyled } from "./styles";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

type align = "left" | "right" | "inherit" | "center" | "justify" | undefined;

type columnType = {
  id: string;
  label: string;
  minWidth: number;
  align?: align;
  component?: JSX.Element;
};

type StickyHeadTableProps = {
  columns: columnType[];
  rows: Record<string, unknown>[];
  rowsPerPageInit?: number;
  page: number;
  totalCount: number;
  style?: CSSProperties;
  onChangePage: (page: number) => void;
};

const Table: React.FC<StickyHeadTableProps> = ({
  columns,
  rows,
  totalCount,
  onChangePage,
  page,
  style,
}) => {
  const handleOnChangePage = useCallback(
    (_, currentPage: number) => {
      onChangePage(currentPage);
    },
    [onChangePage]
  );

  return (
    <PaperStyled style={style}>
      <TableContainer>
        <TableBase stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <TableRow
                  hover
                  style={{ cursor: "pointer" }}
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                >
                  {columns.map((column) => {
                    const value = row[column.id] as string;
                    return (
                      <TableCell align={column.align} key={column.id}>
                        {column.component || value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </TableBase>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={totalCount}
        rowsPerPage={10}
        page={page - 1}
        onChangePage={handleOnChangePage}
        onChangeRowsPerPage={() => {}}
      />
    </PaperStyled>
  );
};

export default React.memo(Table);
