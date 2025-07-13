const getColorByStatus = (status) => {
  switch (status) {
    case "Atendido":
      return "bg-stone-500";
      break;
    case "Pendiente":
      return "bg-red-500";
      break;
    case "Cancelado":
      return "bg-blue-500";
      break;
    case "Reprogramado":
      return "bg-green-800";
      break;
      deafult: return " bg-purple-500";
      break;
  }
};

module.exports = { getColorByStatus };
