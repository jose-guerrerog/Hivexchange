import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        backgroundColor: '#212121',
      }
    },
    MuiButton: {
      containedPrimary: {
        color: '#000000',
        backgroundColor: '#03DAC5',
      },
    },
  },
});