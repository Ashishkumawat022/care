export const fetch2 = async (api, body) => {
  // console.log(localStorage.getItem("token"));
  if (body) {
    let entries = Object.keys(body);
    let data = new FormData();
    for (let i = 0; i < entries.length; i++) {
      data.append(entries[i], body[entries[i]]);
    }
    const res = await fetch(api, {
      method: "post",
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
      body: data,
    });
    return await res.json();
  } else {
    const res = await fetch(api, {
      method: "post",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    return await res.json();
  }
};

export const fetch3 = async (api, type) => {
  // console.log(localStorage.getItem("token"));
  const res = await fetch(api, {
    method: type,
    headers: {
      Authorization: JSON.parse(localStorage.getItem("token")),
    },
  });
  return await res.json();
};

export const fetch4 = async (api, body) => {
  if (body) {
    const res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  } else {
    const res = await fetch(api, {
      method: "post",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    return await res.json();
  }
};

export const fetch5 = async (api, body) => {
  // console.log(localStorage.getItem("token"));
  try {
    if (body) {
      const res = await fetch(`${process.env.REACT_APP_SUPERADMIN_BASEURL}/${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("superadmin_token"),
        },
        body: JSON.stringify(body),
      });
      return await res.json();
    } else {
      const res = await fetch(api, {
        method: "post",
        headers: {
          Authorization: localStorage.getItem("superadmin_token"),
        },
      });
      return await res.json();
    }
  } catch (error) {
    return error
  }
};

export const fetch6 = async (api, body) => {
  try {
    if (body) {
      const res = await fetch(`${process.env.REACT_APP_BASEURL}/${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("care_admin_token"),
        },
        body: JSON.stringify(body),
      });
      return await res.json();
    } else {
      const res = await fetch(api, {
        method: "post",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("care_admin_token")),
        },
      });
      return await res.json();
    }
  } catch (error) {
    return await error;
  }
};

export const fetchGet = async (api) => {
  const res = await fetch(`${process.env.REACT_APP_SUPERADMIN_BASEURL}/${api}`, {
    method: 'get',
    headers: {
      Authorization: localStorage.getItem("superadmin_token"),
    },
  });
  return await res.json();
};

