const Messages = {
  CPFInvalido: "O CPF está inválido!",
  ValorInvalido: "Valor inserido não é aceitável!",
  CamposVazios: "Campos vazios não são permitidos!",
};

const validarEntradaDeDados = (lancamento) => {
  if (lancamento.cpf === null || lancamento.valor === null)
    return Messages.CamposVazios;

  if (lancamento.valor <= -2000 || lancamento.valor >= 15000)
    return Messages.ValorInvalido;

  lancamento.cpf = refactorCPF(lancamento.cpf);
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
  const saldosPorCpf = {};

  lancamentos.forEach((lancamento) => {
    const cpf = refactorCPF(lancamento.cpf);

    if (!saldosPorCpf[cpf]) {
      saldosPorCpf[cpf] = 0;
    }

    saldosPorCpf[cpf] += lancamento.valor;
  });

  const saldos = Object.keys(saldosPorCpf).map((cpf) => ({
    cpf,
    valor: saldosPorCpf[cpf],
  }));

  saldos.sort((a, b) => b.valor - a.valor);

  return saldos.slice(0, 3);
};

const recuperarMaioresMedias = (lancamentos) => {
  const mediasPorCpf = {};

  lancamentos.forEach((lancamento) => {
    const cpf = refactorCPF(lancamento.cpf);

    if (!mediasPorCpf[cpf]) {
      mediasPorCpf[cpf] = { soma: 0, count: 0 };
    }

    mediasPorCpf[cpf].soma += lancamento.valor;
    mediasPorCpf[cpf].count += 1;
  });

  const mediasArray = Object.keys(mediasPorCpf).map((cpf) => ({
    cpf,
    valor: mediasPorCpf[cpf].soma / mediasPorCpf[cpf].count,
  }));

  mediasArray.sort((a, b) => b.valor - a.valor);

  return mediasArray.slice(0, 3);
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
