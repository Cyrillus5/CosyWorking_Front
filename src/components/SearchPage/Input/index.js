import './style.scss';
import { useDispatch } from 'react-redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../tools/themeMui';

const cities = [
  { label: 'Paris' },
  { label: 'Nantes' },
  { label: 'Angers' },
  { label: 'Rennes' },
  { label: 'Marseille' },
  { label: 'Cannes' },
  { label: 'Tours' },
];

function Input() {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const city = event.target.value;
    dispatch({
      type: 'SEARCH_CITY',
      city: city,
    });
  };

  const handleCityChange = (object, value) => {
    dispatch({
      type: 'SEARCH_CITY',
      city: value.label,
    });
  };

  return (
    <div className="search-input">
      <ThemeProvider theme={theme}>
        <Autocomplete
          size="small"
          disablePortal
          id="combo-box-demo"
          forcePopupIcon={false}
          options={cities}
          onChange={handleCityChange}
          sx={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Recherchez par ville"
              onChange={handleChange}
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
      </ThemeProvider>
    </div>

  );
}

export default Input;
