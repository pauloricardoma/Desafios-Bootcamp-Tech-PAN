async function paginapesquisa1() {
  const [employees, roles] = await Promise.all([
    fetchJson(`http://localhost:3000/employees`),
    fetchJson(`http://localhost:3000/roles`),
  ]);

  filtrarRoles(roles);
  listandoEmployees(employees, roles);

  const aplicacao = document.querySelector('.main_bg');
  aplicacao.addEventListener('change', () =>
    listandoEmployees(employees, roles)
  );
}
paginapesquisa1();

function filtrarRoles(roles) {
  const rolesfiltrar = document.querySelector('#roles_id');
  for (const role of roles) {
    const labelnamed = document.createElement('label');
    const checkboxfr = document.createElement('input');
    checkboxfr.type = 'checkbox';
    checkboxfr.value = role.id;
    labelnamed.append(checkboxfr, role.name);
    rolesfiltrar.append(labelnamed);
  }
}

function listandoEmployees(employees, roles) {
  const checkboxes = document.querySelectorAll('input:checked');
  const sortselect = [];
  for (let i = 0; i < checkboxes.length; i++) {
    const roleid = parseInt(checkboxes[i].value);
    sortselect.push(roleid);
  }

  const filtrarEmployees = employees.filter((employee) => {
    if (sortselect.length === 0) {
      return true;
    } else {
      return sortselect.indexOf(employee.role_id) !== -1;
    }
  });

  const ordenarEmployees = document.querySelector('#select_roles').value;
  filtrarEmployees.sort((a, b) => {
    switch (ordenarEmployees) {
      case 'name_asc':
        return ordenar(a.name, b.name);
      case 'name_desc':
        return -ordenar(a.name, b.name);
      case 'salary_asc':
        return ordenar(a.salary, b.salary);
      case 'salary_desc':
        return -ordenar(a.salary, b.salary);
    }
  });

  const listaid = document.querySelector('#id');
  const listanamed = document.querySelector('#named');
  const listarole = document.querySelector('#role');
  const listasalary = document.querySelector('#salary');
  listaid.innerHTML = '';
  listanamed.innerHTML = '';
  listarole.innerHTML = '';
  listasalary.innerHTML = '';

  for (const employee of filtrarEmployees) {
    let role = roles.find((role) => role.id == employee.role_id);
    const liid = document.createElement('li');
    const linamed = document.createElement('li');
    const lirole = document.createElement('li');
    const lisalary = document.createElement('li');
    liid.textContent = employee.id;
    linamed.textContent = employee.name;
    lirole.textContent = role.name;
    lisalary.textContent = employee.salary;
    listaid.append(liid);
    listanamed.append(linamed);
    listarole.append(lirole);
    listasalary.append(lisalary);
  }
  document.querySelector(
    '.employees'
  ).textContent = `(${filtrarEmployees.length})`;
}

function ordenar(ord1, ord2) {
  if (ord1 < ord2) {
    return -1;
  } else if (ord1 > ord2) {
    return 1;
  } else {
    return 0;
  }
}

function fetchJson(url) {
  return fetch(url)
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        throw new Error(result.statusText);
      }
    })
    .catch((erro) => {
      mostrarErro('Erro de carregamento de conteúdo', erro);
      throw erro;
    });
}
