import { colors, createTheme, css } from '@mui/material'

const anotherComponents = {
  MuiLoadingButton: {
    defaultProps: {
      variant: 'outlined'
    }
  }
}

export const themeMaterialUI = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.orange[900],
      contrastText: colors.grey[100]
    },
    secondary: {
      main: colors.orange[300],
      contrastText: colors.grey[50]
    }
  },
  components: {
    MuiIcon: {
      defaultProps: {
        color: 'primary'
      }
    },
    MuiFormControl: {
      defaultProps: {
        variant: 'standard'
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: colors.orange[300]
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        margin: 'dense'
      },
      styleOverrides: {}
    },
    MuiButton: {
      defaultProps: {
        variant: 'outlined'
      },
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
      // styleOverrides: {
      //   root: css``.styles
      // }
    },
    MuiTypography: {
      styleOverrides: {
        root: css`
          color: #111;
        `.styles
      }
    },
    ...anotherComponents
  }
})
