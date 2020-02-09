import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        backgroundColor: '#212121',
        color: '#FFFFFF',
      }
    },
    MuiButton: {
      containedPrimary: {
        color: '#000000',
        backgroundColor: '#03DAC5',
      },
    },
    MuiIconButton: {
      root: {
        color: '#FFFFFF',
      }
    },
    MuiTableCell: {
      head: {
        color: '#FFFFFF',
      },
      body: {
        color: '#FFFFFF',
      },
    },
  },
});