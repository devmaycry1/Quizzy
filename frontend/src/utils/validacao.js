const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'tooShort',
    'customError'
];

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo de nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'O email digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo de senha não pode estar vazio.',
        tooShort: 'A senha deve ter pelo menos 6 caracteres.'
    }
};

export function obterMensagemErro(name, validityState) {
    let mensagem = '';

    tiposDeErro.forEach(erro => {
        if (validityState[erro]) {
            mensagem = mensagensDeErro[name]?.[erro] || 'Campo preenchido incorretamente.';
        }
    });

    return mensagem;
}