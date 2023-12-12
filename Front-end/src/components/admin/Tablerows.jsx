import { useState, useEffect } from 'react';
const Dummycolumns = [
    {
      title: "Name",
      field: 'name',
      emptyValue: () => <em>null</em>,
      editComponent: props => (
        <input
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
      // sorting:false
    },
    {
      title: "Email",
      cellStyle:{color:"blue"},
      headerStyle:{color:"Red"},
      field: 'email',
      filterPlaceholder: "Email..",
      editComponent: props => (
        <input
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
      emptyValue: () => <em>null</em>
    },
    {
      title: "Phone No",
      field: 'phone',
      align: 'center',
      editComponent: props => (
        <input
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
      grouping:false,
      sorting: false,
      emptyValue: () => <em>null</em>
    },
    {
      title: "Age",
      field: 'age',
      // defaultGroupOrder:2,
      render:(rowData)=><div style={{backgroundColor:rowData.age>=18?"Green":"Red"}}>{rowData.age}</div>,
      editComponent: props => (
        <input
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
      // export:false,
      editComponent: props => (
        <input
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
      searchable: false,
      // customSort:"de" here the function to sort accordingly
    },
    {
      title: "Gender",
      editComponent: props => (
        <input
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
      // defaultGroupOrder:0,
      field: 'gender',
      lookup: { M: "Male", F: "Female" },
      emptyValue: () => <em>null</em>
    },
    {
      title: "City",
      editComponent: props => (
        <input
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
      field: 'city',
      emptyValue: () => <em>null</em>
    },
    {
      title: "School Fees",
      field: 'fee',
      editComponent: props => (
        <input
          type="text"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      ),
      emptyValue: () => <em>null</em>,
      type: "currency",
      currencySetting: { currencyCode: 'INR' },
      filtering: false
      // minimumFractionDigits:1,
    },
  ]

export const Tablerows = () => {
    const [columnData,setcolumnData] = useState(Dummycolumns);
    // useEffect(() => {
        
    //     return () => {
    //             }
    // }, [])
    return columnData;
}
