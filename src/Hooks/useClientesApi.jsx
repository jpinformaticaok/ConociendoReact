import { useState, useEffect, useCallback } from "react";

const URL_BASE = "https://api-inventario-jp-czbhf8gxafg7bwg4.westus3-01.azurewebsites.net/api/Clientes";

export default function useClientesApi() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerClientes = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(URL_BASE);
      if (!respuesta.ok) throw new Error("Error al obtener los clientes");
      const datos = await respuesta.json();
      setClientes(datos);
      return datos;
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  const obtenerClientePorId = useCallback(async (id) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(`${URL_BASE}/${id}`);
      if (!respuesta.ok) throw new Error("Error al obtener el cliente");
      return await respuesta.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  const crearCliente = useCallback(async (cliente) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(URL_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });
      if (!respuesta.ok) throw new Error("Error al crear el cliente");
      const nuevoCliente = await respuesta.json();
      setClientes((clientesActuales) => [...clientesActuales, nuevoCliente]);
      return nuevoCliente;
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  const actualizarCliente = useCallback(async (id, cliente) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(`${URL_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });
      if (!respuesta.ok) throw Error("Error al actualizar el cliente");
      setClientes((clientesActuales) =>
        clientesActuales.map((c) => (c.id === id ? { ...c, ...cliente } : c))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  const eliminarCliente = useCallback(async (id) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(`${URL_BASE}/${id}`, {
        method: "DELETE",
      });
      if (!respuesta.ok) throw new Error("Error al eliminar el cliente");
      setClientes((clientesActuales) => clientesActuales.filter((c) => c.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    obtenerClientes();
  }, [obtenerClientes]);

  return {
    clientes,
    cargando,
    error,
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
  };
}
