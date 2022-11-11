import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridCellEditStopReasons,
  GridFooter,
  useGridApiEventHandler,
  GridToolbarContainer,
  GridToolbarExport,
  useGridApiContext,
} from "@mui/x-data-grid";
import { GridCellEditStopParams } from "@mui/x-data-grid";
import { currencyPairs, randomPrice } from "@mui/x-data-grid-generator";
import { useEffect } from "react";
import { useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../configs/Firebase.config";
import { toast } from "react-toastify";
import { async, isEmpty } from "@firebase/util";
import { useMovieData } from "@mui/x-data-grid-generator";
import { doc, updateDoc } from "firebase/firestore";
import { Alert, Card } from "@mui/material";
import { display } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { type } from "@testing-library/user-event/dist/type";
import Loading from "../../../../Loading";

import { GridToolbar } from "@mui/x-data-grid";

import { List, ListItemText } from "@mui/material";
import { CustomFooterTotalComponent } from "./customFooter";
import { useContext } from "react";
import { UserContext } from "../../contexts/AdminContext";

import clsx from "clsx";

const StyledBox = styled(Box)(({ theme }) => ({
  height: "90vh",
  width: "100%",
  overflowX: "scroll",
  "& .MuiDataGrid-cell--editing": {
    backgroundColor: "rgb(255,215,115, 0.19)",
    color: "#006aff",
    "& .MuiInputBase-root": {
      height: "100%",
    },
  },
  "& .Mui-error": {
    backgroundColor: `rgb(126,10,15, ${
      theme.palette.mode === "dark" ? 0 : 0.1
    })`,
    color: theme.palette.error.main,
  },
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ConditionalValidationGrid() {
  const [total, setTotal] = React.useState(0);
  const [paidUsers, setPaidusers] = useState([]);
  const [load, setload] = useState(false);
  const { RegUsers, DataLoad } = useContext(UserContext);

  useEffect(() => {
    setload(true);
    setPaidusers(RegUsers);
    setload(false);
  }, [RegUsers]);

  const users = paidUsers.map((data) => {
    return {
      id: data.id,
      id: data.id,
      name: data.fname,
      email: data.email,
      phno: data.phno,
      college: data.college,
      regno: data.regno,
      gender: data.gender,
      isPaidD: data.cashPaid,
      isPaperPresentationPaid: data.cashPaidForPaper,
      isProjectPresentationPaid: data.cashPaidForProject,
      PaperPresentation: data.PaperPresentation ? "✅" : "❌",
      ProjectPresentation: data.ProjectPresentation ? "✅" : "❌",
      AmountPaid: data.AmountPaid + " ₹ ",
      DepartEvent: data.DepartEvent ? "✅" : "❌",

      IT: isEmpty(data.EventsRegistered.IT)
        ? ""
        : data.EventsRegistered.IT.join(","),
      ECE: isEmpty(data.EventsRegistered.ECE)
        ? ""
        : data.EventsRegistered.ECE.join(","),
      EEE: isEmpty(data.EventsRegistered.EEE)
        ? ""
        : data.EventsRegistered.EEE.join(","),
      CSE: isEmpty(data.EventsRegistered.CSE)
        ? ""
        : data.EventsRegistered.CSE.join(","),
      EIE: isEmpty(data.EventsRegistered.EIE)
        ? ""
        : data.EventsRegistered.EIE.join(","),
      MECH: isEmpty(data.EventsRegistered.MECH)
        ? ""
        : data.EventsRegistered.MECH.join(","),
      AI: isEmpty(data.EventsRegistered.AI)
        ? ""
        : data.EventsRegistered.AI.join(","),
      CHEM: isEmpty(data.EventsRegistered.CHEM)
        ? ""
        : data.EventsRegistered.CHEM.join(","),
      MBA: isEmpty(data.EventsRegistered.MBA)
        ? ""
        : data.EventsRegistered.MBA.join(","),
      MED: isEmpty(data.EventsRegistered.MED)
        ? ""
        : data.EventsRegistered.MED.join(","),
      AGRI: isEmpty(data.EventsRegistered.AGRI)
        ? ""
        : data.EventsRegistered.AGRI.join(","),
      CIVIL: isEmpty(data.EventsRegistered.CIVIL)
        ? ""
        : data.EventsRegistered.CIVIL.join(","),
      BME: isEmpty(data.EventsRegistered.BME)
        ? ""
        : data.EventsRegistered.BME.join(","),
      cashtobePaid: data.CashToBePaid,
    };
  });
  //total =====
  let totalA = 0;
  let collectedcash = 0;
  const totalAmount = paidUsers.map((data) => {
    totalA += data.CashToBePaid;

    //  for(const key in  data.EventsRegistered){
    //     console.log(data.EventsRegistered['CSE'][0])
    //  }

    collectedcash += data.AmountPaid;

    // if(data.cashPaidForPaper){
    //   collectedcash +=data.AmountPaid;
    // }
  });
  // console.log(users)
  const rows = [...users];

  const columns = [
    // { editable: false, field: "id", headerName: "id", width: 100 },
    { editable: false, field: "name", headerName: "name", width: 150 },

    {
      editable: false,
      field: "email",

      headerName: "email",
      width: 150,
    },

    { editable: false, field: "phno", headerName: "phone no", width: 150 },

    {
      editable: false,
      field: "college",
      headerName: "college Name",
      minWidth: 150,
    },
    { editable: false, field: "regno", headerName: "register No", width: 150 },

    { editable: false, field: "gender", headerName: "gender", width: 100 },

    {
      field: "ProjectPresentation",
      headerName: "Project presentation",
      width: 150,
      editable: false,
    },

    {
      field: "isProjectPresentationPaid",
      headerName: "Project Paid ?",
      width: 150,
      editable: false,
      type: "boolean",
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          paid: params.value === true,
          notpaid: params.value === false,
        });
      },
    },

    {
      field: "PaperPresentation",
      headerName: "Paper presentation",
      width: 150,
      editable: false,
    },

    {
      field: "isPaperPresentationPaid",
      headerName: "Paper Paid ?",
      width: 150,
      type: "boolean",
      editable: false,
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          paid: params.value === true,
          notpaid: params.value === false,
        });
      },
    },
    {
      field: "DepartEvent",
      headerName: "DepartEvent",
      width: 150,
      editable: false,
    },
    {
      field: "isPaidD",
      headerName: "Department Paid?",
      width: 150,
      editable: false,
      type: "boolean",
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          paid: params.value === true,
          notpaid: params.value === false,
        });
      },

      // const hasError = isPaidProps.value && !params.props.value;

      // setChecked(pre=>!pre)
    },

    {
      editable: false,
      field: "AmountPaid",
      headerName: "Amount Paid",
      width: 100,
    },
    {
      editable: false,
      field: "cashtobePaid",
      headerName: "Total amount",
      width: 100,
    },

    { field: "IT", headerName: "IT", width: "150", editable: false },
    { field: "CSE", headerName: "CSE", width: "150", editable: false },
    { field: "ECE", headerName: "ECE", Width: "150", editable: false },
    { field: "EEE", headerName: "EEE", minWidth: "150", editable: false },
    { field: "EIE", headerName: "EIE", minWidth: "150", editable: false },
    { field: "MECH", headerName: "MECH", minWidth: "150", editable: false },
    { field: "AI", headerName: "AI", minWidth: "150", editable: false },
    { field: "CHEM", headerName: "CHEM", minWidth: "150", editable: false },
    { field: "MBA", headerName: "MBA", minWidth: "150", editable: false },
    { field: "MED", headerName: "MED", minWidth: "150", editable: false },
    { field: "AGRI", headerName: "AGRI", minWidth: "150", editable: false },
    { field: "CIVIL", headerName: "CIVIL", minWidth: "150", editable: false },
    { field: "BME", headerName: "BME", minWidth: "150", editable: false },
  ];
  const [filterModel, setFilterModel] = React.useState({
    items: [
      {
        columnField: "cashtobePaid",
        operatorValue: ">",
        value: "200",
      },
    ],
  });

  return (
    <Box
      sx={{
        height: "90%",
        width: "100%",
        "& .super-app-theme--cell": {
          backgroundColor: "red",
          color: "#1a3e72",
          fontWeight: "600",
        },
        "& .super-app.paid": {
          backgroundColor: "rgba(157, 255, 118, 0.49)",
          color: "#1a3e72",
          fontWeight: "600",
        },
        "& .super-app.notpaid": {
          backgroundColor: "#ff8194",
          color: "#1a3e72",
          fontWeight: "600",
        },
      }}
    >
      {/* {load && <Loading/>} */}
      <DataGrid
        //  rowHeight={100}
        // components={{
        //   Toolbar: CustomToolbar,
        //   Footer,
        // }}
        getRowHeight={() => "auto"}
        rows={rows}
        columns={columns}
        editMode="row"
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        // onCellEditStart={(params, event) => {
        //   console.log(params);
        // }}
        onCellEditStop={(params, event) => {
          console.log(params);
          if (params.reason === GridCellEditStopReasons.cellFocusOut) {
            event.defaultMuiPrevented = true;
          }
        }}
        //   onRowEditStop={(e)=>{
        //     console.log(e)
        //   }}
        loading={load}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
        components={{
          Toolbar: GridToolbar,
          Footer: CustomFooterTotalComponent,
        }}
        componentsProps={{
          footer: { total },
        }}
        onStateChange={(state) => {
          const visibleRows = state.filter.visibleRowsLookup;
          let visibleItems = [];
          for (const [id, value] of Object.entries(visibleRows)) {
            if (value === true) {
              visibleItems.push(id);
            }
          }
          // console.log(visibleItems);

          const res = rows.filter((item) => visibleItems.includes(item.id));
          // console.log("res", res);
          const total = res
            .map((item) => item.cashtobePaid)
            .reduce((a, b) => a + b, 0);

          setTotal(total);
        }}
      />
      <h3
        style={{
          marginTop: "-50px",
          color: "black",
          marginLeft: "400px",
        }}
      >
        TOTAL AMOUT : {totalA}💸
      </h3>
      <h3
        style={{
          marginTop: "-40px",
          color: "black",
          marginLeft: "700px",
        }}
      >
        RECEIVED AMOUT : {collectedcash}💸
      </h3>
    </Box>
  );
}
