// import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

function History(){
  let latest;
  const [hist,setHist] = useState([])
async function getHistory(){
  const response = await fetch('http://localhost:3001/history',{
      method : 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*',
      },
      withCredentials: 'true',
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((data) => setHist(data.history.reverse()))
    console.log(hist)
}
let res = hist.map(function(item){
  return <tr key = {item.date}>
          <th >{item.date}</th>
          <th>{item.calculation}</th>
        </tr>
})
  return(
    <div>
     <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={getHistory}
            >
              Get History
      </Button>
    <font color = "white">
    <table border="2" bordercolor = "blue" cellSpacing="1" width = "100%">
      <tbody>
      <tr>
        <th >
          Дата &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp;
        </th>
        <th>
          Вычисление
        </th>
      </tr>
      {res}
      </tbody>
    </table>
    </font>
    </div>
  );
}

export default History;