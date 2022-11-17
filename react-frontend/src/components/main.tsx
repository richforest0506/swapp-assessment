import {useState} from 'react';
import styled from 'styled-components';
import DataTable from './datatable';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { selectSelected } from '../features/counter/selectSlice';
import ApiService from '../services/ApiService';
import { BASE_URL, DOWNLOAD_API } from '../services/ApiService';

const DownloadDiv = styled.div`
  display: flex;
  margin-top: 15px;
`;
const UrlDiv = styled.div`
  width: calc(100% - 160px);
`;

const MainPanel = () => {
  const [invoiceUrl, setInvoiceUrl] = useState("");
  const selected = useAppSelector(selectSelected);

  const handleGenerateInvoice = () => {
    const idsParam: String = [...selected].sort((n1, n2) => n1 - n2).join(",")
    ApiService.generateInvoice(idsParam).then((response) => {
      setInvoiceUrl(BASE_URL + DOWNLOAD_API + "/" + response.data);
    });
  }

  const handleDownload = () => {
    const element = document.createElement("a");
    element.href = invoiceUrl;
    element.click();
  }

  return (
    <main>
      <Box sx={{ m: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <DataTable />
          </Grid>
          <Grid item xs={12} display="flex"
            justifyContent='flex-end'
            alignItems="flex-end">
            <Button
              variant='contained'
              onClick={handleGenerateInvoice}
              disabled={selected.length === 0}
            >
              Generate Invoice
            </Button>
          </Grid>
        </Grid>
        <DownloadDiv>
          <UrlDiv>
            <TextField
              id="invoice_url"
              variant="outlined"
              size="small"
              value={invoiceUrl.length === 0 ?
                "No URL" : invoiceUrl}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </UrlDiv>
          <Button
            variant='contained'
            onClick={handleDownload}
            style={{ width: 160 }}
            disabled={invoiceUrl.length === 0}
          >
            Download
          </Button>
        </DownloadDiv>
      </Box>
    </main>
  );
}

export default MainPanel;
