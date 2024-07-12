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
    let bool = false;

    input.forEach((element, index) => {
      let valid = msg_erro[index];
      //onsole.log(valid);

      if (element.value === "") {
        valid.textContent = "* Campo obrigatorio !";
        valid.style.backgroundColor = "#ffc6c6";
        bool = false;
      } else {
        valid.textContent = "";
        valid.classList.add("hidden");
        bool = true;
      }
    });

    if (bool) {
      resultadoIMC();
      return;
    }
  });

  const resultadoIMC = () => {
    const nome = document.getElementById("nome").value;
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const tbody = document.querySelector(".tabela_tbody");
    const mensgAvaliat = document.getElementById("mensagemAvaliativa");
    console.log(mensgAvaliat);

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
        </tr>
    `;
  };
});
