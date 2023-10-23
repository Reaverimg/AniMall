import React, { useEffect, useState } from "react";

function ResetPassForm() {
    const [accounts, setAccounts] = useState([]);
  
    useEffect(() => {
      const apiUrl = 'http://animall-400708.et.r.appspot.com/api/v1/accounts';
      fetch(apiUrl)
        .then((response) => response.json())
        .then((result) => {
          console.log("accountlist", result.data);
          setAccounts(result.data);
        })
        .catch((error) => {
          console.error('There was a problem with the API request:', error);
        });
    }, []);
  
    return (
      <>
        <h1>ResetPassForm</h1>
      </>
    );
  }
  

export default ResetPassForm;