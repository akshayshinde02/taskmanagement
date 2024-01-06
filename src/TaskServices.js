import axios from "axios";
const API_URL = "http://localhost:8080/api/tasks";

export const getAllTasks = async(token)=>{
    // const response = await fetch(API_URL);
    // const response =  
    try {
  
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        return response.data;
      } catch (error) {
        console.error('Error fetching images:', error);
      }

}

export const createTask = async(task,token)=>{

    const response = await fetch(API_URL,{
        method:'POST',
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type':'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
}

export const updateTask = async (id, task,token) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
};

export const deleteTask = async (id,token)=>{
    const response = await fetch(`${API_URL}/${id}`,{
        method:'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
     if (response.ok || response.status === 204) {
       
        return { success: true };
    } else {
       
        const errorData = await response.json(); // Try to parse error response as JSON
        throw new Error(`Failed to delete task. Status: ${response.status}, Message: ${errorData.message}`);
    }
}