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

const Input = ({ depositData, setDepositData }) => {
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
      name: "senderName",
      label: "sender name",
    },
    {
      name: "recipientAccountNumber",
      label: "recipient account number",
      type: "number",
      className: classes.noArrows,
    },
    {
      name: "recipientName",
      label: "recipient name",
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
    setDepositData({
      ...depositData,
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
              value={depositData[field.name]}
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
            value={depositData[field.name]}
            onChange={(e) =>
              setDepositData({
                ...depositData,
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
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import useStyles from "./styles";

// const AdditionalField = ({ depositData, setDepositData }) => {
//   const classes = useStyles();

//   const currencies = ["NGN"];

//   const handleCurrencyChange = (e) => {
//     setDepositData({
//       ...depositData,
//       currency: e.target.value,
//     });
//   };

//   const fields = [
//     {
//       name: "sourceAccountNumber",
//       label: "source account number",
//     },
//     {
//       name: "senderName",
//       label: "sender name",
//     },
//     {
//       name: "recipientAccountNumber",
//       label: "recipient account number",
//     },
//     {
//       name: "recipientName",
//       label: "recipient name",
//     },
//     {
//       name: "amount",
//       label: "amount",
//       type: "number",
//       className: classes.noArrows,
//     },
//     {
//       name: "currency",
//       label: "Currency",
//       type: "select",
//     },
//     {
//       name: "purposeOfTransaction",
//       label: "purpose of transaction",
//     },
//     {
//       name: "password",
//       label: "password",
//       type: "password",
//     },
//   ];

//   return (
//     <>
//       {fields.map((field) =>
//         field.type === "select" ? (
//           <FormControl
//             variant="outlined"
//             className={classes.formControl}
//             key={field.name}
//           >
//             <InputLabel>{field.label}</InputLabel>
//             <Select
//               name={field.name}
//               label={field.label}
//               value={depositData[field.name]}
//               onChange={handleCurrencyChange}
//             >
//               {currencies.map((currency) => (
//                 <MenuItem key={currency} value={currency}>
//                   {currency}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         ) : (
//           <TextField
//             key={field.name}
//             name={field.name}
//             variant="outlined"
//             label={field.label}
//             fullWidth
//             type={field.type}
//             className={field.className}
//             value={depositData[field.name]}
//             onChange={(e) =>
//               setDepositData({
//                 ...depositData,
//                 [field.name]: e.target.value,
//               })
//             }
//           />
//         )
//       )}
//     </>
//   );
// };

// export default AdditionalField;

// import React from "react";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@material-ui/core";
// import useStyles from "./styles";

// const AdditionalField = ({ depositData, setDepositData }) => {
//   const classes = useStyles();

//   const inputFields = [
//     {
//       name: "sourceAccountNumber",
//       label: "source account number",
//       value: depositData.sourceAccountNumber,
//     },
//     {
//       name: "senderName",
//       label: "sender name",
//       value: depositData.senderName,
//     },
//     {
//       name: "recipientAccountNumber",
//       label: "recipient account number",
//       value: depositData.recipientAccountNumber,
//     },
//     {
//       name: "recipientName",
//       label: "recipient name",
//       value: depositData.recipientName,
//     },
//     {
//       name: "amount",
//       label: "amount",
//       value: depositData.amount,
//       type: "number",
//       className: classes.noArrows,
//     },
//     {
//       name: "purposeOfTransaction",
//       label: "purpose of transaction",
//       value: depositData.purposeOfTransaction,
//     },
//     {
//       name: "password",
//       label: "password",
//       value: depositData.password,
//       type: "password",
//     },
//   ];

//   const currencies = ["NGN"];

//   const handleCurrencyChange = (e) => {
//     setDepositData({
//       ...depositData,
//       currency: e.target.value,
//     });
//   };

//   return (
//     <>
//       {inputFields.map((field) => (
//         <TextField
//           name={field.name}
//           variant="outlined"
//           label={field.label}
//           fullWidth
//           value={field.value}
//           onChange={(e) =>
//             setDepositData({
//               ...depositData,
//               [field.name]: e.target.value,
//             })
//           }
//         />
//       ))}

//       <FormControl variant="outlined" className={classes.formControl}>
//         <InputLabel>Currency</InputLabel>
//         <Select
//           name="currency"
//           label="Currency"
//           value={depositData.currency}
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
//         value={depositData.purposeOfTransaction}
//         onChange={(e) =>
//           setDepositData({
//             ...depositData,
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
//         value={depositData.password}
//         onChange={(e) =>
//           setDepositData({
//             ...depositData,
//             password: e.target.value,
//           })
//         }
//       />
//     </>
//   );
// };

// export default AdditionalField;
