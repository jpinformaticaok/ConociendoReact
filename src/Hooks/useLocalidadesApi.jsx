import { useState, useEffect, useCallback } from "react";

const URL_BASE = "https://api-inventario-jp-czbhf8gxafg7bwg4.westus3-01.azurewebsites.net/api/Localidades";

export default function useLocalidadesApi() {
  const [localidades, setLocalidades ] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerLocalidades = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(URL_BASE);
      if (!respuesta.ok) throw new Error("Error al obtener las localidades");
      const datos = await respuesta.json();
      setLocalidades(datos);
      return datos;
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  const obtenerLocalidadPorId = useCallback(async (id) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(`${URL_BASE}/${id}`);
      if (!respuesta.ok) throw new Error("Error al obtener la localidad");
      return await respuesta.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  const crearLocalidad = useCallback(async (localidad) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(URL_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localidad),
      });
      if (!respuesta.ok) throw new Error("Error al crear el localidad");
      const nuevaLocalidad = await respuesta.json();
      setLocalidades((localidadesActuales) => [...localidadesActuales, nuevaLocalidad]);
      return nuevaLocalidad;
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  const actualizarLocalidad = useCallback(async (id, localidad) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(`${URL_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(localidad),
      });
      if (!respuesta.ok) throw Error("Error al actualizar la localidad");
      setLocalidades((localidadesActuales) =>
        localidadesActuales.map((l) => (l.id === id ? { ...l, ...localidad } : l  ))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  const eliminarLocalidad = useCallback(async (id) => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(`${URL_BASE}/${id}`, {
        method: "DELETE",
      });
      if (!respuesta.ok) throw new Error("Error al eliminar la localidad");
      setLocalidades((localidadesActuales) => localidadesActuales.filter((l) => l.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    obtenerLocalidades();
  }, [obtenerLocalidades]);

  return {
    localidades,
    cargando,
    error,
    obtenerLocalidades,
    obtenerLocalidadPorId,
    crearLocalidad,
    actualizarLocalidad,
    eliminarLocalidad,
  };
}
