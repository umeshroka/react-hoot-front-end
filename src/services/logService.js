const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/logs`;


const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const show = async (logId) => {
    try {
      const res = await fetch(`${BASE_URL}/${logId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (logFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


  const deleteLog = async (logId) => {
    try {
      const res = await fetch(`${BASE_URL}/${logId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function update(logId, logFormData) {
    try {
      const res = await fetch(`${BASE_URL}/${logId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
  


  export { 
    index,
    show,
    create,
    deleteLog,
    update,
  };
  
