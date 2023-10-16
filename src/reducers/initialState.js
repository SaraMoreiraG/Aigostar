const initialState = {
  airfryers: [
    {
      id: 1,
      name: "HAYDEN-A",
      price: 56,
	  imgtable:"https://aigostar-img.s3.amazonaws.com/hayden-A/haydenA-table.png",
      description:
        "Con un control manual de doble dial fácil de usar para que pueda realizarlas fácilmente y la comida siempre quede perfecta: Asar, pollo, patatas fritas, verduras y postres.",
      details: {
        capacidad: 4,
        comensales: "2-4",
        bandejaantihaderente: "Si",
        control: "Dial",
        funciones: "no",
        programas: 0,
        temporizador: 30,
        temperaturamax: 200,
        temperaturamin: 80,
        potencia: 1500,
        ancho: 318,
        alto: 306,
        fondo: 266,
        peso: 5.4,
      },
	  thumbnails:[
		"https://aigostar-img.s3.amazonaws.com/hayden-A/haydenA-1.jpg",
		"https://aigostar-img.s3.amazonaws.com/hayden-A/haydenA-2.jpg",
		"https://aigostar-img.s3.amazonaws.com/hayden-A/haydenA-3.jpg",
		"https://aigostar-img.s3.amazonaws.com/hayden-A/haydenA-4.jpg",
		"https://aigostar-img.s3.amazonaws.com/hayden-A/haydenA-5.jpg",
		"https://aigostar-img.s3.amazonaws.com/hayden-A/haydenA-6.jpg",
	  ]
    },
    {
      id: 2,
      name: "HAYDEN-X",
      price: 60,
	  imgtable:"https://aigostar-img.s3.amazonaws.com/hayden-x/hayden-x-table.png",
      details: {
        capacidad: 4,
        comensales: "2-4",
        bandejaantihaderente: "Si",
        control: "Pantalla táctil",
        funciones: [
          "Recordatorio de agitar",
          "Precalentamiento",
          "Cuenta regresiva",
        ],
        programas: 8,
        temporizador: 60,
        temperaturamax: 200,
        temperaturamin: 40,
        potencia: 1500,
        ancho: 318,
        alto: 297,
        fondo: 266,
        peso: 5.4,
      },
	  thumbnails: [
		"https://aigostar-img.s3.amazonaws.com/hayden-x/haydenX-1.jpg",
		"https://aigostar-img.s3.amazonaws.com/hayden-x/haydenX-2.jpg",
		"https://aigostar-img.s3.amazonaws.com/hayden-x/haydenX-3.jpg",
		"https://aigostar-img.s3.amazonaws.com/hayden-x/haydenX-4.jpg",
		"https://aigostar-img.s3.amazonaws.com/hayden-x/haydenX-5.jpg",
		"https://aigostar-img.s3.amazonaws.com/hayden-x/haydenX-6.jpg"
	  ]
    },
    {
      id: 3, // Corregí el id
      name: "CUBE SMART", // Diferente nombre o detalles, para ilustrar la diferencia
      price: 95,
	  imgtable:"https://aigostar-img.s3.amazonaws.com/cube-smart/cube-smart-table.png",
      description:
        "La freidora de aire le ofrece una experiencia de cocinado totalmente nueva, podrá controlar la freidora desde su móvil, solo hay que conectarla mediante wifi a la aplicación AigoSmart para tener acceso a sus numerosas funciones y facilidades de uso.",
      details: {
        capacidad: 7,
        comensales: "6-10",
        bandejaantihaderente: "Si",
        control: "Pantalla tactil | Conexión móvil",
        funciones: [
          "Recordatorio de agitar",
          "Precalentamiento",
          "Cuenta regresiva",
        ],
        programas: 7,
        temporizador: 60,
        temperaturamax: 200,
        temperaturamin: 80,
        potencia: 1900,
        ancho: 318,
        alto: 346,
        fondo: 416,
        peso: 5.9,
      },
	  thumbnails: [
		"https://aigostar-img.s3.amazonaws.com/cube-smart/cube-smart-1.jpg",
		"https://aigostar-img.s3.amazonaws.com/cube-smart/cube-smart-2.jpg",
		"https://aigostar-img.s3.amazonaws.com/cube-smart/cube-smart-3.jpg",
		"https://aigostar-img.s3.amazonaws.com/cube-smart/cube-smart-4.jpg",
		"https://aigostar-img.s3.amazonaws.com/cube-smart/cube-smart-5.jpg",
		"https://aigostar-img.s3.amazonaws.com/cube-smart/cube-smart-6.jpg"
	  ]
    },
  ],
  accesories: [
	{
		id: 1,
		name: 'Kit1',
		price: 15,
		thumbnails: [
			"https://aigostar-img.s3.amazonaws.com/accesorios-airfryer-kit1/kit1.jpg"
		]
	},
	{
		id: 1,
		name: 'Bandeja',
		price: 15,
		thumbnails: [
			"https://aigostar-img.s3.amazonaws.com/accesorios-airfryer-bandeja/freidora-de-aire-bandeja1.jpg"
		]
	},
	{
		id: 1,
		name: 'Kit2',
		price: 15,
		thumbnails: [
			"https://aigostar-img.s3.amazonaws.com/accesorios-airfryer-kit2/kit2.jpg"
		]
	},
	{
		id: 1,
		name: 'Pulverizador',
		price: 15,
		thumbnails: [
			"https://aigostar-img.s3.amazonaws.com/accesorios-airfryer-pulverizador/pulverizador.jpg"
		]
	}
  ],
  cart: [],
  user: null,
};

export default initialState;
