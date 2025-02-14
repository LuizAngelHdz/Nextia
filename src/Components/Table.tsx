import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Tooltip,
  TablePagination,
  Paper,
  Typography,
  useTheme,
} from "@mui/material"
import { styled } from "@mui/material/styles"

interface TableComponentProps {
  headers: { label: string; key: string }[]
  rows: any[]
  actions: {
    label: string
    icon: JSX.Element
    tooltip: string
    onClick: (row: any) => void
  }[]
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 700,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}))

const TableComponent: React.FC<TableComponentProps> = ({ headers, rows, actions }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const theme = useTheme()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const rowsToShow = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <StyledTableCell key={header.key}>
                  <TableSortLabel>
                    <Typography variant="subtitle2">{header.label}</Typography>
                  </TableSortLabel>
                </StyledTableCell>
              ))}
              <StyledTableCell>
                <Typography variant="subtitle2">Acciones</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToShow.map((row, index) => (
              <StyledTableRow hover key={index}>
                {headers.map((header) => (
                  <StyledTableCell key={header.key}>{row[header.key]}</StyledTableCell>
                ))}
                <StyledTableCell>
                  <div style={{ display: "flex", gap: theme.spacing(1) }}>
                    {actions.map((action, actionIndex) => (
                      <Tooltip key={actionIndex} title={action.tooltip} arrow>
                        <IconButton
                          size="small"
                          onClick={() => action.onClick(row)}
                          sx={{
                            color: theme.palette.primary.main,
                            "&:hover": {
                              backgroundColor: theme.palette.primary.light,
                              color: theme.palette.primary.contrastText,
                            },
                          }}
                        >
                          {action.icon}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > rowsPerPage && (
        <TablePagination
          component="div"
          count={rows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </Paper>
  )
}

export default TableComponent

