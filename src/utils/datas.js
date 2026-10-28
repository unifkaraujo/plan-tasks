import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

const FORMATO_BANCO = 'YYYY-MM-DD';

const capitalizar = texto => texto.charAt(0).toUpperCase() + texto.slice(1);

export const diasAPartirDeHoje = dias => moment().add(dias, 'days').toDate();

export const paraDataBanco = data => moment(data).format(FORMATO_BANCO);

export const deDataBanco = texto => moment(texto, FORMATO_BANCO).toDate();

export const dataBancoHoje = () => paraDataBanco(new Date());

export const formatarDataCurta = data => moment(data).format('DD/MM/YYYY');

export const formatarDiaEMes = data => moment(data).format('ddd, D [de] MMMM');

export const formatarDataCompleta = data =>
  moment(data).format('ddd, D [de] MMMM [de] YYYY');

export const formatarDiaSemana = data =>
  capitalizar(moment(data).format('dddd').replace('-feira', '').trim());

export const datasBancoEntre = (inicio, fim) => {
  const datas = [];
  const atual = moment(paraDataBanco(inicio));
  const ultima = moment(paraDataBanco(fim));
  while (atual.isSameOrBefore(ultima)) {
    datas.push(atual.format(FORMATO_BANCO));
    atual.add(1, 'days');
  }
  return datas;
};
