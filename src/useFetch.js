import { useState, useContext } from "react";
import { UserContext } from "./App";
import { useNavigate } from "react-router-dom";

const useFetch = (url, body, toDo) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, setUser, authUser } = useContext(UserContext);
  const nav = useNavigate()

  async function get(toDo = () => {}) {
    setLoading(true);
    try {
      setLoading(true);
      const res = await fetch(url, {
        headers: { authorization: `basic ${authUser}` },
      });

      const data = await res.json();
      setLoading(false);
      setResult(data);
      if (res.ok) {
        toDo(data);
      } else {
        setLoading(false);
        setError(data.error);
        console.log(res.status)
        if (res.status === 401){
          localStorage.clear()
          nav("/login")
        }
      }
    } catch (e) {
      console.error(e);
      setError("Network Error please try again later");
      setLoading(false);
    }
  }

  async function postMedia(body, toDo) {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method: "POST",
        body: body,
        headers: { authorization: `basic ${authUser}` },
      });

      const data = await res.json();
      setLoading(false);
      setResult(data);
      if (res.ok) {
        toDo(data);
      } else {
        setLoading(false);
        setError(data.error);
      }
    } catch (e) {
      console.error(e);
      setError("Network Error please try again later");
      setLoading(false);
    }
  }

  async function postMediaNoAuth(body, toDo) {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method: "POST",
        body: body,
      });

      const data = await res.json();
      setLoading(false);
      setResult(data);
      if (res.ok) {
        toDo(data);
      } else {
        setLoading(false);
        setError(data.error);
      }
    } catch (e) {
      console.error(e);
      setError("Network Error please try again later");
      setLoading(false);
    }
  }

  async function post(body = {}, toDo = () => {}) {
    try {
      console.log(body);
      setLoading(true);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           authorization: `basic ${authUser}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setLoading(false);
      setResult(data);
      if (res.ok) {
        toDo(data);
      } else {
        setLoading(false);
        setError(data.error);
      }
    } catch (e) {
      console.error(e);
      setError("Network Error please try again later");
      setLoading(false);
    }
  }

  async function postNoAuth(body = {}, toDo = () => {}) {
    try {
      console.log(body);
      setLoading(true);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setLoading(false);
      setResult(data);
      if (res.ok) {
        toDo(data);
      } else {
        setLoading(false);
        setError(data.error);
      }
    } catch (e) {
      console.error(e);
      setError("Network Error please try again later");
      setLoading(false);
    }
  }

  async function put(body = {}, toDo = () => {}) {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json",authorization: `basic ${authUser}` },
        body: JSON.stringify(body),
        
      });

      const data = await res.json();
      setLoading(false);
      setResult(data);
      if (res.ok) {
        toDo(data);
      } else {
        setLoading(false);
        setError(data.error);
      }
    } catch (e) {
      console.error(e);
      setError("Network Error please try again later");
      setLoading(false);
    }
  }

  async function deleteAPI(body = {}, toDo = () => {}) {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json",authorization: `basic ${authUser}` },
        body: JSON.stringify(body),
        
      });

      const data = await res.json();
      setLoading(false);
      setResult(data);
      if (res.ok) {
        toDo(data);
      } else {
        setLoading(false);
        setError(data.error);
      }
    } catch (e) {
      console.error(e);
      setError("Network Error please try again later");
      setLoading(false);
    }
  }

  async function putMedia(body, toDo) {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method: "PUT",
        body: body,
        headers: { authorization: `basic ${authUser}` },
      });

      const data = await res.json();
      setLoading(false);
      setResult(data);
      if (res.ok) {
        toDo(data);
      } else {
        setLoading(false);
        setError(data.error);
      }
    } catch (e) {
      console.error(e);
      setError("Network Error please try again later");
      setLoading(false);
    }
  }

  return {
    get,
    postMedia,
    post,
    deleteAPI,
    put,
    putMedia,
    postNoAuth,
    postMediaNoAuth,
    result,
    setResult,
    error,
    loading,
  };
};

export default useFetch;
