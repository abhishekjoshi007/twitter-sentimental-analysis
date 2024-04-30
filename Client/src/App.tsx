import { CSSProperties, ChangeEvent, useCallback, useState } from 'react'
import './App.css'
import { Button, Grid, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { Iconify } from './components/iconify';

function App() {

  const [response, setResponse] = useState(INIT_RESPONSE);
  const [selection, setSelection] = useState('')
  const onClickSubmit = useCallback(async () => {
    if (selection?.length) {
      const formData = new FormData()
      formData.append('text', response.text)
      const data = await fetch(`http://localhost:8000/api/${selection}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ text: response.text })
      }).then((response) => response.json())
      if (data.status === 200) {
        setResponse((prev) => ({ ...prev, output: data.data[selection] }))
      }
    }
  }, [response.text, selection])
  const onReset = useCallback(() => {
    setResponse(INIT_RESPONSE)
  }, [])
  const onHandleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setResponse((prev) => ({ ...prev, text: e.target.value }))
  }, [])

  const renderEmotionAnalysis = (<div style={SX.Container}>
    <Paper elevation={10} sx={{ borderRadius: 10 }}>
      <Grid container padding={2} spacing={2}>
        <Grid item xs={2} sm={2} md={2} lg={2}

          sx={{
            display: "flex",
            // textAlign: "center",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "middle",
          }}
        >

          <Button
            variant='contained'
            disableElevation
            sx={{ textTransform: "none", borderRadius: 10 }}
            startIcon={<Iconify icon='ic:round-arrow-back-ios' />}
            onClick={() => {
              setSelection('')
            }}>Back</Button>

        </Grid>

        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Typography variant='h3' sx={SX.Header}>{selection} Analysis</Typography>

        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>

          <TextField
            label="Please add an input"
            onChange={onHandleInput}
            size='small'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClickSubmit()
              }
            }}
            fullWidth
            value={response.text} />
        </Grid>
        <Grid item xs={11} sm={11} md={11} lg={11}>
          <Button onClick={onClickSubmit} variant='contained'
            disableElevation
            size='large'
            sx={{ borderRadius: 10, textTransform: "none" }}
            fullWidth
          >Submit</Button>
        </Grid>

        <Grid item xs={1} sm={1} md={1} lg={1}>
          <IconButton onClick={onReset}>
            <Iconify icon='carbon:reset' />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {!!response?.output?.length && <Typography variant='h4'
            textTransform='capitalize'
          >
            Emotion: <em>{response.output}</em>
          </Typography>}
        </Grid>

      </Grid>


    </Paper>
  </div >)

  if (selection?.length) {
    return renderEmotionAnalysis;
  }

  return (<div style={SX.Container}>
    <Stack spacing={3}>
      {TAB_OPTIONS?.map((row, i) => <Button key={i}
        disableElevation
        sx={{ textTransform: "capitalize", fontSize: "2rem", borderRadius: 10 }}
        onClick={() => {
          setSelection(row)
          onReset()
        }}
        variant='contained'
      >{row}</Button>)
      }
    </Stack>
  </div>)

}

export default App

const INIT_RESPONSE = { text: '', output: '' }
const headers = {
  ['Accept']: 'application/form-data',
  'Content-Type': 'application/json',
}
const SX: { [key: string]: CSSProperties } = {
  Container: {
    height: "100vh",
    display: "flex",
    // textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "middle",
  },
  Header: {
    fontWeight: "bold",
    textTransform: "capitalize"
  }
}
const TAB_OPTIONS = ['sentiment', 'emotion']