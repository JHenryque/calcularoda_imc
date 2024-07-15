document.addEventListener("DOMContentLoaded", () => {
  //alert("ola MUndo");
  const formImc = document.getElementById("form");
  const input = formImc.querySelectorAll("input");
  const msg_erro = document.querySelectorAll(".msg_erro");

  //console.log(tbody);

  //console.log(msg_erro);
  let contador = 0;
  formImc.addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const altura = document.getElementById("altura").value;
    const peso = document.getElementById("peso").value;
    let bool = false;

    input.forEach((element, index) => {
      let valid = msg_erro[index];
      //onsole.log(valid);

      if (nome && altura && peso) {
        valid.classList.add("hidden");
        localStorage.setItem("nome", nome);
        localStorage.setItem("altura", altura);
        localStorage.setItem("peso", peso);

        document.getElementById("nome").value = "";
        document.getElementById("altura").value = "";
        document.getElementById("peso").value = "";
        bool = true;
      } else {
        valid.textContent = "";
        valid.textContent = "* Campo obrigatorio !";
        valid.style.backgroundColor = "#ffc6c6";
        bool = false;
      }
    });

    if (bool) {
      resultadoIMC();
      return;
    }
  });

  const resultadoIMC = () => {
    const nome = localStorage.getItem("nome");
    const altura = parseFloat(localStorage.getItem("altura"));
    const peso = parseFloat(localStorage.getItem("peso"));
    const tbody = document.querySelector(".tabela_tbody");
    const mensgAvaliat = document.getElementById("mensagemAvaliativa");

    contador++;
    const time = new Date();
    const imc = peso / (altura * altura);
    let mensagem;

    if (imc < 18.5) {
      mensagem = "Abaixo do peso";
      mensgAvaliat.textContent = "IMC: " + imc.toFixed(2) + " - " + mensagem;
      mensgAvaliat.style.backgroundColor = "#ffc6c6";
    } else if (imc < 25) {
      mensagem = "Peso normal";
      mensgAvaliat.textContent = "IMC: " + imc.toFixed(2) + " - " + mensagem;
      mensgAvaliat.style.backgroundColor = "#c6ffcd";
    } else if (imc < 30) {
      mensagem = "Sobrepeso";
      mensgAvaliat.textContent = "IMC: " + imc.toFixed(2) + " - " + mensagem;
      mensgAvaliat.style.backgroundColor = "#7b9980";
    } else if (imc > 30 && imc <= 35) {
      mensagem = "Obeso primeiro grau";
      mensgAvaliat.textContent = "IMC: " + imc.toFixed(2) + " - " + mensagem;
      mensgAvaliat.style.backgroundColor = "#d65b5b";
      mensgAvaliat.style.color = "white";
    } else {
      mensagem = "Obeso Elevado";
      mensgAvaliat.textContent = "IMC: " + imc.toFixed(2) + " - " + mensagem;
      mensgAvaliat.style.backgroundColor = "#661f1f";
      mensgAvaliat.style.color = "white";
    }

    tbody.innerHTML += `
          <tr>
                  <td>${contador}</td>
                  <td>${time.getDate()}/${time.getMonth()}/${time.getFullYear()} - ${time.getHours()}:${time.getMinutes()}</td>
                  <td>${nome}</td>
                  <td>${altura}</td>
                  <td>${peso}</td>
                  <td>${imc.toFixed(2)}</td>
                  <td>${mensagem}</td>
                  <td><button id="remove" type="click">Excluir</button></td>
          </tr>
      `;
    const removeBtn = document.getElementById("remove");
    removeBtn.addEventListener("click", () => {
      localStorage.removeItem("nome");
      localStorage.removeItem("altura");
      localStorage.removeItem("peso");
      localStorage.removeItem("elemento");
    });
  };
});
