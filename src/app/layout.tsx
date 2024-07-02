"use client"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { baselightTheme } from "@/utils/theme/DefaultColors"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Provider } from "react-redux"
import { store } from "@/store"
import "./global.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Create a client
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={baselightTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
