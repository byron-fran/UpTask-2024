import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import './index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const Client = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <QueryClientProvider client={Client}>
      <Router/>
    </QueryClientProvider>
  </React.StrictMode>,
)
