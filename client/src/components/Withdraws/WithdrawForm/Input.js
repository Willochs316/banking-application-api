import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import useStyles from "./styles";

const Input = ({ withdrawData, setWithdrawData }) => {
  const [showPassword, setShowPassword] = useState(false);

  const classes = useStyles();

  const currencies = ["NGN"];

  const fields = [
    {
      name: "sourceAccountNumber",
      label: "source account number",
      type: "number",
      className: classes.noArrows,
    },
    {
      name: "amount",
      label: "amount",
      type: "number",
      className: classes.noArrows,
    },
    {
      name: "currency",
      label: "Currency",
      type: "select",
    },
    {
      name: "purposeOfTransaction",
      label: "purpose of transaction",
    },
    {
      name: "password",
      label: "password",
      type: showPassword ? "text" : "password",
    },
  ];

  const handleCurrencyChange = (e) => {
    setWithdrawData({
      ...withdrawData,
      currency: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {fields.map((field) =>
        field.type === "select" ? (
          <FormControl
            variant="outlined"
            className={classes.formControl}
            key={field.name}
          >
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={field.name}
              label={field.label}
              value={withdrawData[field.name]}
              onChange={handleCurrencyChange}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField
            key={field.name}
            name={field.name}
            variant="outlined"
            label={field.label}
            fullWidth
            type={field.type}
            className={field.className}
            value={withdrawData[field.name]}
            onChange={(e) =>
              setWithdrawData({
                ...withdrawData,
                [field.name]: e.target.value,
              })
            }
            InputProps={
              field.name === "password"
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : null
            }
          />
        )
      )}
    </>
  );
};

export default Input;

// import React from "react";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@material-ui/core";
// import useStyles from "./styles";

// const CustomTextField = ({ withdrawData, setWithdrawData }) => {
//   const classes = useStyles();

//   const currencies = ["NGN", "USD", "EUR"];

//   const handleCurrencyChange = (e) => {
//     setWithdrawData({
//       ...withdrawData,
//       currency: e.target.value,
//     });
//   };

//   return (
//     <>
//       <TextField
//         name="sourceAccountNumber"
//         variant="outlined"
//         label="source account number"
//         fullWidth
//         value={withdrawData.sourceAccountNumber}
//         onChange={(e) =>
//           setWithdrawData({
//             ...withdrawData,
//             sourceAccountNumber: e.target.value,
//           })
//         }
//       />

//       <TextField
//         name="amount"
//         variant="outlined"
//         label="amount"
//         fullWidth
//         value={withdrawData.amount === 0 ? "" : withdrawData.amount.toString()}
//         onChange={(e) => {
//           const input = e.target.value;
//           // Use a regular expression to check if the input is a valid number
//           if (/^[+-]?\d+(\.\d+)?$/.test(input)) {
//             setWithdrawData({
//               ...withdrawData,
//               amount: parseFloat(input),
//             });
//           } else {
//             setWithdrawData({
//               ...withdrawData,
//               amount: 0,
//             });
//           }
//         }}
//       />

//       <FormControl variant="outlined" className={classes.formControl}>
//         <InputLabel>Currency</InputLabel>
//         <Select
//           name="currency"
//           label="Currency"
//           value={withdrawData.currency}
//           onChange={handleCurrencyChange}
//         >
//           {currencies.map((currency) => (
//             <MenuItem key={currency} value={currency}>
//               {currency}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       <TextField
//         name="purposeOfTransaction"
//         variant="outlined"
//         label="purpose of transaction"
//         fullWidth
//         value={withdrawData.purposeOfTransaction}
//         onChange={(e) =>
//           setWithdrawData({
//             ...withdrawData,
//             purposeOfTransaction: e.target.value,
//           })
//         }
//       />

//       <TextField
//         name="password"
//         type="password"
//         variant="outlined"
//         label="password"
//         fullWidth
//         value={withdrawData.password}
//         onChange={(e) =>
//           setWithdrawData({
//             ...withdrawData,
//             password: e.target.value,
//           })
//         }
//       />
//     </>
//   );
// };

// export default CustomTextField;
