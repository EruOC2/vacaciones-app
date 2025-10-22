export const vacationsData = {
  //  Empleado 1
  "99032103": {
    name: "Beltrán Castro Moisés",
    role: "empleado",
    vacations: {
      2023: [
        {
          periodo: "1er Periodo",
          diasDisfrutar: 10,
          diasSolicitados: 5,
          fechaDisfrute: "2023-03-15",
          refMemo: "MEMO-2023-12",
          fechaMemo: "2023-03-01",
          diasRestantes: 5,
        },
        {
          periodo: "2do Periodo",
          diasDisfrutar: 10,
          diasSolicitados: 8,
          fechaDisfrute: "2023-09-20",
          refMemo: "MEMO-2023-89",
          fechaMemo: "2023-09-10",
          diasRestantes: 2,
        },
      ],
      2024: [
        {
          periodo: "1er Periodo",
          diasDisfrutar: 12,
          diasSolicitados: 6,
          fechaDisfrute: "2024-05-10",
          refMemo: "MEMO-2024-14",
          fechaMemo: "2024-05-01",
          diasRestantes: 6,
        },
      ],
    },
  },

  //  Empleado 2
  "11223344": {
    name: "Carlos Ramírez Díaz",
    role: "empleado",
    vacations: {
      2023: [
        {
          periodo: "Anual",
          diasDisfrutar: 15,
          diasSolicitados: 10,
          fechaDisfrute: "2023-07-05",
          refMemo: "MEMO-2023-33",
          fechaMemo: "2023-06-20",
          diasRestantes: 5,
        },
      ],
      2024: [
        {
          periodo: "Anual",
          diasDisfrutar: 15,
          diasSolicitados: 0,
          fechaDisfrute: "-",
          refMemo: "-",
          fechaMemo: "-",
          diasRestantes: 15,
        },
      ],
    },
  },

  //  Empleado 3
  "55667788": {
    name: "María Fernanda Torres",
    role: "empleado",
    vacations: {
      2022: [
        {
          periodo: "Acumulado",
          diasDisfrutar: 8,
          diasSolicitados: 8,
          fechaDisfrute: "2022-11-01",
          refMemo: "MEMO-2022-44",
          fechaMemo: "2022-10-10",
          diasRestantes: 0,
        },
      ],
      2023: [
        {
          periodo: "Anual",
          diasDisfrutar: 10,
          diasSolicitados: 6,
          fechaDisfrute: "2023-08-01",
          refMemo: "MEMO-2023-102",
          fechaMemo: "2023-07-20",
          diasRestantes: 4,
        },
      ],
      2024: [
        {
          periodo: "Anual",
          diasDisfrutar: 12,
          diasSolicitados: 4,
          fechaDisfrute: "2024-04-12",
          refMemo: "MEMO-2024-15",
          fechaMemo: "2024-04-01",
          diasRestantes: 8,
        },
      ],
    },
  },

  //  Jefe
  "654321": {
    name: "María López Hernández",
    role: "jefe",
    subordinados: ["99032103", "11223344", "55667788"],
    vacations: {
      2023: [
        {
          periodo: "Anual",
          diasDisfrutar: 15,
          diasSolicitados: 7,
          fechaDisfrute: "2023-09-05",
          refMemo: "MEMO-2023-50",
          fechaMemo: "2023-08-25",
          diasRestantes: 8,
        },
      ],
      2024: [
        {
          periodo: "Anual",
          diasDisfrutar: 15,
          diasSolicitados: 0,
          fechaDisfrute: "-",
          refMemo: "-",
          fechaMemo: "-",
          diasRestantes: 15,
        },
      ],
    },
  },
};

//  Relación de todos los empleados (para el panel del jefe)
Object.values(vacationsData).forEach((emp) => {
  if (emp.role === "jefe") {
    emp.allEmployees = vacationsData;
  }
});
