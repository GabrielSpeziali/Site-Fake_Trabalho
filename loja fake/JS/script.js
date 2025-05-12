const usuarios = [];

function scrollToLeft(id) {
  const el = document.getElementById('productScroll');
  el.scrollBy({ left: -300, behavior: 'smooth' });
}

function scrollToRight(id) {
  const el = document.getElementById('productScroll');
  el.scrollBy({ left: 300, behavior: 'smooth' });
}

function abrirModal() {
  document.getElementById('modalCadastro').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modalCadastro').style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('modalCadastro');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cpfInput = document.getElementById("cpf");

  cpfInput.addEventListener("input", () => {
    let value = cpfInput.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    value = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    cpfInput.value = value;
  });

  const listaUsuarios = document.getElementById('listaUsuarios');
  function renderizarUsuarios() {
    listaUsuarios.innerHTML = '';
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.length > 0) {
      usuarios.forEach(usuario => {
        const userElement = document.createElement('div');
        userElement.classList.add('user-card');
        userElement.innerHTML = `
          <h3>${usuario.nome}</h3>
          <p>Email: ${usuario.email}</p>
          <p>CPF: ${usuario.cpf}</p>
        `;
        listaUsuarios.appendChild(userElement);
      });
    } else {
      listaUsuarios.innerHTML = '<p>Nenhum usuário cadastrado.</p>';
    }
  }
  renderizarUsuarios();
});

function cadastrarUsuario(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const cpf = document.getElementById('cpf').value;

  if (!nome || !email || !senha || !cpf) {
    alert("Preencha todos os campos!");
    return;
  }
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const novoUsuario = { nome, email, senha, cpf };
  usuarios.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert("Usuário cadastrado com sucesso!");
  fecharModal();
}
