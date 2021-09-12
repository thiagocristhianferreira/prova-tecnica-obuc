const arrLocaisTrabalho = [];
let id = 0;

const populaTabela = () => {
  if (Array.isArray(arrLocaisTrabalho)) {
    $("#dataTable tbody").html("");
    arrLocaisTrabalho.forEach((item) => {
    $("#dataTable tbody").append(`<tr>
      <td>${item.predio}</td>
      <td>${item.local}</td>
      <td class="d-flex align-items-center">
      <div
        type="button"
        class="w-50 mb-2 d-flex"
        onClick={setEditaItens(${item.id})}
        data-toggle="modal"
        data-target="#editarModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="svg-table-icons bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </div>
      <div
        type="button"
        class="w-50 mb-2"
        onClick={deletaItens(${item.id})}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="svg-table-icons bi bi-trash-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
      </div>
      </td>
    </tr>`)
    })
  };
};

const pegaDados = () => {
  result = JSON.parse(sessionStorage.getItem("dados"));
  if (result) {
    result.forEach((item) => arrLocaisTrabalho.push(item));
    populaTabela();
  }
};

const adicionaDados = () => {
  const predio = document.getElementById('selectTable').value;
  const local = document.getElementById('inputTable').value;
  id = id + 1;
  arrLocaisTrabalho.push({
    id,
    predio,
    local,
  });
  sessionStorage.setItem('dados', JSON.stringify(arrLocaisTrabalho))
  populaTabela();
};

const setEditaItens = (id) => {
  sessionStorage.setItem('editarId', JSON.stringify(id));
};

const editaItens = () => {
  resultId = JSON.parse(sessionStorage.getItem("editarId"));
  const predio = document.getElementById('selectTableModal').value;
  const local = document.getElementById('inputTableModal').value;
  
  arrLocaisTrabalho.forEach((item, index) => {
    if (item.id === resultId) {
      item.id = index;
      item.predio = predio;
      item.local = local;
    }
  });

  sessionStorage.setItem('dados', JSON.stringify(arrLocaisTrabalho))
  populaTabela();
};

const deletaItens = (id) => {
  let confirma = confirm('Deseja apagar o registro?');
  if (confirma) {
    arrLocaisTrabalho.forEach((item, index) => {
      if (item.id === id) {
        arrLocaisTrabalho.splice(index, 1);
      }
    })
  }
  sessionStorage.setItem('dados', JSON.stringify(arrLocaisTrabalho));
  populaTabela();
};

window.onload = () => {
  pegaDados();
};
