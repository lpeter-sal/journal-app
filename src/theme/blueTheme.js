import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const blueTheme = createTheme({
    palette: {
        primary: {
            main: '#007cff'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    }
})