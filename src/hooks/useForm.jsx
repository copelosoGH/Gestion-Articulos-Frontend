import { useState } from "react";

export const useForm = (objetoInicial = {}) => {
  const [formulario, setFormulario] = useState(objetoInicial);

  const cambiado = ({ target }) => {
    const { name, value } = target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  };

  return {
    formulario,
    cambiado
  };
};