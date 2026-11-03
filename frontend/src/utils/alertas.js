// src/utils/alertas.js
import Swal from "sweetalert2";

// Alerta padrão com a identidade visual do Quizzy (Dark / Stitch)
const ToastQuizzy = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: "#1c1f2a",
  color: "#dfe2f1",
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const alertaSucesso = (mensagem) => {
  ToastQuizzy.fire({
    icon: "success",
    title: mensagem,
    iconColor: "#4cd7f6",
  });
};

export const alertaErro = (mensagem) => {
  ToastQuizzy.fire({
    icon: "error",
    title: mensagem,
    iconColor: "#ffb4ab",
  });
};

export const alertaAviso = (mensagem) => {
  ToastQuizzy.fire({
    icon: "info",
    title: mensagem,
    iconColor: "#d2bbff",
  });
};
