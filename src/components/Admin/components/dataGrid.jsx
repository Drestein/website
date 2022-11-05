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
import { db } from "../../../configs/Firebase.config";
import { toast } from "react-toastify";
import { async, isEmpty } from "@firebase/util";
import { useMovieData } from "@mui/x-data-grid-generator";
import { doc, updateDoc } from "firebase/firestore";
import { Alert, Card } from "@mui/material";
import { display } from "@mui/system";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { type } from "@testing-library/user-event/dist/type";
import Loading from "../../../Loading";

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

const Footer = () => {
  const [message, setMessage] = React.useState("");
  const apiRef = useGridApiContext();

  const handleRowClick = (params) => {
    setMessage(params.row.id);
  };

  useGridApiEventHandler(apiRef, "rowClick", handleRowClick);
  const handlePasteclick = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Id copied..");
  };
  return (
    <React.Fragment>
      <GridFooter />
      {message && (
        <Card
          sx={{
            padding: "10px",
            maxWidth: "350px",
          }}
        >
          {message}
          <ContentCopyIcon
            onClick={() => handlePasteclick(message)}
            sx={{
              marginLeft: "10px",
              cursor: "pointer",
            }}
          />
        </Card>
      )}
    </React.Fragment>
  );
};
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ConditionalValidationGrid() {
  const [paidUsers, setPaidusers] = useState([]);
  const [load, setload] = useState(false);
  //   const { data } = useDemoData({
  //     dataSet: 'Commodity',
  //     rowLength: 5,
  //     maxColumns: 6,
  //   });
  // const data = useMovieData();
  useEffect(() => {
    setload(true);
    const colref = collection(db, "RegisteredPeople");
    onSnapshot(
      colref,
      (snapshot) => {
        let users = [];
        snapshot.docs.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        //   console.log(users);
        setPaidusers(users);
        setload(false);
        // console.log('this is head ',paidUsers)
      },

      []
    );
    // const q = query(colref, where("cashPaid", "==", true));

    // onSnapshot(q, (snapshot) => {
    //   let paid = [];
    //   console.log(snapshot.docs);
    //   snapshot.docs.forEach((doc) => {
    //     paid.push({ ...doc.data(), id: doc.id });
    //   });
    //   // console.log(books)
    //   console.log(paid);
    //   setPaidusers(paid);
    //   setload(false);
    // });
  
  }, []);

  const users = paidUsers.map((data) => {
console.log(data)
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
      isPaperPresentationPaid:data.cashPaidForPaper,
      isProjectPresentationPaid:data.cashPaidForProject
      ,
      PaperPresentation:data.PaperPresentation ? "Yes" :"No" 
      ,
      ProjectPresentation:data.ProjectPresentation ?"Yes":'no'
      ,
  AmountPaid :data.AmountPaid+" ₹ ",

      IT: isEmpty(data.EventsRegistered.IT) ? " " : data.EventsRegistered.IT.join(','),
      ECE: isEmpty(data.EventsRegistered.ECE) ? " " : data.EventsRegistered.ECE.join(','),
      EEE: isEmpty(data.EventsRegistered.EEE) ? " " : data.EventsRegistered.EEE.join(','),
      CSE: isEmpty(data.EventsRegistered.CSE) ? " " : data.EventsRegistered.CSE.join(','),
      EIE: isEmpty(data.EventsRegistered.EIE) ? " " : data.EventsRegistered.EIE.join(','),
      MECH: isEmpty(data.EventsRegistered.MECH)? " ": data.EventsRegistered.MECH.join(','),
      AI: isEmpty(data.EventsRegistered.AI) ? " " : data.EventsRegistered.AI.join(','),
      CHEM: isEmpty(data.EventsRegistered.CHEM)? " ": data.EventsRegistered.CHEM.join(','),
      MBA: isEmpty(data.EventsRegistered.MBA) ? " " : data.EventsRegistered.MBA.join(','),
      MED: isEmpty(data.EventsRegistered.MED) ? " " : data.EventsRegistered.MED.join(','),
      AGRI: isEmpty(data.EventsRegistered.AGRI)? " ": data.EventsRegistered.AGRI.join(','),
      CIVIL: isEmpty(data.EventsRegistered.CIVIL) ? " " : data.EventsRegistered.CIVIL.join(','),
      BME: isEmpty(data.EventsRegistered.BME) ? " " : data.EventsRegistered.BME.join(','),
      cashtobePaid: data.CashToBePaid + " ₹ ",
    };
  });
  //total =====
  let total = 0;
  let collectedcash = 0;
  const totalAmount = paidUsers.map((data) => {
    total += data.CashToBePaid;

    //  for(const key in  data.EventsRegistered){
    //     console.log(data.EventsRegistered['CSE'][0])
    //  }
    if (data.cashPaid) {
      collectedcash += data.AmountPaid;
    }
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

    { field: "ProjectPresentation", headerName: "Project presentation",width: 150, editable: false },
    

    {
      field:'isProjectPresentationPaid',  headerName: "is Project Department?",
      width: 150,
      editable: false,
      type: "boolean",
    },
    
    { field: "PaperPresentation", 
    headerName: "Paper presentation",
     width: 150, editable: false, 
    },

    { field: "isPaperPresentationPaid",
     headerName: "is Paper Presentation", 
     width: 150,
     type:'boolean',
      editable: false ,
  
      },
    {
      field: "isPaidD",
      headerName: "is Paid Department?",
      width: 150,
      editable: false,
      type: "boolean",
   
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
   
    { field: "IT", headerName: "IT", width: '150', editable: false },
    { field: "CSE", headerName: "CSE", width: '150', editable: false },
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


  return (
    <StyledBox>
      {/* {load && <Loading/>} */}
      <DataGrid
        //  rowHeight={100}
        components={{
          Toolbar: CustomToolbar,
          Footer,
        }}

        getRowHeight={() => 'auto'}

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
      />
      <h3
        style={{
          marginTop: "-50px",
          color: "black",
          marginLeft: "400px",
        }}
      >
        TOTAL AMOUT : {total}💸
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
    </StyledBox>
  );
}
