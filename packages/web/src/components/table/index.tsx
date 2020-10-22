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
  rowsPerPageInit?: number;
  page: number;
  style?: CSSProperties;
  onChangePage: (page: number) => void;
  slotRows: React.ReactNode;
  totalCount: number;
};

const Table: React.FC<StickyHeadTableProps> = ({
  columns,
  onChangePage,
  page,
  style,
  slotRows,
  totalCount,
}) => {
  const handleOnChangePage = useCallback(
    (_, currentPage: number) => {
      onChangePage(currentPage);
    },
    [onChangePage]
  );

  return (
    <PaperStyled style={style} variant="outlined" color="primary" elevation={3}>
      <TableContainer>
        <TableBase>
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
          <TableBody>{slotRows}</TableBody>
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
