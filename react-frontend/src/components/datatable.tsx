import {useEffect, useState, ChangeEvent} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, Checkbox } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { select, selectSelected } from '../features/counter/selectSlice';
import ApiService from '../services/ApiService';

interface Data {
  id: number;
  name: string;
  amount: number;
  selected?: boolean;
}

interface HeadCell {
  id: keyof Data;
  numeric: boolean;
  label: string;
  disablePadding: boolean;
  hidden: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Id',
    hidden: true
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    hidden: true
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    hidden: true
  },
  {
    id: 'selected',
    numeric: false,
    disablePadding: false,
    label: 'Selected',
    hidden: true
  }
];

const DataTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            style={headCell.id === 'id' ? { display: 'none' } : { display: 'table-cell' }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userData, setUserData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      ApiService.getUsers().then((response) => {
        let users: Data[] = [];
        response.data.map((user: Data) => {
          users.push({ ...user, selected: false })
        });
        setUserData(users);
      });
    };
    fetchUsers();
  }, [])

  const dispatch = useAppDispatch()

  const selected = useAppSelector(selectSelected);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

  return (
    <Paper sx={{ width: '100%', border: 1 }}>
      <TableContainer>
        <Table sx={{ minWidth: 300 }} aria-labelledby='tableTitle'>
          <DataTableHead />
          <TableBody>
            {userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    key={index}
                    onClick={(event) => {
                      dispatch(select(row.id));
                    }}
                    selected={isItemSelected}
                    hover
                  >
                    <TableCell style={{ display: 'none' }}>
                      {row.id}
                    </TableCell>
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.amount}</TableCell>
                    <TableCell padding='checkbox'>
                      <Checkbox color='primary' checked={isItemSelected} />
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper >
  );
}


export default DataTable;