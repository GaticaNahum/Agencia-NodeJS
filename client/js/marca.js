const url = "http://localhost:4000";


const findAll = async() => {
    await $.ajax({
        type: 'GET',
        headers: { "Accept": "application/json" },
        url: url + '/marcas'
    }).done(res => {
        let listmarcas = res.listmarcas;
        let table = $("#marca");
        table.append(
            "<tr class='bg-dark text-light'>" +
            "<th scope='col'>#</th>" +
            "<th scope='col'>Nombre</th>" +
            "<th scope='col'>Actualizar</th>" +
            "<th scope='col'>Eliminar</th>" +
            "</tr>")

        for (let i = 0; i < listmarcas.length; i++) {
            table.append(
                "<tr>" +
                "<td>" + listmarcas[i].id + "</td>" +
                "<td>" + listmarcas[i].nombre + "</td>" +
                "<td><button class='btn btn-warning' data-toggle='modal' onclick='getInfoUpdateMarca(" + listmarcas[i].id + ")'  data-target='#updateMarca'><i class='fas fa-pen'></i></button></td>" +
                "<td><button class='btn btn-danger' data-toggle='modal' onclick='getId(" + listmarcas[i].id + ")' data-target='#deleteMarca'><i class='fas fa-trash'></i></button></td>" +
                "</tr>")
        }
    });
};
findAll();


const registerMarca = async() => {
    let nombre = document.getElementById('marca_registro').value;
    console.log(nombre);
    await $.ajax({
        type: "POST",
        url: url + "/marcas/create/",
        data: { nombre }
    }).done(function(res) {
        console.log(res);
    });
};


const deleteMarca = async() => {
    let id = document.getElementById('id_delete').value;
    await $.ajax({
        type: 'GET',
        url: url + '/marcas/delete/' + id
    }).done(res => {
        console.log(res);
        findAll();
    });
}

const getId = async id => {
    document.getElementById("id_delete").value = id;
};

const updateMarca = async() => {
    let id = document.getElementById('idMarca_update').value;
    let nombre = document.getElementById('marca_update').value;

    await $.ajax({
        type: 'POST',
        url: url + "/marcas/update/" + id,
        data: { nombre }
    }).done(function(res) {

    })
};

const getByMarca = async id => {
    return await $.ajax({
        type: 'GET',
        url: url + '/marcas/' + id
    }).done(res => res);
}

const getInfoUpdateMarca = async id => {
    let marca = await getByMarca(id);

    document.getElementById('idMarca_update').value = id
    document.getElementById('marca_update').value = marca.marca[0].nombre
}