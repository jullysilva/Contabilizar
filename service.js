const Messages = {
  CPFInvalido: "O CPF está inválido!",
  ValorInvalido: "Valor inserido não é aceitável!",
};

const validarEntradaDeDados = (lancamento) => {
  lancamento.cpf = refactorCPF(lancamento.cpf);

  if (lancamento.valor <= -2000 || lancamento.valor >= 15000)
    return Messages.ValorInvalido;

  if (!validarCPF(lancamento.cpf)) return Messages.CPFInvalido;
  return null;
};

const recuperarSaldosPorConta = (lancamentos) => {
  const saldosPorCpf = {};

  lancamentos.forEach((lancamento) => {
    const cpf = refactorCPF(lancamento.cpf);

    if (!saldosPorCpf[cpf]) {
      saldosPorCpf[cpf] = 0;
    }

    saldosPorCpf[cpf] += lancamento.valor;
  });

  const resultado = Object.keys(saldosPorCpf).map((cpf) => ({
    cpf,
    valor: saldosPorCpf[cpf],
  }));

  return resultado.length === 0 ? [] : resultado;
};

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
  const lancamentosDoCpf = lancamentos.filter(
    (lancamento) => refactorCPF(lancamento.cpf) === cpf
  );

  if (lancamentosDoCpf.length === 0) {
    return [];
  }

  // Encontra o menor e maior valor de lançamento para o CPF
  let menorLancamento = lancamentosDoCpf[0];
  let maiorLancamento = lancamentosDoCpf[0];

  lancamentosDoCpf.forEach((lancamento) => {
    if (lancamento.valor < menorLancamento.valor) menorLancamento = lancamento;

    if (lancamento.valor > maiorLancamento.valor) maiorLancamento = lancamento;
  });

  if (lancamentosDoCpf.length === 1) return [menorLancamento, menorLancamento];

  return [menorLancamento, maiorLancamento];
};

const recuperarMaioresSaldos = (lancamentos) => {
  return [];
};

const recuperarMaioresMedias = (lancamentos) => {
  return [];
};

// VALIDADOR DE CPF, RETORNA UM BOOLEANO
const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf == "") return false;

  if (
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  )
    return false;

  add = 0;
  for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;

  add = 0;
  for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
  return true;
};

// RETIRAR OS CARACTERES DO CPF
const refactorCPF = (cpf) => {
  return cpf.replace(/\D/g, "");
};
