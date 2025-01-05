import React , { useEffect}from 'react'
import { jwtDecode } from "jwt-decode";

const CreateHomeWork = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);

      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);
  return (
    <div>CreateHomeWork</div>
  )
}

export default CreateHomeWork