import { ChangeEvent, useCallback, useState } from 'react'
import './App.css'
import { Button, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
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

  const renderEmotionAnalysis = (<div>
    <Grid container padding={2} spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant='h3' sx={{
          fontWeight: "bold",
          textTransform: "capitalize"
        }}>{selection} Analysis</Typography>

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
          color='grey'
        >
          Emotion: <em>{response.output}</em>
        </Typography>}
      </Grid>

    </Grid>


  </div>)
  return (
    <>
      <Stack spacing={3} direction={'row'}>
        {selection?.length ? <Button onClick={() => {
          setSelection('')
        }}>Back</Button> : ['sentiment', 'emotion']?.map((row, i) => <Button key={i}
          sx={{ textTransform: "capitalize" }}
          onClick={() => {
            setSelection(row)
            onReset()
          }}
          variant='contained'
        >{row}</Button>)}
      </Stack>

      {!!selection?.length && (renderEmotionAnalysis)}


    </>)
}

export default App

const INIT_RESPONSE = { text: '', output: '' }
const headers = {
  ['Accept']: 'application/form-data',
  'Content-Type': 'application/json',
}