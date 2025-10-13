/* import React from 'react'
import { useEffect, useState } from "react";

function usePost(url,body) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = React.useState(false);
 
    useEffect(async () => {
      try {
        const data = await fetch(url,{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        })
        setResult(await data.json())
        setLoading(false)

        
      } catch (error) {
        setError(error)
      }
      
    }, [url]);
    return { result, error };
}

export default usePost */