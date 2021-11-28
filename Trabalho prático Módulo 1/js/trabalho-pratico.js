// Função ligado ao button id=simula para simulação de financiamento, cálculos, impressão no html e tabela com os dados
function simular() {
  // Captura dos valores inseridos
  const valortotal = document.getElementById('valor_total');
  const prazoanos = document.getElementById('prazo_anos');
  const jurosanual = document.getElementById('juros_anual');

  // Cálculo dos juros mensais, do prazo em meses e da taxa de amortização paga/mês
  let jurosmensal = Math.pow(1 + jurosanual.valueAsNumber, 1 / 12) - 1;
  let prazomensal = prazoanos.valueAsNumber * 12;
  let taxaamortizacao = valortotal.valueAsNumber / prazomensal;

  // Impressão do valor dos juros mensais e prazo mensal no HTML
  res_prazo_meses.textContent = prazomensal;
  res_juros_mes.textContent = jurosmensal.toFixed(15);

  // Variável pra guardar o valor do cálculo dos juros por prestação e variável pra guardar o valor do total, juros por prestação mais taxa de amortização
  let jurosacmarray = [];
  total = [];

  // Loop para cálculo do somatório de valores para o total dos juros acumulados, para o numero das prestações, sua amortização, juros por prestação e o total por prestação
  let jurosacm = 0;
  for (let i = 0; i < prazomensal; i++) {
    let jurosacumulados =
      (valortotal.valueAsNumber - taxaamortizacao * i) * jurosmensal;
    jurosacm = jurosacumulados + jurosacm;
    jurosacmarray[i] = jurosacumulados;
    total[i] = jurosacumulados + taxaamortizacao;
    res_juros_acm.textContent = jurosacm.toFixed(2);
  }

  // Captura dos elementos div, para resetar a tabela, sempre que houver um novo requerimento
  const prestacao = [
    { prestacao },
    { amortizacao },
    { juros_prestacao },
    { total_prestacao },
  ];
  for (let i = 0; i < prestacao.length; i++) {
    prestacao[i] = document.querySelector(`#${prestacao[i]}`);
    prestacao[i].textContent = '';
  }

  const prestacao1 = document.getElementById('prestacao');
  const prestacao2 = document.getElementById('amortizacao');
  const prestacao3 = document.getElementById('juros_prestacao');
  const prestacao4 = document.getElementById('total_prestacao');
  prestacao1.textContent = '';
  prestacao2.textContent = '';
  prestacao3.textContent = '';
  prestacao4.textContent = '';
  // Loop para criação dinâmica das tabelas com as tabelas de 1 ao total dos prazo em meses, quebra pra mostrar somente 5 valores
  for (i = 0; i < prazomensal; i++) {
    const linha1 = document.createElement('tr');
    const campoprest1 = document.createElement('td');
    const textoprest1 = document.createTextNode(i + 1);
    campoprest1.appendChild(textoprest1);
    linha1.appendChild(campoprest1);
    prestacao1.appendChild(linha1);

    const linha2 = document.createElement('tr');
    const campoprest2 = document.createElement('td');
    const textoprest2 = document.createTextNode(taxaamortizacao.toFixed(2));
    campoprest2.appendChild(textoprest2);
    linha2.appendChild(campoprest2);
    prestacao2.appendChild(linha2);

    const linha3 = document.createElement('tr');
    const campoprest3 = document.createElement('td');
    const textoprest3 = document.createTextNode(jurosacmarray[i].toFixed(2));
    campoprest3.appendChild(textoprest3);
    linha3.appendChild(campoprest3);
    prestacao3.appendChild(linha3);

    const linha4 = document.createElement('tr');
    const campoprest4 = document.createElement('td');
    const textoprest4 = document.createTextNode(total[i].toFixed(2));
    campoprest4.appendChild(textoprest4);
    linha4.appendChild(campoprest4);
    prestacao4.appendChild(linha4);
    if (i === 4) {
      break;
    }
  }
}
