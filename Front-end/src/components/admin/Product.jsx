import { useState, useEffect } from 'react';
import { Icon } from './Icon'
import MaterialTable from 'material-table';
// import { GridOverlay } from '@mui/x-data-grid';
// import LinearProgress from '@mui/material/LinearProgress';
import { Tablerows } from './Tablerows';
import { RowData } from './RowData';

// function CustomLoadingOverlay() {
//     return (
//       <GridOverlay>
//         <div style={{ position: 'absolute', top: 0, width: '100%' }}>
//           <LinearProgress />
//         </div>
//       </GridOverlay>
//     );
//   }

export const Product = () => {
    const [tableData, settableData] = useState()
  
    var columns = Tablerows();
    var rows = RowData();
    useEffect(() => {
        settableData(rows);
        return () => {
      
    }
}, [])
  return (
    <>
        <div className="App">
      {/* <Icons/> */}
      <h2>All Brigths</h2>

      <MaterialTable
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                settableData([...tableData, newData]);
                
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...tableData];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                settableData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...tableData];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                settableData([...dataDelete]);
  
                resolve();
              }, 1000)
            }),
        }}
        // actions={[
        //   {
        //     onClick:(e,data)=>{console.log(data)}
        //   }
        // ]}

        onSelectionChange={(selecredRows)=>console.log(selecredRows)}
        title="Trial Demo Table"
        components={{
          LoadingOverlay: CustomLoadingOverlay,
        }}
        loading
        options={{
          exportButton: true,
          searchAutoFocus: true,
          paginationType: 'stepped',
          exportFileName: "tableData",
          addRowPosition: "first",
          actionsColumnIndex:-1,
          selection:true,
          filtering:true,

          selectionProps:rowData=>({
            disabled:rowData.name=="Gracy",
            color:"primary"
          }),
          showTextRowsSelected:false,
          grouping:true,
          columnsButton:true,
          rowStyle:(data,index)=>index%2==0?{backgroundColor:'#eee'}:null,
          headerStyle:{backgroundColor:'#f1f1f1'}

          // showSelectAllCheckbox:false,
        }}
      />
      {/* options={{sorting:false,searchFieldVariant:"filled"}} */}
      {/* options={{search:true,searchText:"Gracy",searchFieldAlignment:'right',searchAutoFocus:true,filtering:'true', */}
      {/* pageSizeOptions:[5,10,15,20,25,30,35,40],paginationType:'stepped',paginationPosition:'bottom',exportButton:'true',exportAllData:'true'}} */}

    </div>
    </>
  )
}
