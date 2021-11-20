const urlA = "http://localhost:4000";

const findAutos = async() => {
    await $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: urlA + '/autos'
    }).done(res => {
        let listAutos = res.listAutos;
        let table = $("#contenido");
        table.append(
            "<tr class='bg-dark text-light'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>Nombre</th>" +
            "<th scope='col'>Matricula</th>" +
            "<th scope='col'>Año de verificacion</th>" +
            "<th scope='col'>Detalles</th>" +
            "<th scope='col'>Actualizar</th>" +
            "<th scope='col'>Eliminar</th>" +
            "</tr>")

        for (let i = 0; i < listAutos.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + listAutos[i].id + "</td>" +
                "<td>" + listAutos[i].nombre + "</td>" +
                "<td>" + listAutos[i].matricula + "</td>" +
                "<td>" + listAutos[i].añoVerificacion + "</td>" +
                "<td><button class='btn btn-primary' data-toggle='modal' onclick='getInfo(" + listAutos[i].id + ")'  data-target='#detalles'><i class='fas fa-info-circle'></i></button></td>" +
                "<td><button class='btn btn-warning' data-toggle='modal' onclick='getInfoUpdateAuto(" + listAutos[i].id + ")'  data-target='#autos'><i class='fas fa-pen'></i></button></td>" +
                "<td><button class='btn btn-danger' data-toggle='modal' onclick='getIdAuto(" + listAutos[i].id + ")' data-target='#deleteAuto'><i class='fas fa-trash'></i></button></td>" +
                "</tr>")
        }
    });
};
findAutos();

const getById = async id => {
    return await $.ajax({
        type: 'GET',
        url: urlA + '/autos/' + id
    }).done(res => {
        console.log(res);
    });
};

const getInfo = async id => {
    let autos = await getById(id);

    document.getElementById('nombre').value = autos.autos[0].nombre;
    document.getElementById('matricula').value = autos.autos[0].matricula;
    document.getElementById('verificacion').value = autos.autos[0].añoVerificacion;
    document.getElementById('estado').value = autos.autos[0].estado ? 'Activo' : 'Inactivo';
    document.getElementById('marcaAuto').value = autos.autos[0].marca;
}

const registerAuto = async() => {
    let nombre = document.getElementById('nombre_register').value;
    let matricula = document.getElementById('matricula_register').value;
    let añoVerificacion = document.getElementById('anio_register').value;
    let marca = document.getElementById('marca_register').value;

    console.log(nombre);
    await $.ajax({
        type: "POST",
        url: urlA + "/autos/create/",
        data: { nombre, matricula, añoVerificacion, marca }
    }).done(function(res) {
        console.log(res);
    });
};


const updateAuto = async() => {
    let id = document.getElementById('id_autoUpdate').value;
    let nombre = document.getElementById('nombre_update').value;
    let matricula = document.getElementById('matricula_update').value;
    let añoVerificacion = document.getElementById('anio_update').value;
    let marca = document.getElementById('marcaAuto_update').value;

    await $.ajax({
        type: 'POST',
        url: url + "/autos/update/" + id,
        data: { nombre, matricula, añoVerificacion, marca }
    }).done(function(res) {

    })
};

const getByAuto = async id => {
    return await $.ajax({
        type: 'GET',
        url: url + '/autos/' + id
    }).done(res => res);
}

const getInfoUpdateAuto = async id => {
    let autos = await getByAuto(id);

    document.getElementById('id_autoUpdate').value = id
    document.getElementById('nombre_update').value = autos.autos[0].nombre
    document.getElementById('matricula_update').value = autos.autos[0].matricula
    document.getElementById('anio_update').value = autos.autos[0].añoVerificacion
    document.getElementById('marcaAuto_update').value = autos.autos[0].marca
}


const deleteAutos = async() => {
    let id = document.getElementById('id_deleteAuto').value;
    await $.ajax({
        type: 'GET',
        url: url + '/autos/delete/' + id
    }).done(res => {
        console.log(res);
        findAll();
    });
}

const getIdAuto = async id => {
    document.getElementById("id_deleteAuto").value = id;
};