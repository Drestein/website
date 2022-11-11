import * as React from "react";
import PropTypes from "prop-types";
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
import { toast } from "react-toastify";
import { Card } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
function CustomFooterTotalComponent(props) {
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
      <h1>Total : {props.total} ₹ </h1>
    </React.Fragment>
  );
}

CustomFooterTotalComponent.propTypes = {
  total: PropTypes.number,
};

export { CustomFooterTotalComponent };
