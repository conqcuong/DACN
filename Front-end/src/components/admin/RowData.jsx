
import { useState, useEffect } from 'react';
const Dummyrows = [
    { name: "Gracy", email: "gracy1168@gmail.com", phone: 7203051890, age: null, gender: "F", city: "Valsad", fee: 89778 },
    { name: "Dhvani", email: "dhvani00016@gmail.com", phone: 9989899890, age: 16, gender: "F", city: "Valsad", fee: 89778 },
    { name: "Parth", email: "parth@gmail.com", phone: 8878766767, age: 20, gender: "M", city: "Valsad" },
    { name: "Nisarg", email: "nisarg@gmail.com", phone: 9909877876, age: 20, gender: "M", city: "Valsad", fee: 89778 },
    { name: "Olive", email: "olli@gmail.com", phone: 9909877876, age: 20, gender: "F", city: "Valsad", fee: 89778 },
    { name: "Olive", email: "olli@gmail.com", phone: 9909877876, age: 20, gender: "F", city: "Valsad", fee: 89778 },
    { name: "Olive", email: "olli@gmail.com", phone: 9909877876, age: 20, gender: "F", city: "Valsad", fee: 89778 },
    { name: "Olive", email: "olli@gmail.com", phone: 9909877876, age: 20, gender: "F", city: "Valsad", fee: 897784543 }
]

export const RowData = () => {
    const [rowsData,setrowsData] = useState(Dummyrows);

    // useEffect(() => {
        
    //     return () => {
    //             }
    // }, [])
    return rowsData;
}
