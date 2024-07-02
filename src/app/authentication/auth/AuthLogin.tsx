import React from "react"
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material"
import Link from "next/link"
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField"
import { useQuery } from "@tanstack/react-query"

interface loginType {
  title?: string
  subtitle?: JSX.Element | JSX.Element[]
  subtext?: JSX.Element | JSX.Element[]
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  function fetchPosts() {
    return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      res.json()
    )
  }
  const { data } = useQuery({ queryKey: ["todos"], queryFn: fetchPosts })
  console.log("🚀 ~ AuthLogin ~ data:", data)

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField variant="outlined" fullWidth />
        </Box>
        <Box className="mt-5">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField type="password" variant="outlined" fullWidth />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          href="/"
          type="submit"
        >
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  )
}

export default AuthLogin
